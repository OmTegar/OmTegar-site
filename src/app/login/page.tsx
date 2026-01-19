"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();

    // Redirect to admin if already logged in
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/admin");
        }
    }, [status, router]);

    // Show loading while checking session
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#010810]">
                <div className="text-[#43D9AD] font-mono">Checking authentication...</div>
            </div>
        );
    }

    // Don't render login form if authenticated
    if (status === "authenticated") {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Invalid credentials provided.',
                    background: '#0a1628',
                    color: '#e2e8f0',
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'border border-white/10 rounded-2xl'
                    }
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#0a1628',
                    color: '#e2e8f0',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Authenticated successfully'
                })
                router.push("/admin");
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'System Error',
                text: 'An unexpected error occurred.',
                background: '#0a1628',
                color: '#e2e8f0',
                confirmButtonColor: '#ef4444',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#010810] text-[#607B96] p-4">
            <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase">ADMIN<span className="text-[#43D9AD]">.</span>ACCESS</h2>
                    <p className="mt-2 text-sm italic">// enter credentials to override system</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/20 focus:z-10 focus:border-[#43D9AD] focus:ring-[#43D9AD] sm:text-sm font-mono"
                                placeholder="admin@omtegar.id"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/20 focus:z-10 focus:border-[#43D9AD] focus:ring-[#43D9AD] sm:text-sm font-mono"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg bg-[#43D9AD] px-4 py-3 text-sm font-bold uppercase tracking-widest text-[#011221] hover:bg-[#3bc29a] focus:outline-none focus:ring-2 focus:ring-[#43D9AD] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}
