"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillCaretDown, AiOutlineHome } from "react-icons/ai";
import { TbWeight } from "react-icons/tb";

export default function Home() {
    const pathname = usePathname();
    return (
        <main className="grid grid-cols-12 gap-12 h-screen p-2 bg-[#e6e7eb]">
            <div className="col-span-3 h-full bg-white rounded-lg shadow px-8 py-10">
                <div className="text-5xl font-bold px-5 text-neutral-600">
                    Pooriya ...
                </div>
                <div className="mt-10">
                    {navItems.map((navItem, index) => {
                        return (
                            <Link
                                data-active={pathname.includes(navItem.to)}
                                key={index}
                                href={navItem.to}
                                className={`flex justify-between group font-semibold hover:text-[#0E25FE] 
                                    data-[active=true]:text-[#0E25FE] hover:bg-blue-800 items-center 
                                    data-[active=true]:bg-blue-800 data-[active=true]:bg-opacity-20 
                                    hover:bg-opacity-20 transition-colors text-xl p-5 mt-1 hover: rounded-lg
                                `}
                            >
                                <i className="text-4xl">{navItem.icon}</i>
                                {navItem.text}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

const navItems = [
    {
        text: "home",
        icon: <AiOutlineHome />,
        to: "/",
    },
    {
        text: "weight",
        icon: <TbWeight />,
        to: "/weight",
    },
];
