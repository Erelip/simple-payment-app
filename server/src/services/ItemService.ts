import { Cart, User, Products, Item } from "@prisma/client";
import { Prisma } from "@providers";
import { BadRequestException } from "@exceptions";
import { CartService, ProductsService } from "@services";

class ItemService {
    getItem = async () => {
        return await Prisma.item.findMany();
    };

    getItemsByCartId = async (cart_id: number) => {
        try {
            return await Prisma.item.findMany({
                where: {
                    cart_id: cart_id,
                },
            });
        } catch(error) {
            return null;
        }
    };

    create = async (product_id: number, cart_id: number): Promise<Item | null> => {
        try {
            const product = await ProductsService.getProductById(product_id);

            if (!product) throw new BadRequestException("Product not found");

            var item = await Prisma.item.upsert({
                where: {
                    product_cart_id: {
                        product_id: product_id,
                        cart_id: cart_id
                    }
                },
                update: {
                    number: {
                        increment: 1
                    }
                },
                create: {
                    cart: {
                        connect: { id: cart_id },
                    },
                    product: {
                        connect: { id: product.id },
                    },
                    number: 1,
                    price: product.price,
                    name: product.name
                }
            });

            if (!item) throw new BadRequestException("An error has occured.");
            return item;
        } catch(error) {
            return null;
        }
    };

    deleteOne = async (id: number, products_id: number): Promise<any> => {
        try {
            const item = await Prisma.item.update({
                where: {
                    product_cart_id: {
                        product_id: products_id,
                        cart_id: id,
                    }
                },
                data: {
                    number: {
                        decrement: 1
                    }
                }
            });

            if (item == null ) throw new BadRequestException("Bad request");
        } catch {
            return null;
        }
    };

    delete = async (product_id: number, cart_id: number): Promise<any> => {
        try {
            return await Prisma.item.delete({
                where: {
                    product_cart_id: {
                        product_id: product_id,
                        cart_id: cart_id,
                    }
                },
            });
        } catch {
            return null;
        }
    };
}

export default new ItemService();