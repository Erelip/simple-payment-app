import React from 'react';
import { Route, Routes, useLoaderData } from 'react-router-dom';
import { RequireAuth } from '../../utils';
import App from '../../App';
import { ProductsService } from '../../services';
import { Products, Product } from '../';

const Collection: React.FC = () => {
  return (
    <div>
      <h2>Products Page</h2>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <Product />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default Collection;