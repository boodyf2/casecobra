"use client";
import firstSnake from "@/assets/snake-1.png";
import secSnake from "@/assets/snake-2.png";
import thirdSnake from "@/assets/snake-3.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

const STEPS = [
    {
        title: "Step 1: Add image",
        description: "Choose an image for your case",
        image: firstSnake,
        url: "/upload",
    },
    {
        title: "Step 2: Customize design",
        description: "Make the case yours",
        image: secSnake,
        url: "/design",
    },
    {
        title: "Step 3: Summary",
        description: "Review your final design",
        image: thirdSnake,
        url: "/preview",
    },
];

const Steps = () => {
    const pathname = usePathname();

    return (
        <ol className="mt-4 p-4 flex flex-col lg:flex-row border rounded-md">
            {STEPS.map((step, i) => {
                const isCurrent = pathname.endsWith(step.url);
                const isCompleted = STEPS.slice(i + 1).some((step) =>
                    pathname.endsWith(step.url)
                );

                return (
                    <li key={step.title} className="flex-1 relative pb-4">
                        <span
                            className={cn(
                                "h-full w-1 lg:h-1 lg:w-full absolute  left-0 lg:bottom-0 bg-zinc-400",
                                {
                                    "bg-gray-700": isCurrent,
                                    "bg-green-500": isCompleted,
                                }
                            )}
                        />
                        <div
                            className={cn("flex gap-4", {
                                "pl-3 lg:pl-10": i !== 0,
                            })}
                        >
                            <Image
                                className="w-20 h-20 object-contain"
                                src={step.image}
                                alt={step.title}
                            />
                            <div className="flex flex-col justify-center">
                                <h3
                                    className={cn(
                                        "text-zinc-700 font-semibold",
                                        {
                                            "text-green-600": isCompleted,
                                        }
                                    )}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                        {i !== 0 && (
                            <div className="hidden lg:block w-4 absolute inset-0">
                                <svg
                                    className="h-full text-gray-300"
                                    viewBox="0 0 12 82"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0.5 0V31L10.5 41L0.5 51V82"
                                        stroke="currentcolor"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
};

export default Steps;
