// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Theme
import ColorModeProvider from "./theme/ColorModeProvider";

// Layout + shared
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";

// Top-level pages
import Home from "./pages/Home";
import About from "./pages/About";

// Products
import Products from "./pages/Products/Products";
import ProductsSearch from "./pages/Products/ProductsSearch";
import ProductDetail from "./pages/Products/ProductDetail";
import Carts from "./pages/Products/Carts";

// Users
import GetAllUsers from "./pages/Users/GetAllUsers";
import CartsByUsers from "./pages/Users/CartsByUsers";
import UserCartDetail from "./pages/Users/UserCartDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },

      // Products
      { path: "products", element: <Products /> },
      { path: "products-search", element: <ProductsSearch /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "carts", element: <Carts /> },

      // Users
      { path: "users", element: <GetAllUsers /> },
      { path: "carts-by-user/:userId", element: <CartsByUsers /> },
      { path: "user-cart/:cartId", element: <UserCartDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  </React.StrictMode>
);
