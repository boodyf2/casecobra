import LoginForm from "@/components/LoginForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const LoginPage = () => {
    return (
        <MaxWidthWrapper className="my-8 h-[94vh] flex justify-center items-center">
            <LoginForm />
        </MaxWidthWrapper>
    );
};

export default LoginPage;
