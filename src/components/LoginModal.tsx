import { DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";

import snake from "@/assets/snake-1.png";
import Link from "next/link";
import { Button } from "./ui/button";

interface LoginModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger />
            <DialogContent>
                <DialogTitle>
                    <Image className="w-2/12 mx-auto" src={snake} alt="snake" />
                    <h2 className="text-center text-3xl font-bold">
                        Login to continue
                    </h2>
                </DialogTitle>
                <DialogDescription className="space-y-8">
                    <p className="text-zinc-500">
                        <span className="text-zinc-700">
                            Your configuration was saved!
                        </span>{" "}
                        Please login or create an account to complete your
                        purchase
                    </p>
                    <div className="flex gap-4">
                        <Button className="flex-1" variant="outline">
                            <Link href="/auth/login">Login</Link>
                        </Button>
                        <Button className="flex-1">
                            <Link href="/auth/register">Register</Link>
                        </Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
