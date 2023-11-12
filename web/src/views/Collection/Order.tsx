import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../utils';
import { OrderSuccess, OrderId } from '../../components';

const Order: React.FC = () => {
  return (
    <div>
      <h2>Order Page</h2>
      <Routes>
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <OrderId />
            </RequireAuth>
          }
        />
        <Route
          path="/success"
          element={
            <RequireAuth>
              <OrderSuccess />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default Order;