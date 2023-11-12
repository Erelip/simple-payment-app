import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ProductsService, OrderService, ItemService, CartService, PaymentService } from "@services";
import { Environment as env } from "@providers";
import { v4 as uuidv4 } from 'uuid';

class PaymentController {

    constructor() {
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        try {
            const cart = await CartService.getCartByUserId(id);            
            if (cart === null) throw new BadRequestException("Cart not found");

            const items = await ItemService.getItemsByCartId(cart.id);
            if (items.length === 0) throw new BadRequestException("Cart is empty");

            const amount = items.reduce((acc, item) => {
                return acc + (item.number * item.price);
            }, 0);
            
            const capture = await PaymentService.createOrder(id, amount);
            const order = await OrderService.create(1, capture.id, items);

            return res.status(200).json(capture);
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

    success = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { token, PayerID } = req.body;
        try {
            if (token === undefined && PayerID === undefined) {
                throw new UnauthorizedException("Unauthorized");
            }

            const payment = await PaymentService.getOrderDetails(String(token));
            if (!payment) throw new BadRequestException("Payment not found");

            const order = await OrderService.update(id, payment.id, 'Paid');

            return res.status(200).json(order);
        } catch (err) {
            next(err);
        }
    };

    cancel = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { paymentId, token, PayerID } = req.query;
        try {
            const product = await ProductsService.getProductById(parseInt(id));
            return res.status(200).json("product");
        } catch (err) {
            next(err);
        }
    };
    
}

export default new PaymentController();
