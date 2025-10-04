import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const rosnoc = localFont({
    src: "./fonts/rosnoc.woff2",
    variable: "--font-rosnoc",
    display: "swap",
});

const satoshi = localFont({
    src: "./fonts/satoshi.woff2",
    variable: "--font-satoshi",
    display: "swap",
});

export const metadata: Metadata = {
    title: "AEROGUARD",
    description: "AEROGUARD project by CodeXplore Team",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${rosnoc.variable} ${satoshi.variable} antialiased`}
            suppressHydrationWarning
        >
            <body className="font-satoshi bg-sky-50 flex justify-center items-center">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
