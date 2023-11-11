import { Order, Item } from "@prisma/client";
import { CartService, ItemService } from "@services";
import { Prisma } from "@providers";
import { BadRequestException } from "@exceptions";

class OrderService {
    getOrder = async () => {
        return await Prisma.products.findMany();
    };

    getOrdersByUserId = async (user_id: number): Promise<Order[] | null> => {
        try {
            return await Prisma.order.findMany({
                where: {
                    user_id: user_id,
                },
            });
        } catch {
            return null;
        }
    };

    getOrderById = async (id: number): Promise<Order | null> => {
        try {
            return await Prisma.order.findUnique({
                where: {
                    id: id,
                },
            });
        } catch {
            return null;
        }
    };

    getOrderByReferenceId = async (reference_id: string): Promise<Order | null> => {
        try {
            return await Prisma.order.findUnique({
                where: {
                    reference_id: reference_id,
                },
            });
        } catch {
            return null;
        }
    };

    create = async (user_id: number, reference_id: string, items: Item[]): Promise<Order> => {
        const cart = await CartService.getCartByUserId(user_id);

        if (!cart) throw new BadRequestException("Cart not found");

        const total = items.reduce((acc, item) => {
            return acc + (item.number * item.price);
        }, 0);

        const order = await Prisma.order.create({
            data: {
                user: {
                    connect: { id: user_id },
                },
                reference_id: reference_id,
                total: total,
                status: 'Pending',
            },
            include: {
                products: true,
            },
        });
        await Promise.all(items.map(async (item) => {
            await ItemService.update(item.product_id, item.product_id, order.id, item.number);
            order.products.push(item);
        }));
        await ItemService.deleteByCartId(cart.id);
        return order;
    };

    update = async (user_id: number, reference_id: string, status: string): Promise<Order> => {
        const cart = await CartService.getCartByUserId(user_id);

        if (!cart) throw new BadRequestException("Cart not found");
        return await Prisma.order.update({
            where: {
                reference_id: reference_id,
            },
            data: {
                status: status,
            },
            include: {
                products: true,
            },
        });
    };


}

export default new OrderService();