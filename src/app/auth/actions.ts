"use server";
import { signIn } from "@/auth";
import { createUser } from "@/data/user";
import { loginFormSchema, registerFormSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";
import { z } from "zod";

export const login = async (
    values: z.infer<typeof loginFormSchema>,
    configId?: string | null
) => {
    const result = loginFormSchema.safeParse(values);
    if (!result.success) {
        return { error: "Something went wrong" };
    }

    try {
        const { email, password } = result.data;
        // NEEDED A DOMAIN SO MAYBE IF I GOT ONE I'LL IMPLEMENT THE VERIFICATION PROCESS
        // const existingUser = await getUserByEmail(email);

        // if (!existingUser || !existingUser.email || !existingUser.password) {
        //     return { error: "Invalid credentials!" };
        // }

        // if (!existingUser.emailVerified) {
        //     await generateVerificationToken(email);
        //     return {
        //         success: "A verification email has been sent again to you!",
        //     };
        // }

        await signIn("credentials", {
            email: email.toLowerCase(),
            password,
            redirectTo: configId ? `/configure/preview?id=${configId}` : "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { error: "Invalid credentials!" };
                }

                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }

    return { success: "Redirecting..." };
};

export const loginWithGoogle = async (configId?: string | null) => {
    await signIn("google", {
        redirectTo: configId ? `/configure/preview?id=${configId}` : "/",
    });
};

export const register = async (user: z.infer<typeof registerFormSchema>) => {
    const results = registerFormSchema.safeParse(user);

    if (!results.success) {
        return { error: "Something went wrong" };
    }

    try {
        const { email } = results.data;
        await createUser({
            ...results.data,
            email: email.toLowerCase(),
        });
        // const verificationToken = await generateVerificationToken(email);
    } catch {
        return { error: "User already exists!" };
    }

    return { success: "Redirecting..." };
};

export const logout = async () => {
    await signOut();
};
