import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../../components/CustomButton";

const MyCart = () => {
  const {
    cart,
    totalPrice,
    clearCart,
  } = useContext(CartContext);


  const handleCheckout = async () => {
    try {
      if (cart.length == 0) {
        toast.error("Your cart is empty. Please add items to complete.");
        return;
      }
      console.log(cart);
      localStorage.setItem("lastOrder", JSON.stringify(cart));
      const response = await axios.post("https://fakestoreapi.com/carts", cart);
      console.log(response);
      clearCart();
      toast.success("Order successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout. Please try again later.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="font-[sans-serif] bg-gray-50">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
          <div className="bg-orange-300 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                <h2 className="text-2xl font-bold text-white">
                  My Order Summary
                </h2>
                <div className="space-y-6 mt-10">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="grid sm:grid-cols-2 items-start gap-6"
                    >
                      <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
                        <img
                          src={product.image}
                          className="w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl text-white">{product.title}</h3>
                        <ul className="text-xl text-white space-y-3 mt-4">
                          <li className="flex flex-wrap gap-4">
                            Quantity :<span>{product.quantity}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price :{" "}
                            <span className="">
                              {(product.price * product.quantity).toFixed(2)}{" "}
                            </span>
                          </li>
                          <li></li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-black w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white">
                  Total{" "}
                  <span className="ml-auto">$ {totalPrice.toFixed(2)}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
            <h2 className="text-2xl font-bold text-[#333]">
              Complete your order
            </h2>
            <form className="mt-10">
              <div>
                <h3 className="text-lg font-bold text-[#333] mb-6">
                  Personal Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="User ID"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    />
                    <svg
                      fill="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                        ss
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[#333] mb-6">
                  
                </h3>
                <div className="flex gap-6 max-sm:flex-col mt-10">
                  <CustomButton
                    btnText={"Complete Order"}
                    type={"button"}
                    onClick={handleCheckout}
                    className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
                  ></CustomButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
