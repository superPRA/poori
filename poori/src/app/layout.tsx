import Navbar from "@/components/Navbar";
import "./globals.css";
import {Providers} from "@/redux/provider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body className="bg-slate-950 h-[100vh]">
                    <header>
                        <Navbar />
                    </header>
                    {children}
                </body>
            </Providers>
        </html>
    );
}
