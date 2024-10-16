import { hash, genSalt } from "bcryptjs";
import z from "zod";
import { prisma } from "@/prisma";
import { registerFormSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch {
        return;
    }
};

export const createUser = async (user: z.infer<typeof registerFormSchema>) => {
    const salt = await genSalt(10);
    const hasedPassword = await hash(user.password, salt);

    const userData = {
        name: user.name,
        email: user.email,
        password: hasedPassword,
    };

    try {
        await prisma.user.create({
            data: userData,
        });
    } catch {
        throw new Error("Couldn't create the user");
    }

    return hasedPassword;
};
