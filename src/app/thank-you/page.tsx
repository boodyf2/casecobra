import ThankYou from "./ThankYou";

interface ThankYouPageProps {
    searchParams: {
        orderId: string;
    };
}

const ThankYouPage = ({ searchParams: { orderId } }: ThankYouPageProps) => {
    return <ThankYou orderId={orderId} />;
};

export default ThankYouPage;
