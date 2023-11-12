import { Cart, User, Products, Order } from "@prisma/client";
import { Prisma } from "@providers";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import { ItemService, ProductsService, OrderService, CartService } from "@services";
import { Environment as env } from "@providers";

class PaymentService {
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
        this.paypalApiUrl = 'https://api.sandbox.paypal.com';
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

    getOrderDetails = async (token: string) => {
        try {
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
            return data;
        } catch {
            return null;
        }
    };

    createOrder = async (user_id: number, amount: number) => {
        try {
            this.access_token = await this.getAccessToken();
            const paymentData = {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                    currency_code: 'EUR',
                    value: amount,
                  },
                }],
                custom_id: user_id, 
                application_context: {
                    return_url: 'http://localhost:8081/order/success',
                    cancel_url: 'http://localhost:8081/order/cancel',

                },
            };

            const response = await fetch(`${this.paypalApiUrl}/v2/checkout/orders`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.access_token}`,
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();
            return data;
        } catch {
            return null;
        }
    };

    success = async (token: string, PayerID: string) => {
        try {
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
            return data;
        } catch {
            return null;
        }
    };

    cancel_url = async (id: number, products_id: number): Promise<Cart | null> => {
        try {
            return null;
        } catch(error) {
            return null;
        }
    };
}

export default new PaymentService();