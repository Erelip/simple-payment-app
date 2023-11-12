import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth, SignUp, SignIn, Collection, Cart, Order } from './views';
import { RequireAuth } from './utils';
import { ProductsService } from './services';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/login",
    element: <SignIn />,
  },
  {
    path: "/auth/register",
    element: <SignUp />,
  },
  {
    path: "/collection/*",
    element: <Collection />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/*",
    element: <Order />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

reportWebVitals();
