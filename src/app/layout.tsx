import { ReactNode } from "react";
import Layout from "@/components/Layout";
import AuthProvider from "@/components/AuthProvider";
import "@/app/globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Layout>
                        {children}
                    </Layout>
                </AuthProvider>
            </body>
        </html>
    );
}
