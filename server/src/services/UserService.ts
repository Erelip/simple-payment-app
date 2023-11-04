import { User } from "@prisma/client";
import { Prisma } from "@providers";

class UserService {
    getUser = async () => {
        return await Prisma.products.findMany();
    };

    getUserById = async (id: number): Promise<User | null> => {
        try {
            return await Prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
        } catch {
            return null;
        }
    };

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            return await Prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        } catch {
            return null;
        }
    };

    create = async (
        email: string,
        password: string | undefined,
    ): Promise<User> => {
        return await Prisma.user.create({
            data: {
                email: email,
                password: password,
            },
        });
    };

}

export default new UserService();