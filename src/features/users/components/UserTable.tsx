"use client";

import { UserDisplay } from "../types";
import { deleteUser, updateUserRole } from "../actions/userActions";
import { useState } from "react";
import Swal from "sweetalert2";

interface UserTableProps {
    users: UserDisplay[];
    currentUserId: string;
}

export default function UserTable({ users, currentUserId }: UserTableProps) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleRoleChange = async (userId: string, newRole: "SUPERADMIN" | "ADMIN") => {
        setLoading(userId);
        try {
            await updateUserRole(userId, newRole);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#0a1628',
                color: '#e2e8f0'
            });
            Toast.fire({
                icon: 'success',
                title: 'Role updated successfully'
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: err instanceof Error ? err.message : "Failed to update role",
                background: '#0a1628',
                color: '#e2e8f0',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'border border-white/10 rounded-2xl'
                }
            });
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (userId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, delete user!',
            background: '#0a1628',
            color: '#e2e8f0',
            customClass: {
                popup: 'border border-white/10 rounded-2xl'
            }
        });

        if (!result.isConfirmed) return;

        setLoading(userId);
        try {
            await deleteUser(userId);
            Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
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
                title: 'Delete Failed',
                text: err instanceof Error ? err.message : "Failed to delete user",
                background: '#0a1628',
                color: '#e2e8f0',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'border border-white/10 rounded-2xl'
                }
            });
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#607B96]">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4">
                                    <span className="text-white font-medium">{user.name || "-"}</span>
                                    {user.id === currentUserId && (
                                        <span className="ml-2 text-xs text-[#43D9AD]">(You)</span>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-[#607B96]">{user.email}</td>
                                <td className="px-4 py-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as "SUPERADMIN" | "ADMIN")}
                                        disabled={user.id === currentUserId || loading === user.id}
                                        className={`bg-black/30 border border-white/10 rounded px-2 py-1 text-sm ${user.role === "SUPERADMIN" ? "text-[#E99287]" : "text-[#43D9AD]"
                                            } ${user.id === currentUserId ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        <option value="ADMIN">Admin</option>
                                        <option value="SUPERADMIN">SuperAdmin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-4 text-[#607B96] text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        disabled={user.id === currentUserId || loading === user.id}
                                        className={`text-red-400 hover:text-red-300 text-sm font-medium transition-colors ${user.id === currentUserId ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        {loading === user.id ? "..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
