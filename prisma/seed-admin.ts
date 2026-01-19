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

    // Create a regular admin user for testing
    const admin = await prisma.user.upsert({
        where: { email: "testadmin@omtegar.id" },
        update: {},
        create: {
            name: "Test Admin",
            email: "testadmin@omtegar.id",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Created admin:", admin.email, admin.role);
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
