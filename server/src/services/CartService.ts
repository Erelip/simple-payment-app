import { Cart, User } from "@prisma/client";
import { Prisma } from "@providers";

class CartService {
    getCarts = async () => {
        return await Prisma.cart.findMany();
    };

    create = async (id: number, products_id: number): Promise<Cart | null> => {
        try {
            return await Prisma.cart.create({
                 data: {
                    user_id: id,
                    products_id: products_id,
                }
            })
        } catch {
            return null;
        }
    };

    getCartByUserId = async (id: number): Promise<Cart[] | null> => {
        try {
            return await Prisma.cart.findMany({
                where: {
                    user_id: id,
                },
            });
        } catch {
            return null;
        }
    };

    deleteOne = async (id: number, products_id: number): Promise<any> => {
        try {
            return await Prisma.cart.delete({
                where: {
                    user_id: id,
                    products_id: products_id
                },
            });
        } catch {
            return 0;
        }
    };

    delete = async (id: number): Promise<any> => {
        try {
            return await Prisma.cart.deleteMany({
                where: {
                    user_id: id,
                },
            });
        } catch {
            return 0;
        }
    };
}

export default new CartService();