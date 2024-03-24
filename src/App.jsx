import { useState } from "react"; 
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Updated import statement
import Login from "./pages/auth/Login";
import Page404 from "./pages/Page404";
import Products from "./pages/products/Products";
import AuthProvider from "./context/AuthContext";
import MyCart from "./pages/shopping/MyCart";
import { CartProvider } from "./context/CartContext";
import AddProduct from "./pages/products/AddProduct";
import MyOrder from "./pages/shopping/MyOrder";
import DetailsProduct from "./pages/products/DetailsProduct";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<DetailsProduct />} />
              <Route path="/addproducts" element={<AddProduct />} />
              <Route path="/mycart" element={<MyCart />} />
              <Route path="/myorder" element={<MyOrder />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
