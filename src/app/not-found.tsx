import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import snake from "@/assets/snake-1.png";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";

const NotFoundPage = () => {
    return (
        <Card className="w-10/12 lg:w-6/12 mt-32 mx-auto text-center">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                    <TriangleAlert className="size-10 mx-auto mb-2" />
                    Not Found
                </CardTitle>
                <CardDescription>This page doesn&apos;t exist</CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    className="w-6/12 lg:w-3/12 mx-auto"
                    src={snake}
                    alt="snake"
                    priority={true}
                />
            </CardContent>
        </Card>
    );
};

export default NotFoundPage;
