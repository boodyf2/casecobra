import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { logout } from "@/app/auth/actions";

const Navbar = async () => {
    const session = await auth();
    let user = null;
    let isAdmin = false;

    if (session) {
        user = session.user;
        isAdmin = session.user?.isAdmin;
    }

    return (
        <nav className="sticky z-[100] min-h-14 inset-x-0 top-0 w-full py-2 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between min-h-14">
                    <Link href="/" className="flex z-40 text-2xl font-semibold">
                        case<span className="text-green-600">cobra</span>
                    </Link>
                    <div className="flex items-center h-full gap-4">
                        {user ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        href="/dashboard"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        Dashboard ✨
                                    </Link>
                                )}
                                <form action={logout}>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        type="submit"
                                    >
                                        Logout
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/register"
                                    className={buttonVariants({
                                        size: "default",
                                        variant: "ghost",
                                    })}
                                >
                                    Sign up
                                </Link>
                                <Link
                                    href="/auth/login"
                                    className={buttonVariants({
                                        size: "default",
                                        variant: "ghost",
                                    })}
                                >
                                    Login
                                </Link>
                            </>
                        )}

                        <div className="h-8 w-px mr-2 bg-zinc-200" />
                        <Link
                            href="/configure/upload"
                            className={buttonVariants({
                                size: "sm",
                                variant: "default",
                                className: "font-semibold",
                            })}
                        >
                            Create Case
                            <ArrowRight className="ml-1.5 h-4" />
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
