import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../utils';
import App from '../../App';
import { ProductsService } from '../../services';
import { Products } from '../';

const Collection: React.FC = () => {
  return (
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
            <App />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Collection;