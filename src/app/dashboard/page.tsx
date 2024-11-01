import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import OrderStatusDropdown from "./OrderStatusDropdown";

const DashboardPage = async () => {
    const session = await auth();
    if (session && !session.user.isAdmin) {
        return notFound();
    }

    const orders = await prisma.order.findMany({
        where: {
            createdAt: {
                gte: new Date(new Date().getDate() - 7),
            },
        },

        orderBy: {
            createdAt: "desc",
        },

        include: {
            user: true,
        },
    });

    const totalWeekRevenue = await prisma.order.aggregate({
        where: {
            createdAt: {
                gte: new Date(new Date().getDate() - 7),
            },
        },
        _sum: {
            amount: true,
        },
    });

    const totalMonthRevenue = await prisma.order.aggregate({
        where: {
            createdAt: {
                gte: new Date(new Date().getDate() - 30),
            },
        },
        _sum: {
            amount: true,
        },
    });

    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2400;

    return (
        <MaxWidthWrapper className="my-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <p className="font-light text-xl text-zinc-600">
                                Last Week
                            </p>
                            <p className="font-semibold text-4xl">
                                {formatPrice(totalWeekRevenue._sum.amount!)}
                            </p>
                        </CardTitle>
                        <CardDescription>
                            of {formatPrice(WEEKLY_GOAL)} goal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress
                            value={
                                (totalWeekRevenue._sum.amount! * 100) /
                                WEEKLY_GOAL
                            }
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <p className="font-light text-xl text-zinc-600">
                                Last Month
                            </p>
                            <p className="font-semibold text-4xl">
                                {formatPrice(totalMonthRevenue._sum.amount!)}
                            </p>
                        </CardTitle>
                        <CardDescription>
                            of {formatPrice(MONTHLY_GOAL)} goal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress
                            value={
                                (totalMonthRevenue._sum.amount! * 100) /
                                MONTHLY_GOAL
                            }
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2 border p-4 rounded-md shadow-zinc-100 shadow">
                <h2 className="text-2xl font-bold">Incoming orders</h2>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Status
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Purchase date
                            </TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.user.name}</TableCell>
                                <TableCell>
                                    <OrderStatusDropdown
                                        id={order.id}
                                        orderStatus={order.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    {order.createdAt.toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {formatPrice(order.amount)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </MaxWidthWrapper>
    );
};

export default DashboardPage;
