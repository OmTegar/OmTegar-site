import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create a superadmin user
    const superadmin = await prisma.user.upsert({
        where: { email: "admin@omtegar.id" },
        update: {},
        create: {
            name: "Super Admin",
            email: "admin@omtegar.id",
            password: hashedPassword,
            role: "SUPERADMIN",
        },
    });

    console.log("Created superadmin:", superadmin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });

