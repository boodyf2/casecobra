"use server";
import z from "zod";
import { registerFormSchema } from "@/schemas";
import { createUser } from "@/data/user";

export const register = async (user: z.infer<typeof registerFormSchema>) => {
    const results = registerFormSchema.safeParse(user);

    if (!results.success) {
        return { error: "Something went wrong" };
    }

    try {
        // const { email } = results.data;
        await createUser(results.data);
        // const verificationToken = await generateVerificationToken(email);
    } catch {
        return { error: "User already exists!" };
    }

    return { success: "Redirecting..." };
};
