import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { CartService, ItemService, ProductsService } from "@services";

class CartController {
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await CartService.getCarts();
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    };

    getByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        try {
            const cart = await CartService.getCartByUserId(id);
            return res.status(200).json(cart);
        } catch (err) {
            next(err);
        }
    };

    add = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { product_id } = req.body;
        try {
            const product = await ProductsService.getProductById(parseInt(product_id));
            if (product == null ) throw new BadRequestException("Bad request")

            const cart = await CartService.add(id, parseInt(product_id));
            if (cart == null ) throw new BadRequestException("An error has occurred")

            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const user_id = req.user.id;
        const { product_id, quantity } = req.body;

        try {
            const cart = await CartService.getCartByUserId(user_id);
            if (cart == null ) throw new BadRequestException("An error has occurred")
  
            if (quantity <= 0) {
                const product = await ItemService.delete(product_id, cart.id);
                if (product == null ) throw new BadRequestException("An error has occurred")
                return res.status(200).json(product);
            }

            const product = await ItemService.update(product_id, cart.id, 0, quantity);
            if (product == null ) throw new BadRequestException("An error has occurred")

            return res.status(200).json(await CartService.getCartByUserId(user_id));
        } catch (err) {
            next(err);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        try {
            const product = await CartService.delete(id);
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };
}

export default new CartController();
