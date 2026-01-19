"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

type Role = "SUPERADMIN" | "ADMIN";

async function checkSuperAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPERADMIN") {
        throw new Error("Unauthorized: SUPERADMIN access required");
    }
    return session;
}

export async function createUser(formData: FormData) {
    await checkSuperAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;

    if (!name || !email || !password || !role) {
        throw new Error("All fields are required");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });

    revalidatePath("/admin/manage-users");
}

export async function updateUser(id: string, formData: FormData) {
    await checkSuperAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;

    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
        updateData.password = await bcrypt.hash(password, 12);
    }

    await prisma.user.update({
        where: { id },
        data: updateData,
    });

    revalidatePath("/admin/manage-users");
}

export async function deleteUser(id: string) {
    const session = await checkSuperAdmin();

    // Prevent self-deletion
    if (session.user.id === id) {
        throw new Error("Cannot delete your own account");
    }

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/admin/manage-users");
}

export async function updateUserRole(id: string, role: Role) {
    const session = await checkSuperAdmin();

    // Prevent self role change
    if (session.user.id === id) {
        throw new Error("Cannot change your own role");
    }

    await prisma.user.update({
        where: { id },
        data: { role },
    });

    revalidatePath("/admin/manage-users");
}
