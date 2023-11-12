import React, { useEffect } from 'react';
import { Route, Routes, useLoaderData, useParams, useRoutes, useNavigate } from 'react-router-dom';
import { OrderService } from '../../services';

const OrderSuccess: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const PayerID = urlParams.get('PayerID');
  const navigate = useNavigate();
  
  const fetchOrder = async () => {
    try {
      const orderService = new OrderService();
      const data = await orderService.success(token!, PayerID!);
      navigate(`/order/${data.id}`);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);


  return (
    <div>
      <h2>En cours de validation...</h2>
      <p>Ne quittez pas la page.</p>
    </div>
  );
};

export default OrderSuccess;