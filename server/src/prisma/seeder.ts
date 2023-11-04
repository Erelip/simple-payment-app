import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

async function testInitialization() {
    /**
     * @description demo test [test@gmail.com:demodemo]
     */
    await prisma.test.upsert({
        where: { email: "test@gmail.com" },
        update: {},
        create: {
            email: "test@gmail.com",
            // password: demodemo
            password:
                "$2a$10$Jd9zZYCqQLc8GxFbvhbljeYT9utOjeyfJDM0DNicoGAoco4PeLhla",
        },
    });
}

async function main() {
    testInitialization();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });