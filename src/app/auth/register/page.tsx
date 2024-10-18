import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

const RegisterPage = () => {
    return (
        <MaxWidthWrapper className="my-8 h-[94vh] flex justify-center items-center">
            <RegisterForm />
        </MaxWidthWrapper>
    );
};

export default RegisterPage;
