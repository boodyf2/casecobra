import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { ArrowRight, Check, Star } from "lucide-react";
import Phone from "@/components/Phone";
import Icons from "@/components/Icons";
import Reviews from "@/components/Reviews";
import snake from "@/assets/snake-1.png";
import secSnake from "@/assets/snake-2.png";
import firstUser from "@/assets/users/user-1.png";
import secondUser from "@/assets/users/user-2.png";
import thirdUser from "@/assets/users/user-3.png";
import fourthUser from "@/assets/users/user-4.jpg";
import fifthUser from "@/assets/users/user-5.jpg";
import yourImage from "@/assets/your-image.png";
import line from "@/assets/line.png";
import coverImage from "@/assets/testimonials/1.jpg";
import arrow from "@/assets/arrow.png";
import horse from "@/assets/horse.jpg";
import horsePhone from "@/assets/horse_phone.jpg";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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

            {/* value proposition section */}
            <section className="bg-slate-200 py-24">
                <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
                    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                        <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                            What our{" "}
                            <span className="relative px-2">
                                customers
                                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600" />
                            </span>
                            say
                        </h2>
                        <Image
                            src={secSnake}
                            alt="sec-snake"
                            className="w-24 order-0 lg:order-2"
                        />
                    </div>

                    <div className="mx-auto lg:mx-0 max-w-2xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2 gap-y-16">
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    &quot;The case feels durable and I even got
                                    a compliment on the design. Had the case for
                                    two and a half months now and{" "}
                                    <span className="p-0.5 bg-slate-900 text-white">
                                        the image is super clear
                                    </span>
                                    , on the case I had before, the image
                                    started fading into yellow-ish color after a
                                    couple weeks. Love it.&quot;
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src={firstUser}
                                    alt="user"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col ">
                                    <h3 className="font-semibold text-lg">
                                        Jonathan
                                    </h3>
                                    <p className="text-zinc-600 text-sm">
                                        <Check className="inline-block mr-1 h-4 w-4 text-green-600 stroke-[3px]" />
                                        Verified Purchase
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Second user review */}
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    &quot;I usually keep my phone together with
                                    my keys in my pocket and that led to some
                                    pretty heavy scratchmarks on all of my last
                                    phone cases. This one besides a barely
                                    noticable scratch on the corner,{" "}
                                    <span className="bg-slate-900 text-white p-0.5">
                                        looks brand new after about half a year
                                    </span>
                                    . I dig it&quot;
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src={secondUser}
                                    alt="user"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col ">
                                    <h3 className="font-semibold text-lg">
                                        Dina
                                    </h3>
                                    <p className="text-zinc-600 text-sm">
                                        <Check className="inline-block mr-1 h-4 w-4 text-green-600 stroke-[3px]" />
                                        Verified Purchase
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

                <div className="pt-16">
                    <Reviews />
                </div>
            </section>

            <section>
                <MaxWidthWrapper className="py-24">
                    <div className="mb-12 px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                                Upload your photo and get{" "}
                                <span className="bg-green-600 text-white relative px-2">
                                    your own case
                                </span>
                                now
                            </h2>
                        </div>
                    </div>

                    <div className="mx-auto px-6 lg:px-8 max-w-6xl">
                        <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                            <Image
                                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                                src={arrow}
                                alt="arrow"
                            />
                            <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm">
                                <Image
                                    className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                                    src={horse}
                                    alt="horse"
                                />
                            </div>
                            <Phone className="w-60" imgSrc={horsePhone} />
                        </div>
                    </div>

                    <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
                        <li className="w-fit">
                            <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                            High-quality silicone material
                        </li>
                        <li className="w-fit">
                            <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                            Scratch and fingerprint resistent coating
                        </li>
                        <li className="w-fit">
                            <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                            Wireless charging compatible
                        </li>
                        <li className="w-fit">
                            <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                            5 year print warranty
                        </li>

                        <div className="flex justify-center">
                            <Link
                                href="/"
                                className={buttonVariants({
                                    size: "lg",
                                    variant: "default",
                                    className: "font-semibold mt-8",
                                })}
                            >
                                Create Your Case Now
                                <ArrowRight className="ml-1.5 h-4" />
                            </Link>
                        </div>
                    </ul>
                </MaxWidthWrapper>
            </section>
        </div>
    );
};

export default HomePage;
