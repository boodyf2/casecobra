import { prisma } from "@/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { email },
        });

        return verificationToken;
    } catch {
        return;
    }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        return verificationToken;
    } catch {
        return;
    }
};
