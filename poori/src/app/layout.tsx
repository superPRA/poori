import Navbar from "@/components/Navbar";
import "./globals.css";
import {Providers} from "@/redux/provider";
import Message from "@/components/Message";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body>
                    {children}
                    <Message />
                </body>
            </Providers>
        </html>
    );
}
