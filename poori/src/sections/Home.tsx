import Link from "next/link";
import { FaWeightHanging } from "react-icons/fa";

export default function SectionHome() {
    return (
        <section className="h-screen">
            <div className="bg-slate-500 bg-opacity-50 rounded-xl grid grid-cols-3 p-20 gap-10 container mx-auto my-20">
                <Link
                    href={"/dashboard/weight"}
                    className="bg-gray-500 text-white text-center rounded-lg py-10"
                >
                    <FaWeightHanging className="text-6xl mx-auto" />
                    <h1 className="text-center text-3xl pt-4">Weight</h1>
                </Link>
            </div>
        </section>
    );
}
