"use client";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import {
    Image as ImageIcon,
    Loader2,
    MousePointerSquareDashed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const CreatePage = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(45);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const { toast } = useToast();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId;

            startTransition(() => {
                router.push(`/configure/design?id=${configId}`);
            });
        },
        onUploadProgress: (p) => {
            setUploadProgress(p);
        },
    });

    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined });
        setIsDragOver(false);
    };

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [rejectedFile] = rejectedFiles;
        setIsDragOver(false);
        toast({
            title: `${rejectedFile.file.type} type is not supported`,
            description:
                "The image should be one of the following types (PNG, JPG, JPEG)",
            variant: "destructive",
        });
    };

    return (
        <div
            className={cn(
                "relative h-full my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex-1 flex justify-center flex-col items-center",
                {
                    "ring-blue-900/25 bg-blue-900/10": isDragOver,
                }
            )}
        >
            <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone
                    onDropAccepted={onDropAccepted}
                    onDropRejected={onDropRejected}
                    accept={{
                        "image/png": ["png"],
                        "image/jpeg": ["jpeg"],
                        "image/jpg": ["jpg"],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className="w-full h-full flex-1 flex flex-col items-center justify-center"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className="h-6 text-zinc-500 mb-2" />
                            ) : isUploading || isPending ? (
                                <Loader2 className="animate-spin h-6 text-zinc-500 mb-2" />
                            ) : (
                                <ImageIcon className="h-6 text-zinc-500 mb-2" />
                            )}

                            <div className="flex flex-col items-center mb-2 text-sm text-zinc-500">
                                {isUploading ? (
                                    <>
                                        <p>Uploading...</p>
                                        <Progress
                                            value={uploadProgress}
                                            className="mt-2 w-40 h-2 bg-gray-300"
                                        />
                                    </>
                                ) : isPending ? (
                                    <p>Redirecting, please wait...</p>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">
                                            Drop file{" "}
                                        </span>
                                        to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold">
                                            Click to upload{" "}
                                        </span>
                                        or drag and drop
                                    </p>
                                )}

                                {!isPending && (
                                    <p className="text-xs text-zinc-500">
                                        PNG, JPG, JPEG
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default CreatePage;
