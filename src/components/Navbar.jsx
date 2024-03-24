import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    console.log("clik");
    logout();
    navigate(`/`);
  };

  const handleClick = () => {
    
    setIsOpen(true);
  };

  const handleCartClick = () => {
    if (user) {
      // If user is logged in, navigate to the cart page
      navigate(`/mycart`);
    } else {
      // If user is not logged in, show toast message
      toast.error("Please login to access your cart",{
        position: "bottom-center"
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <header className="shadow-md py-4 px-4 sm:px-10 bg-orange-300 font-[sans-serif] min-h-[70px]">
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          <Link
            to={"/"}
            className="text-white font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
          >
            Welcome {user ? "User" : "Guest"}
          </Link>
          <div className="flex lg:order-1 max-sm:ml-auto gap-4">
            {user ? (
              <Link to={"/mycart"} className="relative p-3">
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {totalItems}
                </div>
              </Link>
            ) : (
              <Link onClick={handleCartClick} className="relative p-3">
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  0
                </div>
              </Link>
            )}
            {/* <Link to={"/mycart"} className="relative p-3">
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {totalItems}
              </div>
            </Link> */}
            {user ? (
              <CustomButton
                btnText={"LogOut"}
                type={"button"}
                onClick={handleLogout}
              />
            ) : (
              <Link to={"/login"}>
                <CustomButton btnText={"Login"} />
              </Link>
            )}
            <button
              
              onClick={handleClick}
              className="lg:hidden ml-7"
            >
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <ul
            id="collapseMenu"
            className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
          >
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to={"/"}
                className="lg:hover:text-primary text-white block font-semibold text-[15px]"
              >
                Product
              </Link>
            </li>
            {/* <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link to={"/addproducts"}
                className="lg:hover:text-primary text-white block font-semibold text-[15px]"
              >
                Form Product
              </Link>
            </li> */}
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to={"/mycart"}
                className="lg:hover:text-primary text-white block font-semibold text-[15px]"
              >
                My Cart
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                to={"/myorder"}
                className="lg:hover:text-primary text-white block font-semibold text-[15px]"
              >
                Order
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
