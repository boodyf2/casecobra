"use client";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE } from "@/config/products";
import { formatPrice } from "@/lib/utils";
import {
    COLORS,
    FINISHES,
    MATERIALS,
    MODELS,
} from "@/validators/options-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import { useSession } from "next-auth/react";

const DesignPreview = ({ config }: { config: Configuration }) => {
    const { color, phoneModel, croppedImageUrl, caseFinish, caseMaterial } =
        config;

    const modelLabel = MODELS.options.find(
        (option) => option.value === phoneModel
    )?.label;

    const colorTw = COLORS.find(
        (colorOption) => colorOption.value === color
    )?.tw;

    const { price: finishPrice, label: finishLabel } = FINISHES.options.find(
        (option) => option.value === caseFinish
    )!;
    const { price: materialPrice, label: materialLabel } =
        MATERIALS.options.find((option) => option.value === caseMaterial)!;

    const totalPrice = BASE_PRICE + finishPrice + materialPrice;

    const costSummary = [
        { label: "Base", price: BASE_PRICE },
        { label: materialLabel, price: materialPrice },
        { label: finishLabel, price: finishPrice },
    ];

    const router = useRouter();
    const { toast } = useToast();
    const { mutate: checkout, isPending } = useMutation({
        mutationKey: ["checkout"],
        mutationFn: () => createCheckoutSession(config.id),
        onSuccess: ({ url }) => {
            if (!url) {
                throw new Error("Unable to retrieve payment URL");
            }

            router.push(url);
        },
        onError: () => {
            toast({
                title: "Something went wrong!",
                description:
                    "There was an error on our side. Please try again.",
                variant: "destructive",
            });
        },
    });

    const { status } = useSession();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleCheckout = async () => {
        if (status === "unauthenticated") {
            setIsLoginModalOpen(true);
            localStorage.setItem("configId", config.id);
            return;
        }

        localStorage.removeItem("configId");
        checkout();
    };

    return (
        <>
            <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-2 max-w-52 mx-auto lg:max-w-52 col-span-1">
                    <Phone
                        imgSrc={croppedImageUrl as string}
                        className={`bg-${colorTw}`}
                    />
                </div>
                <div className="space-y-8 col-span-2">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">
                            Your {modelLabel} Case
                        </h2>
                        <p className="text-zinc-700">
                            <Check className="inline-block mr-2 size-4 text-green-500" />
                            In stock and ready to ship
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="text-zinc-700 text-xl font-bold">
                                Highlights
                            </h3>
                            <ul className="ml-4 indent-2 list-disc text-zinc-600">
                                <li>Wireless chargin compatible</li>
                                <li>TPU Shock absorbtion</li>
                                <li>Packaging made from recycled materials</li>
                                <li>5 year print warranty</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-zinc-700 text-xl font-bold">
                                Materials
                            </h3>
                            <ul className="ml-4 indent-2 list-disc text-zinc-600">
                                <li>High-quality, durable material</li>
                                <li>
                                    Scratch and fingerprint resistant coating
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="w-10/12 mx-auto" />
                    <div className="flex flex-col gap-4">
                        {costSummary.map((cost) => (
                            <div
                                key={cost.label}
                                className="flex justify-between items-center"
                            >
                                <h4 className="text-md font-bold text-zinc-500">
                                    {cost.label}
                                </h4>
                                <p className="text-md text-zinc-600 font-bold">
                                    {formatPrice(cost.price)}
                                </p>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-between items-center">
                            <h4 className="text-md font-bold text-zinc-600">
                                Order total:
                            </h4>
                            <p className="text-md text-zinc-800 font-bold">
                                {formatPrice(totalPrice)}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            isLoading={isPending}
                            loadingText="Cheking out"
                            className="ml-auto"
                            onClick={handleCheckout}
                        >
                            Checkout
                            <ArrowRight className="ml-2 inline-block size-4" />
                        </Button>
                    </div>
                </div>
                <LoginModal
                    isOpen={isLoginModalOpen}
                    setIsOpen={setIsLoginModalOpen}
                />
            </div>
        </>
    );
};

export default DesignPreview;
