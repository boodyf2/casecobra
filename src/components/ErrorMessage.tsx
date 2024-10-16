import { cn } from "@/lib/utils";
import { MailWarning } from "lucide-react";

interface ErrorMessageProps {
    message: string | undefined;
    className?: string;
}

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
    return (
        message && (
            <div
                className={cn(
                    "w-full px-6 py-2 bg-red-200 rounded-lg border border-red-300",
                    className
                )}
            >
                <div className="flex items-center gap-2">
                    <MailWarning className="" />
                    {message}
                </div>
            </div>
        )
    );
};

export default ErrorMessage;
