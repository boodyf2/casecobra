import { prisma } from "@/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import sharp from "sharp";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input;

            if (!configId) {
                const imgRes = await fetch(file.url);
                const imgBuffer = await imgRes.arrayBuffer();
                const imgMetadata = await sharp(imgBuffer).metadata();
                const { width, height } = imgMetadata;

                const config = await prisma.configuration.create({
                    data: {
                        width: width || 500,
                        height: height || 500,
                        imageUrl: file.url,
                    },
                });

                return { configId: config.id };
            }

            await prisma.configuration.update({
                where: {
                    id: configId,
                },
                data: {
                    croppedImageUrl: file.url,
                },
            });

            return { configId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
