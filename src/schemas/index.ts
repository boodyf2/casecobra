import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(2, { message: "Email is required" }),
    password: z.string().min(2, { message: "Password is required" }),
});

export const registerFormSchema = z
    .object({
        name: z.string().min(2, { message: "Name is required" }),
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z
            .string()
            .min(8, { message: "Password must be atleast 8 characters" }),
        confirmPassword: z
            .string()
            .min(2, { message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"],
    })
    .refine((data) => isNaN(+data.name), {
        message: "Name must be a valid word",
        path: ["name"],
    });
