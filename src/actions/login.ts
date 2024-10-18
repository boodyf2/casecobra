"use server";
import { signIn } from "@/auth";
import { loginFormSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginFormSchema>) => {
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
            redirectTo: "/",
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

export const loginWithGoogle = async () => {
    await signIn("google");
};
