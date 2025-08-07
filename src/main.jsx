
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; // <-- layout with Header/Navbar/Footer
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products/Products';
import Carts from './pages/Products/Carts';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },           // renders at /
      { path: 'home', element: <Home /> },          // renders at /home
      { path: 'about', element: <About /> },        // renders at /about
      { path: 'products', element: <Products /> },        // renders at /about
      { path: 'carts', element: <Carts /> },        // renders at /about
      
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
