import { auth } from "@/auth";
import AdminSidebar, { type NavItem } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const userRole = session?.user?.role;

    const navItems: NavItem[] = [
        { name: "Dashboard", href: "/admin", iconName: "FiGrid" },
        { name: "Projects", href: "/admin/projects", iconName: "FiFolder" },
        { name: "Certificates", href: "/admin/certificates", iconName: "FiAward" },
    ];

    // Add Manage Users for SUPERADMIN only
    if (userRole === "SUPERADMIN") {
        navItems.push({ name: "Manage Users", href: "/admin/manage-users", iconName: "FiUsers" });
    }

    return (
        <div className="min-h-screen bg-[#010810] text-[#607B96] flex font-fira-code">
            <AdminSidebar navItems={navItems} />
            <main className="flex-1 p-4 pt-16 lg:pt-8 lg:p-8 overflow-x-hidden">
                <div className="max-w-6xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

