class OrderService {
    private endpoint: string;

    constructor() {
        this.endpoint = 'http://localhost:3000';
    }

    async getOrders() {
        const response = await fetch(`${this.endpoint}/order`, {
            credentials: 'include',
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    async getOrderById(id: number) {
        const response = await fetch(`${this.endpoint}/order/${id}`, {
            credentials: 'include',
            method: 'GET'
        });

        const data = await response.json();
        return data;
    }

    async create(cart_id: number) {
        const response = await fetch(`${this.endpoint}/order`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart_id: cart_id
            })
        });

        const data = await response.json();
        return data;
    }

    async success(token: string, PayerID: string) {
        const response = await fetch(`${this.endpoint}/payment/success`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                PayerID: PayerID
            })
        });

        const data = await response.json();
        return data;
    }
}
  
export default OrderService;