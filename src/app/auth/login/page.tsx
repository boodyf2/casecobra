import LoginForm from "./LoginForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const LoginPage = async () => {
    return (
        <MaxWidthWrapper className="my-auto flex justify-center items-center">
            <LoginForm />
        </MaxWidthWrapper>
    );
};

export default LoginPage;
