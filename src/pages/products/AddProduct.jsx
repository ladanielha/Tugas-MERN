import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { addToCart } = useCart();

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

  const truncateDesc = (description, maxLength = 60) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  };
  const handleAddToCart = (product) => {
    console.log(product);
    addToCart(product); 
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-8 justify-center">
          Product List Page
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
          {products.map((product) => (
            <div className="group" key={product.id}>
              <div className="relative">
                <img
                  src={product.image}
                  alt=""
                  className="h-[220px] w-[260px]  rounded-md"
                />
                <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                  <CustomButton
                    btnText={"Add to cart"}
                    onClick={() => handleAddToCart(product)}
                  />
                </div>
              </div>
              <div className="leading-7">
                <h2 className="font-semibold">{product.title}</h2>
                <h2 className="font-bold">${product.price}</h2>
                <h2 className="font">{truncateDesc(product.description)}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
