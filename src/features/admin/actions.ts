"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const link = formData.get("link") as string;
    const technologyStr = formData.get("technology") as string;

    const technology = technologyStr.split(",").map((t) => t.trim());

    await prisma.project.create({
        data: {
            title,
            description,
            image,
            link,
            technology,
        },
    });

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
}
