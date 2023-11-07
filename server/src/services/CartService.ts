import { Cart, User, Products } from "@prisma/client";
import { Prisma } from "@providers";
import { BadRequestException } from "@exceptions";
import { ItemService, ProductsService } from "@services";

class CartService {
    getCarts = async () => {
        return await Prisma.cart.findMany();
    };

    getCartByUserId = async (id: number): Promise<Cart | null> => {
        try {
            return await Prisma.cart.findUnique({
                where: {
                    user_id: id,
                },
                include: {
                    item: true,
                },
            });
        } catch {
            return null;
        }
    };

    add = async (id: number, products_id: number): Promise<Cart | null> => {
        try {
            const cart = await Prisma.cart.findUnique({
                where: {
                    user_id: id
                }
            });

            if (!cart) throw new BadRequestException("Cart not found");

            const item = await ItemService.create(products_id, cart.id);

            if (!item) throw new BadRequestException("An error has occured.");

            return cart;
        } catch(error) {
            return null;
        }
    };

    create = async (id: number): Promise<Cart | null> => {
        try {
            return await Prisma.cart.create({
                data: {
                    user_id: id,
                }
            })
        } catch {
            return null;
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            const cart = await Prisma.cart.findUnique({
                where: {
                    user_id: id,
                },
            });

            if (!cart) throw new BadRequestException("Cart not found");
            
            const items = await ItemService.getItemsByCartId(cart.id);

            if (!items) throw new BadRequestException("Cart is empty");

            for (const item of items) {
                await ItemService.delete(item.product_id, cart.id);
            }

            return await Prisma.cart.delete({
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