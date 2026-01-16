"use client";

import { ReactNode } from "react";
import Layout from "@/components/Layout";
import "@/app/globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}
