import React, { useEffect, useState } from 'react';
import { Route, Routes, useLoaderData, useParams, useRoutes, useNavigate } from 'react-router-dom';
import { OrderService } from '../../services';

const Order: React.FC = () => {
  const [order, setOrder] = useState({id: 0, name: '', products: [], total: 0, created_at: '', status: ''});
  const { id } = useParams();

  const fetchOrder = async () => {
    try {
      const orderService = new OrderService();
      const fetchedOrder = await orderService.getOrderById(parseInt(id!));
      setOrder(fetchedOrder);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);


  return (
    <div>
        {order.products.map((product: any) => (
          <li key={product.id}>
            <a href={`/collection/${product.id}`}>{product.name}</a>
            <span>(x{product.number}): {product.price * product.number}€</span>
          </li>
        ))}
        <p>Total: {(Math.round(order.total * 100) / 100).toFixed(2)}€</p>
        <p>Date: {order.created_at} </p>
        <p>Status: {order.status} </p>
    </div>
  );
};

export default Order;