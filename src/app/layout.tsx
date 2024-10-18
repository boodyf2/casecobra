import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "CaseCobra",
    description: "Not just a phone case",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
                    <div className="flex-1 flex flex-col h-full">
                        {children}
                    </div>
                    <Footer />
                </main>
            </body>
        </html>
    );
}
