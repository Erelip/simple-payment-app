import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../utils';
import App from '../../App';
import { ProductsService } from '../../services';

const Product: React.FC = (products) => {
  return (
    <p>Hello world</p>
  );
};

export default Product;