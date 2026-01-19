import { prisma } from "@/lib/prisma";
import { createProject, deleteProject } from "@/features/admin/actions";
import { FiTrash2, FiPlus } from "react-icons/fi";

export default async function AdminProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-white">MANAGE_PROJECTS</h2>
            </div>

            {/* Basic Create Form */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">_NEW_PROJECT_ENTRY</h3>
                <form action={createProject} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input name="title" placeholder="Title" required className="bg-black/20 text-white p-3 rounded-lg border border-white/10 focus:border-[#43D9AD] outline-none" />
                        <input name="technology" placeholder="Tech Stack (comma separated)" required className="bg-black/20 text-white p-3 rounded-lg border border-white/10 focus:border-[#43D9AD] outline-none" />
                    </div>
                    <input name="image" placeholder="Image URL (e.g., /projects/demo.jpg)" required className="w-full bg-black/20 text-white p-3 rounded-lg border border-white/10 focus:border-[#43D9AD] outline-none" />
                    <input name="link" placeholder="Project Link" className="w-full bg-black/20 text-white p-3 rounded-lg border border-white/10 focus:border-[#43D9AD] outline-none" />
                    <textarea name="description" placeholder="Description" required rows={3} className="w-full bg-black/20 text-white p-3 rounded-lg border border-white/10 focus:border-[#43D9AD] outline-none" />

                    <button type="submit" className="bg-[#43D9AD] text-black font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-white transition-all flex items-center gap-2">
                        <FiPlus /> Initialize Project
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{project.title}</h4>
                                <div className="flex gap-2 text-xs text-[#607B96] mt-1">
                                    {project.technology.map(t => <span key={t} className="bg-white/5 px-2 py-0.5 rounded">{t}</span>)}
                                </div>
                            </div>
                        </div>

                        <form action={deleteProject.bind(null, project.id)}>
                            <button type="submit" className="text-red-500/50 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                                <FiTrash2 size={20} />
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
