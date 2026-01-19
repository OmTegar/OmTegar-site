import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/features/users/services/userService";
import UserTable from "@/features/users/components/UserTable";
import UserForm from "@/features/users/components/UserForm";

export default async function ManageUsersPage() {
    const session = await auth();

    // Double-check authorization (middleware should handle this, but be safe)
    if (!session?.user || session.user.role !== "SUPERADMIN") {
        redirect("/admin");
    }

    const users = await getAllUsers();

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">MANAGE USERS</h2>
                <p className="text-[#607B96]">
                    Create, edit, and manage user accounts and roles.
                </p>
            </div>

            <UserForm />

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm">
                        All Users ({users.length})
                    </h3>
                </div>
                <UserTable users={users} currentUserId={session.user.id} />
            </div>
        </div>
    );
}
