import Navbar from "@/components/Navbar";
import useDataProvider from "@/methods/useDataProvider";
import SectionHome from "@/sections/Home";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <header className="h-28 bg-neutral-700">

            </header>
            <main>
                <SectionHome />
            </main>
        </>
    );
}
