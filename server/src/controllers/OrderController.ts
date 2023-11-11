import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ProductsService } from "@services";

class OrderController {
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductsService.getProducts();
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const product = await ProductsService.getProductById(parseInt(id));
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };
}

export default new OrderController();
