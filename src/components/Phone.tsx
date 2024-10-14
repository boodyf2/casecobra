import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";

import lightPhone from "@/assets/phone-template-white-edges.png";
import darkPhone from "@/assets/phone-template-dark-edges.png";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: StaticImageData;
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
            />
            <Image
                className="absolute -z-10 inset-0 object-cover"
                src={imgSrc}
                alt="cover-image"
            />
        </div>
    );
};

export default Phone;
