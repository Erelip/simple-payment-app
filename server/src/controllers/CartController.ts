import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { CartService, ProductsService } from "@services";

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
            const product = await CartService.getCartByUserId(id);
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };

    add = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const products_id = req.params.id;
        try {
            const product = await ProductsService.getProductById(parseInt(products_id));

            if (product == null ) throw new BadRequestException("Bad request")

            const cart = await CartService.create(id, parseInt(products_id));

            if (cart == null ) throw new BadRequestException("An error has occurred")

            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const user_id = req.user.id;
        const { id } = req.params;
        try {
            const product = await CartService.deleteOne(user_id, parseInt(id));
            
            if (product == null ) throw new BadRequestException("An error has occurred")

            return res.status(200).json(product);
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
