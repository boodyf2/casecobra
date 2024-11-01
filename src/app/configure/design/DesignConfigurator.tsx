// FOR DYNAMIC TW CLASSES
//
// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import phone from "@/assets/phone-template.png";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import ResizeHandle from "@/components/ResizeHandle";
import {
    COLORS,
    FINISHES,
    MATERIALS,
    MODELS,
} from "@/validators/options-validator";
import {
    Description,
    Field,
    Label,
    Radio,
    RadioGroup,
} from "@headlessui/react";
import { useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig, SaveConfigArgs } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
    imgUrl: string;
    imgDims: {
        width: number;
        height: number;
    };
    configId: string;
}

const INITIAL_POS = {
    x: 150,
    y: 205,
};

const DesignConfigurator = ({
    imgUrl,
    imgDims,
    configId,
}: DesignConfiguratorProps) => {
    const { toast } = useToast();
    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number];
        model: (typeof MODELS.options)[number];
        material: (typeof MATERIALS.options)[number];
        finish: (typeof FINISHES.options)[number];
    }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0],
    });

    const [renderedDims, setRenderedDims] = useState({
        width: imgDims.width / 4,
        height: imgDims.height / 4,
    });
    const [renderedPos, setRenderedPos] = useState({
        x: INITIAL_POS.x,
        y: INITIAL_POS.y,
    });
    const phoneCaseRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startUpload } = useUploadThing("imageUploader");
    const router = useRouter();
    const { mutate: updateConfig, isPending } = useMutation({
        mutationKey: ["save-config"],
        mutationFn: async (args: SaveConfigArgs) => {
            await Promise.all([saveCroppedImg(), saveConfig(args)]);
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`);
        },
        onError: () => {
            toast({
                title: "Something went wrong!",
                description: "An error occurred on our side. Please try again.",
                variant: "destructive",
            });
        },
    });

    const getCroppedImage = async () => {
        try {
            if (!phoneCaseRef.current || !containerRef.current) {
                return;
            }

            const {
                top: caseTopOffset,
                left: caseLeftOffset,
                width: caseWidth,
                height: caseHeight,
            } = phoneCaseRef.current?.getBoundingClientRect();
            const { top: containerTopOffset, left: containerLeftOffset } =
                containerRef.current?.getBoundingClientRect();

            const topOffset = caseTopOffset - containerTopOffset;
            const leftOffset = caseLeftOffset - containerLeftOffset;

            const actualX = renderedPos.x - leftOffset;
            const actualY = renderedPos.y - topOffset;

            // Canvas
            const canvas = document.createElement("canvas");
            canvas.width = caseWidth;
            canvas.height = caseHeight;
            const ctx = canvas.getContext("2d");

            const userImg = new Image();
            userImg.crossOrigin = "anonymous";
            userImg.src = imgUrl;
            await new Promise((resolve) => (userImg.onload = resolve));
            ctx?.drawImage(
                userImg,
                actualX,
                actualY,
                renderedDims.width,
                renderedDims.height
            );

            const imgFile = (await canvasToImg(canvas)) as File;
            return imgFile;
        } catch {
            toast({
                title: "Something went wrong!",
                description:
                    "There was a problem saving your customization, please try again",
                variant: "destructive",
            });
        }
    };

    const canvasToImg = (
        canvas: HTMLCanvasElement,
        imageType = "image/png"
    ) => {
        return new Promise((resolve, reject) => {
            try {
                const dataUrl = canvas.toDataURL(imageType);
                const byteString = atob(dataUrl.split(",")[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);

                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([ab], { type: imageType });

                const file = new File([blob], `userimg-${configId}.png`, {
                    type: "image/png",
                });

                resolve(file);
            } catch (e) {
                reject(e);
            }
        });
    };

    const saveCroppedImg = async () => {
        const img = (await getCroppedImage()) as File;
        await startUpload([img], { configId });
    };

    return (
        <div className="mt-10 mb-20 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div
                className="h-[37.5rem] relative overflow-hidden col-span-2 flex items-center justify-center
            border border-dashed border-gray-300 rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                ref={containerRef}
            >
                <div className="relative w-60 bg-opacity-50 pointer-events-none">
                    <AspectRatio
                        ref={phoneCaseRef}
                        className="z-50 w-full pointer-events-none"
                        ratio={896 / 1831}
                    >
                        <NextImage
                            className="z-50 select-none object-cover"
                            src={phone}
                            alt="phone"
                        />
                    </AspectRatio>
                    <div className="absolute inset-0 z-40 rounded-[32px] shadow-[0_0_0_9999px_rgba(229,231,235,0.6)]" />
                    <div
                        className={cn(
                            "absolute inset-0 rounded-[32px]",
                            `bg-${options.color.tw}`
                        )}
                    />
                </div>

                {/* User Image */}
                <Rnd
                    className="absolute z-20 rounded-sm border-2 border-primary"
                    default={{
                        x: INITIAL_POS.x,
                        y: INITIAL_POS.y,
                        width: imgDims.width / 4,
                        height: imgDims.height / 4,
                    }}
                    resizeHandleClasses={{
                        topLeft: "pt-1 pl-1",
                        topRight: "pt-1 pl-1",
                        bottomLeft: "pt-1 pl-1",
                        bottomRight: "pt-1 pl-1",
                    }}
                    resizeHandleComponent={{
                        topLeft: <ResizeHandle />,
                        topRight: <ResizeHandle />,
                        bottomLeft: <ResizeHandle />,
                        bottomRight: <ResizeHandle />,
                    }}
                    onResizeStop={(_, __, ref, ___, pos) => {
                        const width = parseInt(ref.style.width.slice(0, -2));
                        const height = parseInt(ref.style.height.slice(0, -2));
                        const { x, y } = pos;

                        setRenderedDims({ width, height });
                        setRenderedPos({ x, y });
                    }}
                    onDragStop={(_, data) => {
                        setRenderedPos({ x: data.x, y: data.y });
                    }}
                    lockAspectRatio
                >
                    <div className="relative h-full w-full">
                        <NextImage
                            className="pointer-events-none rounded-sm"
                            src={imgUrl}
                            alt="user-img"
                            fill
                        />
                    </div>
                </Rnd>
            </div>

            <div className="h-[37.5rem] w-full p-2 col-span-full lg:col-span-1 flex flex-col bg-white">
                <ScrollArea className="relative flex-1 overflow-auto">
                    <div
                        aria-hidden="true"
                        className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
                    />

                    <div className="space-y-2">
                        <h2 className="tracking-tight font-bold text-3xl">
                            Customize your case
                        </h2>
                        <hr className="p-2" />
                    </div>
                    <div className="space-y-6 px-4 pb-12">
                        <div className="relative h-full flex flex-col justify-between">
                            <RadioGroup
                                value={options.color}
                                className="space-y-2"
                                onChange={(value) =>
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: value,
                                    }))
                                }
                            >
                                <h4 className="font-semibold text-md text-zinc-700">
                                    Color: {options.color.label}
                                </h4>
                                <div className="flex px-2 gap-4">
                                    {COLORS.map((color) => (
                                        <Field key={color.value}>
                                            <Radio
                                                className="cursor-pointer active:outline-none focus:outline-none"
                                                value={color}
                                            >
                                                {({ checked }) => (
                                                    <div
                                                        className={cn(
                                                            "size-10 relative rounded-full border-[3px] border-black border-opacity-25 transition",
                                                            checked &&
                                                                `border-opacity-100 border-${color.tw}`
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "size-8 m-auto absolute inset-0 rounded-full",
                                                                `bg-${color.tw}`
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </Radio>
                                        </Field>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <DropdownMenu>
                                <h3 className="font-semibold text-md text-zinc-700">
                                    Model
                                </h3>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="w-full justify-between"
                                        variant="outline"
                                    >
                                        {options.model.label}
                                        <ChevronsUpDown className="ml-2 size-4 shrink-0" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {MODELS.options.map((model) => (
                                        <DropdownMenuItem
                                            key={model.value}
                                            className={cn(
                                                "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                                                {
                                                    "bg-zinc-100":
                                                        model.label ===
                                                        options.model.label,
                                                }
                                            )}
                                            onClick={() =>
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    model,
                                                }))
                                            }
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 size-4 opacity-0",
                                                    model.label ===
                                                        options.model.label &&
                                                        "opacity-100"
                                                )}
                                            />
                                            {model.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {[MATERIALS, FINISHES].map(
                            ({ name, options: selectableOptions }) => (
                                <RadioGroup
                                    key={name}
                                    value={options[name]}
                                    className="space-y-4"
                                    onChange={(value) =>
                                        setOptions((prev) => ({
                                            ...prev,
                                            [name]: value,
                                        }))
                                    }
                                    aria-label={name}
                                >
                                    <h3 className="font-semibold text-md text-zinc-700">
                                        {name.charAt(0).toUpperCase() +
                                            name.slice(1)}
                                    </h3>
                                    {selectableOptions.map((option) => (
                                        <Field key={option.value}>
                                            <Radio
                                                value={option}
                                                className={cn(
                                                    "w-full ring-2 ring-black ring-opacity-20 rounded-lg p-4 cursor-pointer data-[checked]:ring-green-600 focus:outline-none active:outline-none transition"
                                                )}
                                                as="div"
                                            >
                                                <Label className="cursor-pointer flex justify-between">
                                                    <h4>{option.label}</h4>
                                                    <p>
                                                        {formatPrice(
                                                            option.price
                                                        )}
                                                    </p>
                                                </Label>
                                                <Description className="text-sm text-zinc-500">
                                                    {option.description}
                                                </Description>
                                            </Radio>
                                        </Field>
                                    ))}
                                </RadioGroup>
                            )
                        )}
                    </div>
                </ScrollArea>

                <hr className="p-2" />
                <div className="flex justify-between items-center gap-8">
                    <p>
                        {formatPrice(
                            BASE_PRICE +
                                options.material.price +
                                options.finish.price
                        )}
                    </p>
                    <Button
                        disabled={isPending}
                        onClick={() =>
                            updateConfig({
                                configId,
                                color: options.color.value,
                                phoneModel: options.model.value,
                                caseMaterial: options.material.value,
                                caseFinish: options.finish.value,
                            })
                        }
                        isLoading={isPending}
                        loadingText="redirecting"
                        size="sm"
                        className="w-full"
                    >
                        Continue
                        <ArrowRight className="size-4 ml-2 inline" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DesignConfigurator;
