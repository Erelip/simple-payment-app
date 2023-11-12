import React, { useEffect, useState } from 'react';
import { Route, Routes, useLoaderData, useParams, useRoutes, useNavigate } from 'react-router-dom';
import { RequireAuth } from '../../utils';
import App from '../../App';
import { ProductsService, OrderService } from '../../services';

const Cart: React.FC = () => {
  const [cart, setCart] = useState({id: 0, item: []});
  const { id } = useParams();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const productService = new ProductsService();
      const fetchedCart = await productService.getCart();
      setCart(fetchedCart);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateCart = async (product_id: number, quantity: number) => {
    try {
      const productService = new ProductsService();
      const fetchedCart = await productService.updateCart(product_id, quantity);
      setCart(fetchedCart);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const order = async (cart_id: number) => {
    try {
      const orderService = new OrderService();
      const data = await orderService.create(cart_id);
      const url = data.links[1].href;
      window.location.href = url;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <div>
      <ul>
        {cart.item.map((product: any) => (
          <li key={product.id}>
            <a href={`/collection/${product.id}`}>{product.name}</a>
            <span>{product.price}€</span>
            <span>{product.number}</span>
            <button onClick={() => {
              updateCart(product.product_id, product.number - 1)
            }}>-</button>
            <button onClick={() => {
              updateCart(product.product_id, product.number + 1)
            }}>+</button>
            <button onClick={() => {
              updateCart(product.product_id, 0)
            }}>Remove from cart</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        order(cart.id)
      }}>Order</button>
    </div>
  );
};

export default Cart;