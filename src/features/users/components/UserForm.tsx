"use client";

import { createUser } from "../actions/userActions";
import { useState } from "react";
import Swal from "sweetalert2";

export default function UserForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            await createUser(formData);
            setIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'User Created',
                text: 'The user has been successfully added.',
                background: '#0a1628',
                color: '#e2e8f0',
                confirmButtonColor: '#43D9AD',
                customClass: {
                    popup: 'border border-white/10 rounded-2xl'
                }
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: err instanceof Error ? err.message : "Failed to create user",
                background: '#0a1628',
                color: '#e2e8f0',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'border border-white/10 rounded-2xl'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-[#43D9AD] text-[#011221] font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-[#3bc29a] transition-colors"
            >
                + Add User
            </button>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-bold uppercase tracking-wider">New User</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#607B96] hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-[#607B96] mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/20 focus:border-[#43D9AD] focus:outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-[#607B96] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/20 focus:border-[#43D9AD] focus:outline-none"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-[#607B96] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/20 focus:border-[#43D9AD] focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-[#607B96] mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#43D9AD] focus:outline-none"
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="SUPERADMIN">SuperAdmin</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-[#43D9AD] text-[#011221] font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-[#3bc29a] transition-colors disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create User"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 bg-white/5 text-[#607B96] font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
