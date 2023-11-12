import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { OrderService, PaymentService, CartService, ItemService } from "@services";

class OrderController {
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await OrderService.getOrder();
            return res.status(200).json(orders);
        } catch (err) {
            next(err);
        }
    };

    getByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        try {
            const product = await OrderService.getOrdersByUserId(id);
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const product = await OrderService.getOrderById(parseInt(id));
            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { cart_id } = req.body;
        try {
            const cart = await CartService.getCartByUserId(id);            
            if (cart === null) throw new BadRequestException("Cart not found");

            const items = await ItemService.getItemsByCartId(cart_id);
            if (items.length === 0) throw new BadRequestException("Cart is empty");

            var amount = items.reduce((acc, item) => {
                return acc + (item.number * item.price);
            }, 0);
            amount = parseFloat((Math.round(amount * 100) / 100).toFixed(2));

            const capture = await PaymentService.createOrder(id, amount);
            const order = await OrderService.create(id, capture.id, items);

            return res.status(200).json(capture);
        } catch (err) {
            next(err);
        }
    };
}

export default new OrderController();
