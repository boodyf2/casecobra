"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { COLORS } from "@/validators/options-validator";
import { CaseColor } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import clearPhone from "@/assets/clearphone.png";

interface PhonePreviewProps {
    croppedImageUrl: string | null;
    color: CaseColor | null;
}

const PhonePreview = ({
    croppedImageUrl: croppedImgUrl,
    color,
}: PhonePreviewProps) => {
    const [renderedDims, setRenderedDims] = useState({ width: 0, height: 0 });
    const ref = useRef<HTMLDivElement>(null);
    const colorTw = COLORS.find(
        (colorOption) => colorOption.value === color
    )!.tw;

    useEffect(() => {
        const handleResize = () => {
            if (!ref.current) {
                return;
            }

            const { width, height } = ref.current.getBoundingClientRect();
            setRenderedDims({ width, height });
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AspectRatio className="relative" ref={ref} ratio={3000 / 2001}>
            <div
                className="absolute z-20 scale-[1.0352]"
                style={{
                    left:
                        renderedDims.width / 2 -
                        renderedDims.width / (1216 / 121),
                    top: renderedDims.height / 6.22,
                }}
            >
                <Image
                    src={croppedImgUrl!}
                    alt="cover-img"
                    className={cn(
                        "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
                        colorTw
                    )}
                    width={renderedDims.width / (3000 / 637)}
                    height={0}
                    priority={true}
                />
            </div>
            <div className="relative size-full z-40">
                <Image src={clearPhone} alt="clear-phone" />
            </div>
        </AspectRatio>
    );
};

export default PhonePreview;
