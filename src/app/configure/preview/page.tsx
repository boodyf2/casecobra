import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { SessionProvider } from "next-auth/react";

interface PreviewPageProps {
    searchParams: {
        id: string;
    };
}
const PreviewPage = async ({ searchParams: { id } }: PreviewPageProps) => {
    const config = await prisma.configuration.findUnique({ where: { id } });
    if (!config) {
        return notFound();
    }

    return (
        <SessionProvider>
            <DesignPreview config={config} />
        </SessionProvider>
    );
};

export default PreviewPage;
