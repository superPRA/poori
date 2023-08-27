"use client";
import useDataProvider from "@/methods/useDataProvider";
import Link from "next/link";
import { FaWeightHanging } from "react-icons/fa";

export default function SectionHome() {
    const [data] = useDataProvider({
        data: {},
        formId: "get/user/info",
        key: "user",
    });
    console.log(data);
    return (
        <section className="py-20">
            <div className="bg-slate-500 bg-opacity-50 rounded-xl grid grid-cols-3 p-20 gap-10 container mx-auto ">
                <CardContainer rand_id={data?.["data-provider"]?.user?.rand_id}>
                    <>
                        <FaWeightHanging className="text-6xl mx-auto" />
                        <h1 className="text-center text-3xl pt-4">Weight</h1>
                    </>
                </CardContainer>
            </div>
        </section>
    );
}

const CardContainer = ({
    children,
    rand_id,
}: {
    children: React.JSX.Element;
    rand_id: string | undefined;
}) => {
    if (rand_id)
        return (
            <Link
                href={`/dashboard/${rand_id}/weight`}
                className="bg-gray-500 text-white text-center rounded-lg py-10"
            >
                {children}
            </Link>
        );
    return (
        <button className="bg-gray-500 text-white text-center rounded-lg py-10">
            {children}
        </button>
    );
};
