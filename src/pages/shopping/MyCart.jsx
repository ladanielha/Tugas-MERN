import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../../components/CustomButton";
import { useParams, useNavigate } from "react-router-dom";


const MyCart = () => {
  const {
    cart,
    totalPrice,
    addToCart,
    decreaseFromCart,
    removeItemsFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();


  const incrementQuantity = (productId) => {
    addToCart(cart.find((item) => item.id === productId));
  };

  const decrementQuantity = (productId) => {
    decreaseFromCart(productId);
  };

  const removeItemsCart = (productId) => {
    removeItemsFromCart(productId);
    toast.success("Remove Success", {
      position: "bottom-center",
    });
  };

  const handleOrder = async () => {
    try {
      if (cart.length == 0) {
        toast.error("Your cart is empty. Please add items to order.");
        return;
      }
      navigate("/myorder")
      toast.success("Order success", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout. Please try again later.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="font-[sans-serif] bg-white py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#333]">Shopping Cart</h2>
          <div className="overflow-x-auto">
            <table className="mt-12 w-full border-collapse divide-y bg">
              <thead className="whitespace-nowrap text-left bg-orange-300">
                <tr>
                  <th className="text-base text-white p-4">Description</th>
                  <th className="text-base text-white p-4">Quantity</th>
                  <th className="text-base text-white p-4">Remove</th>
                  <th className="text-base text-white p-4">Price</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y">
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-6 w-max">
                        <div className="h-36 shrink-0">
                          <img
                            src={product.image}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[#333]">
                            {product.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex divide-x border w-max">
                        <CustomButton
                          onClick={() => decrementQuantity(product.id)}
                          btnText={"-"}
                        >
                          {" "}
                        </CustomButton>
                        <div className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md">
                          {product.quantity}
                        </div>
                        <CustomButton
                          onClick={() => incrementQuantity(product.id)}
                          btnText={"+"}
                        >
                          {" "}
                        </CustomButton>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <CustomButton
                        type={"button"}
                        btnText={"Remove"}
                        onClick={() => removeItemsCart(product.id)}
                      ></CustomButton>
                    </td>
                    <td className="py-6 px-4">
                      <h4 className="text-lg font-bold text-[#333]">
                        ${(product.price * product.quantity).toFixed(2)}
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" max-w-xl ml-auto mt-6">
            <ul className="text-[#333] divide-y">
              <li className="flex flex-wrap gap-4 text-md py-3 font-bold">
                Total <span className="ml-auto">$ {totalPrice.toFixed(2)}</span>
              </li>
            </ul>
            <CustomButton
              btnText={"Order Now"}
              type={"button"}
              onClick={handleOrder}
              class="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
