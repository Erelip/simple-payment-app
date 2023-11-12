class ProductsService {
    private token: string | null;
    private endpoint: string;
    
    constructor() {
        this.token = localStorage.getItem('token');
        this.endpoint = 'http://localhost:3000';
    }

    async getProducts() {
        const response = await fetch(`${this.endpoint}/products`, {
            method: 'GET'
        });

        const data = await response.json();
        return data;
    }

    async getProductById(id: number) {
        const response = await fetch(`${this.endpoint}/products/${id}`, {
            method: 'GET'
        });

        const data = await response.json();
        return data;
    }

    async getCart() {
        const response = await fetch(`${this.endpoint}/cart`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        });

        const data = await response.json();
        return data;
    }

    async addToCart(product_id: number) {
        const response = await fetch(`${this.endpoint}/cart`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                product_id: product_id
            })
        });

        const data = await response.json();
        return data;
    }

    async updateCart(product_id: number, quantity: number) {
        const response = await fetch(`${this.endpoint}/cart`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                product_id: product_id,
                quantity: quantity
            })
        });

        const data = await response.json();
        return data;
    }

    async deleteCart(product_id: number) {
        const response = await fetch(`${this.endpoint}/cart`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            }
        });

        const data = await response.json();
        return data;
    }
}
  
export default ProductsService;