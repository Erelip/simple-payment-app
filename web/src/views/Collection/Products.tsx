import React, { useEffect, useState } from 'react';
import { ProductsService } from '../../services';

const Products: React.FC = () => {
  const [products, setProducts] = useState<[]>([]);

  const fetchProducts = async () => {
    try {
      const productService = new ProductsService();
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product_id: number) => {
    try {
      const productService = new ProductsService();
      const fetchedProducts = await productService.addToCart(product_id);
      // setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <a href={`/collection/${product.id}`}>{product.name}</a>
            <span>{product.price}€</span>
            <button onClick={() => {
              addToCart(product.id)
            }}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Products;