"use client";
import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import whatPplAreBuying from "@/assets/what-people-are-buying.png";
import { HTMLAttributes, useRef } from "react";

import firstTestimonial from "@/assets/testimonials/1.jpg";
import secondTestimonial from "@/assets/testimonials/2.jpg";
import thirdTestimonial from "@/assets/testimonials/3.jpg";
import fourthTestimonial from "@/assets/testimonials/4.jpg";
import fifthTestimonial from "@/assets/testimonials/5.jpg";
import sixthTestimonial from "@/assets/testimonials/6.jpg";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

const TESTIMONIALS = [
    [firstTestimonial, secondTestimonial],
    [thirdTestimonial, fourthTestimonial],
    [fifthTestimonial, sixthTestimonial],
];

const Reviews = () => {
    return (
        <>
            <MaxWidthWrapper className="w-full relative max-w-5xl">
                <Image
                    src={whatPplAreBuying}
                    alt="what-ppl-are-buyin"
                    aria-hidden="true"
                    className="absolute select-none hidden xl:block -left-32 top-1/3"
                />
                <ReviewGrid />
                <div className="pointer-events-none absolute inset-x-0 -top-2 h-32 bg-gradient-to-b from-20% from-slate-200" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-200" />
            </MaxWidthWrapper>
        </>
    );
};

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { once: true });

    return (
        <div
            ref={containerRef}
            className="relative mx-4 md:-mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
            {isInView && (
                <>
                    <ReviewColumn
                        reviews={TESTIMONIALS[0]}
                        durationInSec={15}
                    />
                    <ReviewColumn
                        reviews={TESTIMONIALS[1]}
                        durationInSec={20}
                    />
                    <ReviewColumn
                        reviews={TESTIMONIALS[2]}
                        durationInSec={15}
                    />
                </>
            )}
        </div>
    );
};

interface ReviewColumnProps {
    reviews: StaticImageData[];
    className?: string;
    durationInSec: number;
}

const ReviewColumn = ({
    reviews,
    className,
    durationInSec,
}: ReviewColumnProps) => {
    const columnRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={columnRef}
            className={cn("animate-marquee space-y-8 py-4", className)}
            style={
                {
                    "--marquee-duration": `${durationInSec}s`,
                } as React.CSSProperties
            }
        >
            {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
                <Review key={reviewIndex} imgSrc={imgSrc} />
            ))}
        </div>
    );
};

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: StaticImageData;
}

const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
    const POSSIBLE_ANIMATION_DELAYS = [
        "0.1s",
        "0.2s",
        "0.3s",
        "0.4s",
        "0.5s",
        "0.6s",
    ];

    const animationDelay =
        POSSIBLE_ANIMATION_DELAYS[
            Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
        ];

    return (
        <div
            className={cn(
                "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
                className
            )}
            style={{ animationDelay }}
            {...props}
        >
            <Phone imgSrc={imgSrc} />
        </div>
    );
};

export default Reviews;
