class ProductsService {
    private endpoint: string;
    
    constructor() {
        this.endpoint = 'http://localhost:3000';
    }

    async getProducts() {
        const response = await fetch(`${this.endpoint}/products`, {
            credentials: 'include',
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    async getProductById(id: number) {
        const response = await fetch(`${this.endpoint}/products/${id}`, {
            credentials: 'include',
            method: 'GET'
        });

        const data = await response.json();
        return data;
    }

    async getCart() {
        const response = await fetch(`${this.endpoint}/cart`, {
            credentials: 'include',
            method: 'GET',
        });

        const data = await response.json();
        return data;
    }

    async addToCart(product_id: number) {
        const response = await fetch(`${this.endpoint}/cart`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                product_id: product_id
            })
        });

        const data = await response.json();
        return data;
    }

    async updateCart(product_id: number, quantity: number) {
        const response = await fetch(`${this.endpoint}/cart`, {
            credentials: 'include',
            method: 'PATCH',
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
            credentials: 'include',
            method: 'DELETE',
        });

        const data = await response.json();
        return data;
    }
}
  
export default ProductsService;