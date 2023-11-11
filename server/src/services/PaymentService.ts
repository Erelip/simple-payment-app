import { Cart, User, Products, Order } from "@prisma/client";
import { Prisma } from "@providers";
import { BadRequestException } from "@exceptions";
import { ItemService, ProductsService, OrderService, CartService } from "@services";

class PaymentService {
    return_url = async (id: number, reference_id: string): Promise<Order | null> => {
        try {
            const cart = await CartService.getCartByUserId(id);
            if (!cart) throw new BadRequestException("Cart not found");
            const items = await ItemService.getItemsByCartId(cart.id);

            if (!items) throw new BadRequestException("Items not found");

            return await OrderService.create(id, reference_id, items);
            // return await Prisma.cart.findUnique({
            //     where: {
            //         user_id: id,
            //     },
            //     include: {
            //         item: true,
            //     },
            // });
        } catch {
            return null;
        }
    };

    cancel_url = async (id: number, products_id: number): Promise<Cart | null> => {
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
}

export default new PaymentService();