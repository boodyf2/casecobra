"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getPaymentStatus = async (orderId: string) => {
    const session = await auth();

    if (!session) {
        throw new Error("You have to be logged in to access this page!");
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: session.user.id,
        },
        include: {
            user: true,
            config: true,
            shippingAddress: true,
            billingAddress: true,
        },
    });

    if (!order) {
        throw new Error("Order wasn't found!");
    }

    return order.isPaid ? order : false;
};
