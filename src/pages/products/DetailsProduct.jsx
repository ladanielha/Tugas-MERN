import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        if (response.status === 200) {
          const data = response.data;
          console.table(data);
          setProducts(data);
        } else {
          console.error("Error fetch detail product:");
        }
      } catch (error) {
        console.error("Failed to fetch details product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product, quantity) => {
    if (user) {
      addToCart(product, quantity); // Pass quantity to addToCart function
      toast.success(`${quantity} Item(s) added to cart`, {
        position: "bottom-center",
      });
    } else {
      toast.error("You Need to Login ", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="font-[sans-serif]">
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          {products && (
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="w-full lg:sticky top-0 text-center">
                <div className="lg:h-[600px]">
                  <img
                    src={products.image}
                    alt="Product"
                    className="lg:w-11/12 w-full h-full rounded-xl object-cover object-top"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-800">
                      {products.title}
                    </h2>
                  </div>
                </div>
                <hr className="my-8" />
                <div className="flex flex-wrap gap-4 items-start">
                  <div>
                    <p className="text-gray-800 text-3xl font-bold">
                      ${products.price}
                    </p>
                  </div>
                </div>
                <hr className="my-8" />
                <hr className="my-8" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Description
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <p>{products.description}</p>
                  </div>
                </div>
                <hr className="my-8" />
                <div className="flex flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Quantity 
                  </h3>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border rounded-md p-2"
                  />
                  <CustomButton
                    btnText={"Add to cart"}
                    onClick={() => handleAddToCart(products, quantity)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
