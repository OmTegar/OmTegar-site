import { auth } from "@/auth";

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">DASHBOARD</h2>
                <p className="text-[#607B96]">
                    Welcome back, <span className="text-[#43D9AD]">{session?.user?.name || session?.user?.email}</span>
                    <span className="ml-2 text-xs uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10">
                        {session?.user?.role}
                    </span>
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <StatsCard label="Projects" value="Manage" href="/admin/projects" />
                <StatsCard label="Certificates" value="Manage" href="/admin/certificates" />
                <StatsCard label="System Status" value="Online" href="#" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-[#607B96]">// Dashboard content coming soon</p>
            </div>
        </div>
    );
}

function StatsCard({ label, value, href }: { label: string, value: string, href: string }) {
    return (
        <a href={href} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#43D9AD]/50 transition-all group">
            <p className="text-xs font-bold text-[#607B96] uppercase tracking-widest mb-2">{label}</p>
            <p className="text-2xl font-black text-white group-hover:text-[#43D9AD] transition-colors">{value}</p>
        </a>
    );
}

