import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { logout } from "@/actions/logout";

const Navbar = async () => {
    const session = await auth();
    let user = null;
    let isAdmin = false;

    if (session) {
        user = session.user;
        isAdmin = session.user.isAdmin;
    }

    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex items-center justify-between h-14">
                    <Link href="/" className="flex z-40 text-2xl font-semibold">
                        case<span className="text-green-600">cobra</span>
                    </Link>
                    <div className="flex items-center h-full space-x-2 md:space-x-4 ">
                        {user ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        href="/"
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

                        <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
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
