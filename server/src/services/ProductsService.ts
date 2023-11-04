import { Products } from "@prisma/client";
import { Prisma } from "@providers";

class ProductsService {
    getProducts = async () => {
        return await Prisma.products.findMany();
    };

    getProductById = async (id: number): Promise<Products | null> => {
        try {
            return await Prisma.products.findUnique({
                where: {
                    id: id,
                },
            });
        } catch {
            return null;
        }
    };
}

export default new ProductsService();