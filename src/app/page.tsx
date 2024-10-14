import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import snake from "@/assets/snake-1.png";
import firstUser from "@/assets/users/user-1.png";
import secondUser from "@/assets/users/user-2.png";
import thirdUser from "@/assets/users/user-3.png";
import fourthUser from "@/assets/users/user-4.jpg";
import fifthUser from "@/assets/users/user-5.jpg";
import yourImage from "@/assets/your-image.png";
import line from "@/assets/line.png";
import coverImage from "@/assets/testimonials/1.jpg";
import Phone from "@/components/Phone";

const HomePage = () => {
    return (
        <div className="bg-slate-50">
            <section>
                <MaxWidthWrapper className="pb-24 lg:pb-32 pt-10 lg:pt-24 xl:pt-32 lg:grid lg:grid-cols-3 sm-pb-32 lg:gap-x-0 xl:gap-x-8">
                    <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
                        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                                <Image
                                    src={snake}
                                    alt="snake"
                                    className="w-full"
                                />
                            </div>
                            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                                Your Image on a{" "}
                                <span className="bg-green-600 text-white px-2">
                                    Custom
                                </span>
                                Phone Case
                            </h1>
                            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                                Capture your favourite memories with your own,
                                <span className="font-semibold">
                                    one-of-one
                                </span>{" "}
                                phone case. CaseCobra allows you to protect your
                                memories, not just your phone case.
                            </p>
                            <ul className="flex flex-col items-start space-y-2 mt-8 text-left font-medium">
                                <li className="flex items-center gap-1.5 text-left">
                                    <Check className="text-green-600 shrink-0" />
                                    High-quality, durable material
                                </li>
                                <li className="flex items-center gap-1.5 text-left">
                                    <Check className="text-green-600 shrink-0" />
                                    5 years print guarantee
                                </li>
                                <li className="flex items-center gap-1.5 text-left">
                                    <Check className="text-green-600 shrink-0" />
                                    Modern iPhone models supported
                                </li>
                            </ul>
                            <div className="mt-12 flex flex-col md:flex-row items-center gap-5">
                                <div className="flex -space-x-4 select-none pointer-events-none">
                                    <Image
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 object-cover"
                                        src={firstUser}
                                        alt="user-1"
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 object-cover"
                                        src={secondUser}
                                        alt="user-2"
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 object-cover"
                                        src={thirdUser}
                                        alt="user-3"
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 object-cover"
                                        src={fourthUser}
                                        alt="user-4"
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 object-cover"
                                        src={fifthUser}
                                        alt="user-5"
                                    />
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex gap-0 5">
                                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                        <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                    </div>
                                    <p>
                                        <span className="font-semibold">
                                            1,250
                                        </span>{" "}
                                        happy customers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
                        <div className="relative md:max-w-xl">
                            <Image
                                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
                                src={yourImage}
                                alt="your-image"
                            />
                            <Image
                                className="absolute w-20 -left-6 -bottom-6 select-none"
                                src={line}
                                alt="line"
                            />
                            <Phone imgSrc={coverImage} className="w-64" />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
};

export default HomePage;
