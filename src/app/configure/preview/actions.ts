"use server";
import { auth } from "@/auth";
import { BASE_PRICE } from "@/config/products";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";
import { FINISHES, MATERIALS } from "@/validators/options-validator";
import { Configuration } from "@prisma/client";

export const createCheckoutSession = async (configId: string) => {
    const config = await prisma.configuration.findUnique({
        where: { id: configId },
    });

    if (!config) {
        throw new Error("This config doesn't exist");
    }

    // Create a new order if it doesn't exist
    const session = await auth();
    if (!session) {
        throw new Error("You have to be logged in to continue");
    }

    const { user } = session;
    let order = await prisma.order.findFirst({
        where: { userId: user.id, configId },
    });

    // I'm getting a weird TS Error her idk why that's why I added `as Configuration`
    const { imageUrl, caseMaterial, caseFinish } =
        (await prisma.configuration.findUnique({
            where: { id: configId },
        })) as Configuration;

    const materialPrice =
        MATERIALS.options.find((option) => option.value === caseMaterial)
            ?.price ?? 0;
    const finishPrice =
        FINISHES.options.find((option) => option.value === caseFinish)?.price ??
        0;
    const totalPrice = BASE_PRICE + materialPrice + finishPrice;

    if (!order) {
        order = await prisma.order.create({
            data: {
                configId,
                userId: user.id,
                amount: totalPrice,
            },
        });
    }

    // Create a Stripe session
    const product = await stripe.products.create({
        name: "Custome iPhone Case",
        images: [imageUrl],
        default_price_data: {
            currency: "USD",
            unit_amount: totalPrice * 100,
        },
    });

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configId}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ["EG", "US"],
        },
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
};
