import { Role } from "@prisma/client";

export type { Role };

export interface SessionUser {
    id: string;
    name?: string | null;
    email: string;
    role: Role;
}

export interface AuthUser {
    id: string;
    name?: string | null;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
