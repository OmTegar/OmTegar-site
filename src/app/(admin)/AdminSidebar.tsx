"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut, FiGrid, FiFolder, FiAward, FiUsers, FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

// Icon map to resolve icon names to actual components
const iconMap = {
    FiGrid,
    FiFolder,
    FiAward,
    FiUsers,
} as const;

export type IconName = keyof typeof iconMap;

export interface NavItem {
    name: string;
    href: string;
    iconName: IconName;
}

interface AdminSidebarProps {
    navItems: NavItem[];
}

export default function AdminSidebar({ navItems }: AdminSidebarProps) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to sign out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, sign out',
            cancelButtonText: 'Cancel',
            background: '#0a1628',
            color: '#e2e8f0',
            customClass: {
                popup: 'border border-white/10 rounded-2xl',
                title: 'font-bold tracking-wide',
                confirmButton: 'font-bold uppercase tracking-wider text-sm',
                cancelButton: 'font-bold uppercase tracking-wider text-sm',
            }
        });

        if (result.isConfirmed) {
            await signOut({ callbackUrl: "/login" });
        }
    };

    const closeMobileSidebar = () => setIsMobileOpen(false);

    return (
        <>
            {/* Mobile Header Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-[#010810]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="p-2 -ml-2 rounded-lg text-white hover:bg-white/5 transition-colors"
                    >
                        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h1 className="text-white font-black tracking-widest text-lg">
                        OM<span className="text-[#43D9AD]">.</span>ADMIN
                    </h1>
                </div>
            </header>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Sidebar Drawer */}
            <aside className={`
                fixed top-0 bottom-0 left-0 w-72 bg-[#010810]/95 backdrop-blur-xl border-r border-white/10 z-50
                flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                lg:translate-x-0 lg:w-64 lg:static lg:h-full
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Desktop Header (Hidden on Mobile) */}
                <div className="hidden lg:block p-6 border-b border-white/10">
                    <h1 className="text-white font-black tracking-widest text-lg">
                        OM<span className="text-[#43D9AD]">.</span>ADMIN
                    </h1>
                </div>

                {/* Mobile Header Spacer (Visible on Mobile) */}
                <div className="lg:hidden h-[65px] border-b border-white/10 flex items-center px-6">
                    <span className="text-[#607B96] text-xs font-mono uppercase">Navigation</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = iconMap[item.iconName];
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileSidebar}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-[#43D9AD]/10 text-[#43D9AD] border border-[#43D9AD]/20"
                                    : "hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <Icon className="text-xl" />
                                <span className="text-sm font-bold uppercase tracking-wider">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 bg-[#010810]/50">
                    <button
                        onClick={() => {
                            closeMobileSidebar();
                            handleLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-all group"
                    >
                        <FiLogOut className="text-xl group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
                    </button>

                    {/* User Info (Optional addition for better UX) */}
                    <div className="mt-4 pt-4 border-t border-white/5 text-center">
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
                            Logged in as Admin
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}
