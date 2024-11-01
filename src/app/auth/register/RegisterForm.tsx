"use client";
import { registerFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, loginWithGoogle } from "@/app/auth/actions";
import { register } from "../actions";
import Link from "next/link";
import z from "zod";

import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useTransition } from "react";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";

const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        values: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        setSuccess("");
        setError("");

        startTransition(async () => {
            const results = await register(values);
            setError(results?.error);
            setSuccess(results?.success);
            const configId = localStorage.getItem("configId");
            await login(
                {
                    email: values.email.toLowerCase(),
                    password: values.password,
                },
                configId
            );
        });
    };

    return (
        <Card className="w-full my-4 md:w-9/12 lg:w-6/12">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@domain.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            isLoading={isPending}
                            loadingText="Registering your data"
                        >
                            Register
                        </Button>
                    </form>
                </Form>

                <div>
                    <div className="w-10/12 h-px bg-zinc-200 mx-auto " />
                    <div className="-mt-4 text-center">
                        <span className="bg-white p-4 text-lg">or</span>
                    </div>
                </div>

                <Button
                    onClick={() => loginWithGoogle()}
                    className="w-full"
                    variant="outline"
                >
                    <FaGoogle className="mr-2" />
                    Signup with Google
                </Button>
                <SuccessMessage message={success} />
                <ErrorMessage message={error} />
            </CardContent>

            <CardFooter>
                <Link
                    className="w-full text-center text-green-600 hover:text-green-700 transition"
                    href="/auth/login"
                >
                    Already have an account?
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RegisterForm;
