import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const ConfigureLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MaxWidthWrapper className="flex-1 flex flex-col">
            {children}
        </MaxWidthWrapper>
    );
};

export default ConfigureLayout;
