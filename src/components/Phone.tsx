import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";

import lightPhone from "@/assets/phone-template-white-edges.png";
import darkPhone from "@/assets/phone-template-dark-edges.png";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: StaticImageData | string;
    className?: string;
    dark?: boolean;
}

const Phone = ({ imgSrc, dark, className, ...props }: PhoneProps) => {
    return (
        <div
            className={cn(
                "relative pointer-events-none z-50 overflow-hidden",
                className
            )}
            {...props}
        >
            <Image
                className="pointer-events-none z-50 select-none"
                src={dark ? darkPhone : lightPhone}
                alt="phone"
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
            />
            <Image
                className="absolute -z-10 inset-0 object-cover min-w-full min-h-full"
                src={imgSrc}
                alt="cover-image"
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
            />
        </div>
    );
};

export default Phone;
