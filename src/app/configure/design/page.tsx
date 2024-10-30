import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface DesignPageProps {
    searchParams: {
        id: string;
    };
}

const DesignPage = async ({ searchParams: { id } }: DesignPageProps) => {
    const config = await prisma.configuration.findUnique({
        where: {
            id,
        },
    });

    if (!config) {
        // TODO: Add a Not found page
        return notFound();
    }

    const { width, height, imageUrl } = config;

    return (
        <DesignConfigurator
            imgUrl={imageUrl}
            imgDims={{ width, height }}
            configId={id}
        />
    );
};

export default DesignPage;
