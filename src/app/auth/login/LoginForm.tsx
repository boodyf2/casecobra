"use client";
import { loginFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, loginWithGoogle } from "@/app/auth/actions";
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
import Link from "next/link";

const LoginForm = () => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        values: {
            email: "",
            password: "",
        },
    });

    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const configId = localStorage.getItem("configId");

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        setSuccess("");
        setError("");

        startTransition(async () => {
            const results = await login(values, configId);
            setError(results?.error);
            setSuccess(results?.success);
        });
    };

    return (
        <Card className="w-full my-4 md:w-9/12 lg:w-6/12">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@domain.com"
                                            type="email"
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
                        <Button
                            className="w-full"
                            isLoading={isPending}
                            loadingText="Submitting"
                            type="submit"
                        >
                            Submit
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
                    onClick={() => loginWithGoogle(configId)}
                    className="w-full"
                    variant="outline"
                >
                    <FaGoogle className="mr-2" />
                    Login with Google
                </Button>
                <SuccessMessage message={success} />
                <ErrorMessage message={error} />
            </CardContent>

            <CardFooter>
                <Link
                    className="w-full text-center text-green-600 hover:text-green-700 transition"
                    href="/auth/register"
                >
                    Don&apos;t have an account?
                </Link>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
