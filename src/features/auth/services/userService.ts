import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
}) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "ADMIN",
        },
    });
}

export async function updateUser(
    id: string,
    data: {
        name?: string;
        email?: string;
        password?: string;
        role?: Role;
    }
) {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 12);
    }

    return prisma.user.update({
        where: { id },
        data: updateData,
    });
}

export async function deleteUser(id: string) {
    return prisma.user.delete({
        where: { id },
    });
}

export async function getAllUsers() {
    return prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}
