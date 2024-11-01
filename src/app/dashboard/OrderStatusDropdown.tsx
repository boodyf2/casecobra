"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ChevronsUpDownIcon } from "lucide-react";
import { updateStatus } from "./actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface OrderStatusDropdownProps {
    id: string;
    orderStatus: OrderStatus;
}

const ORDER_STATUSES: Record<OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shippment",
    shipped: "Shipped",
    fulfilled: "Fulfilled",
};

const OrderStatusDropdown = ({ id, orderStatus }: OrderStatusDropdownProps) => {
    const router = useRouter();
    const { mutate: changeStatus, isPending } = useMutation({
        mutationKey: ["update-status"],
        mutationFn: async (args: { id: string; status: OrderStatus }) =>
            await updateStatus(args),
        onSuccess: () => router.refresh(),
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" isLoading={isPending}>
                    {ORDER_STATUSES[orderStatus]}
                    <ChevronsUpDownIcon className="size-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {(Object.keys(ORDER_STATUSES) as OrderStatus[]).map(
                    (status) => (
                        <DropdownMenuItem
                            onClick={() => changeStatus({ id, status })}
                            key={status}
                            className={cn(
                                "hover:bg-zinc-100 cursor-pointer",
                                status === orderStatus && "bg-zinc-100"
                            )}
                            disabled={status === orderStatus}
                        >
                            {ORDER_STATUSES[status]}
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default OrderStatusDropdown;
