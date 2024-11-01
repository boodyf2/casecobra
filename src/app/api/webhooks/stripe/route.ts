import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
    try {
        const body = await request.text();
        const signature = headers().get("stripe-signature");

        if (!signature) {
            throw new Error("Invalid Signature");
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (!(event.type === "checkout.session.completed")) {
            return;
        }

        if (!event.data.object.customer_details?.email) {
            throw new Error("Missing user email!");
        }

        const session = event.data.object || Stripe.Checkout.SessionsResource;
        const { orderId } = session.metadata!;
        const address = session.customer_details?.address;
        const customerDetails = session.customer_details;

        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                shippingAddress: {
                    create: {
                        name: customerDetails!.name!,
                        street: address!.line1!,
                        city: address!.city!,
                        postalCode: address!.postal_code!,
                        country: address!.country!,
                        state: address!.state,
                        phoneNumber: customerDetails!.phone!,
                    },
                },
                billingAddress: {
                    create: {
                        name: customerDetails!.name!,
                        street: address!.line1!,
                        city: address!.city!,
                        postalCode: address!.postal_code!,
                        country: address!.country!,
                        state: address!.state,
                        phoneNumber: customerDetails!.phone!,
                    },
                },
            },
        });

        return NextResponse.json({ result: event, ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Something went wrong", ok: false },
            { status: 500 }
        );
    }
};
