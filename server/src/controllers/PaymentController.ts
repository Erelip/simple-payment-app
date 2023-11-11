import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ProductsService, OrderService, ItemService } from "@services";
import { Environment as env } from "@providers";
import { v4 as uuidv4 } from 'uuid';

class PaymentController {
    protected paypalClientId?: string;
    protected paypalClientSecret?: string;
    protected authString?: string;
    protected access_token?: string;
    protected paypalApiUrl?: string;

    constructor() {
        this.paypalClientId = env.paypal.clientId;
        this.paypalClientSecret = env.paypal.clientSecret;
        this.access_token = env.paypal.access_token;
        this.authString = Buffer.from(`${this.paypalClientId}:${this.paypalClientSecret}`).toString('base64');
        this.paypalApiUrl = 'https://api.sandbox.paypal.com'; // Use 'https://api.paypal.com' for the production environment
    }

    getAccessToken = async () => {
        const response = await fetch(`${this.paypalApiUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${this.authString}`,
        },
        body: 'grant_type=client_credentials',
        });
    
        const data = await response.json();
        return data.access_token;
    };

    capturePayment = async (accessToken: string, orderId: string) => {
        const paypalApiUrl = 'https://api.sandbox.paypal.com'; // Use 'https://api.paypal.com' for the production environment
        const response = await fetch(`${this.paypalApiUrl}/v2/checkout/orders/${orderId}/capture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({}),
        });
      
        const data = await response.json();
        return data;
    };

    getOrderDetails = async (accessToken: string, orderId: string) => {
        const paypalApiUrl = 'https://api.sandbox.paypal.com'; // Use 'https://api.paypal.com' for the production environment
        const response = await fetch(`${this.paypalApiUrl}/v2/checkout/orders/${orderId}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        return data;
      };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const uuid = uuidv4();
            const access_token = await this.getAccessToken();

            const paymentData = {
                intent: 'CAPTURE',
                purchase_units: [{
                    custom_id: 'customField', // Use custom_id to include your custom data

                    amount: {
                    currency_code: 'USD',
                    value: '10.00',
                  },
                }],
                custom_id: req.user.id, 
                application_context: {
                    return_url: 'https://usable-cub-mainly.ngrok-free.app/payment/success',
                    cancel_url: 'https://usable-cub-mainly.ngrok-free.app/payment/cancel',

                },
            };

            const response = await fetch(`${this.paypalApiUrl}/v2/checkout/orders`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(paymentData),
            });
          

            const data = await response.json();
            const capture = await this.getOrderDetails(access_token, data.id);
            const items = await ItemService.getItemsByCartId(req.user.id);
            const order = await OrderService.create(req.user.id, data.id, items);
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
        // const { id } = req.user;
        const { token, PayerID } = req.query;
        try {

            if (token === undefined || PayerID === undefined) {
                throw new UnauthorizedException("Unauthorized");
            }

            this.access_token = await this.getAccessToken();
            const response = await fetch(`${this.paypalApiUrl}/v2/checkout/orders/${token}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error exchanging token for order ID: ${response.statusText}`);
            }
            const data = await response.json();
            const order = await OrderService.update(1, data.id, 'Paid');
            return res.status(200).json(data);
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
