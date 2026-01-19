export interface UserDisplay {
    id: string;
    name: string | null;
    email: string;
    role: "SUPERADMIN" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    role: "SUPERADMIN" | "ADMIN";
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    role?: "SUPERADMIN" | "ADMIN";
}
