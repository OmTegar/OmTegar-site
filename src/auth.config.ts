import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

// Extend types to include role in auth object
declare module "next-auth" {
    interface User {
        role?: Role;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        id?: string;
        role?: Role;
    }
}

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // JWT callback is needed in the shared config so edge middleware can access role
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as Role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.role = token.role as Role;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnManageUsers = nextUrl.pathname.startsWith('/admin/manage-users');

            if (isOnAdmin) {
                if (!isLoggedIn) return false; // Redirect unauthenticated users to login page

                // Only SUPERADMIN can access manage-users
                if (isOnManageUsers) {
                    const userRole = (auth?.user as { role?: string })?.role;
                    if (userRole !== 'SUPERADMIN') {
                        return Response.redirect(new URL('/admin', nextUrl));
                    }
                }
                return true;
            }
            return true;
        },
    },
    providers: [], // Configured in auth.ts
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

