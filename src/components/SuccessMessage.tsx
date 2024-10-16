import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
    message: string | undefined;
    className?: string;
}

const SuccessMessage = ({ message, className }: SuccessMessageProps) => {
    return (
        message && (
            <div
                className={cn(
                    "w-full px-6 py-2 bg-green-200 rounded-lg border border-green-300",
                    className
                )}
            >
                <div className="flex items-center gap-2">
                    <CheckCircle className="" />
                    {message}
                </div>
            </div>
        )
    );
};

export default SuccessMessage;
