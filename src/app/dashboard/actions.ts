"use server";
import { prisma } from "@/prisma";
import { OrderStatus } from "@prisma/client";

export const updateStatus = async ({
    id,
    status,
}: {
    id: string;
    status: OrderStatus;
}) => {
    await prisma.order.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
};
