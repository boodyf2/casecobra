"use client";
import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";

const ThankYou = ({ orderId }: { orderId: string }) => {
    const { data } = useQuery({
        queryKey: ["get-payment-status"],
        queryFn: async () => await getPaymentStatus(orderId),
        retry: true,
        retryDelay: 500,
    });

    if (data === undefined) {
        return (
            <div className="w-full mt-24 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin size-8 text-zinc-500" />
                <h3 className="font-semibold text-xl">Loading your order</h3>
                <p className="text-zinc-500">This won&apos;t take long</p>
            </div>
        );
    }

    if (data === false) {
        return (
            <div className="w-full mt-24 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin size-8 text-zinc-500" />
                <h3 className="font-semibold text-xl">
                    Verifying your payment...
                </h3>
                <p className="text-zinc-500">This might take a moment</p>
            </div>
        );
    }

    console.log(data);
    const { color, croppedImageUrl } = data.config;
    const { city, street, postalCode, state } = data.shippingAddress!;

    return (
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="space-y-8">
                <div className="space-y-2">
                    <p className="text-base font-bold text-green-700">
                        Thank you!
                    </p>
                    <h1 className="text-3xl font-bold">
                        Your case is on the way!
                    </h1>
                    <p className="text-zinc-500 font-semibold">
                        We&apos;ve received your order and are now processing
                        it.
                    </p>
                </div>

                <div className="space-y-2">
                    <h2 className="text-zinc-800">Order ID</h2>
                    <p className="text-zinc-500">{orderId}</p>
                </div>

                <hr />

                <div className="space-y-2">
                    <h2 className="font-semibold text-zinc-900">
                        You made a greate choice!
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        We at CaseCobra believe that a phone case doesn&apos;t
                        only need to look good, but also last you for the years
                        to come. We offer a 5-year print guarantee: If you case
                        isn&apos;t of the highest quality, we&apos;ll replace it
                        for free.
                    </p>
                    <div className="bg-zinc-100 w-full rounded-md border">
                        <PhonePreview
                            croppedImageUrl={croppedImageUrl}
                            color={color}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-zinc-700">Shipping address</h2>
                    <div>
                        <p className="text-zinc-500">{city}</p>
                        <p className="text-zinc-500">{street}</p>
                        <p className="text-zinc-500">
                            {postalCode} {state}
                        </p>
                    </div>
                </div>

                <hr />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-zinc-700">Payment status</h2>
                        <p className="text-zinc-500">Paid</p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-zinc-700">Shipping method</h2>
                        <p className="text-zinc-500">
                            DHL, takes up to 3 working days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
