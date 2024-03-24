import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          console.error("Error fetch products:");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const truncateDesc = (description, maxLength = 30) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  };

  const handleAddToCart = (product) => {
    console.log(product);
    addToCart(product); 
    toast.success("1 Items added to cart", {
      position: "bottom-center"
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="font-[sans-serif]">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Product List Page
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 shadow-md overflow-hidden rounded-2xl cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <Link to={`products/${product.id}`}>
                  <div className="w-11/12 h-[220px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-6 bg-orange-100 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-800">
                      {truncateDesc(product.title)}
                    </h3>
                    <h4 className="text-lg text-gray-700 font-bold mt-2">
                      ${product.price}
                    </h4>
                    <p className="text-gray-500 text-sm mt-2">
                      {truncateDesc(product.description)}
                    </p>
                    <div className="flex space-x-2 mt-6">
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
