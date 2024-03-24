import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    toast.success("Logout Success", { position: "bottom-center" });
    navigate(`/`);
  };

  const handleCartClick = () => {
    if (user) {
      navigate(`/mycart`);
    } else {
      toast.error("Please login to access your cart", { position: "bottom-center" });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-300 py-4 px-4 sm:px-10 shadow-md">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div className="text-white font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
          Welcome {user ? "User" : "Guest"}
        </div>
        <div className="flex items-center">
          <Link to={"/mycart"} className="relative p-3" onClick={handleCartClick}>
            <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
              {totalItems}
            </div>
          </Link>
          {user ? (
            <CustomButton
              btnText={"Logout"}
              onClick={handleLogout}
            >
            </CustomButton>
          ) : (
            <Link to={"/login"}>
              <CustomButton btnText={"Login"}>
                
              </CustomButton>
            </Link>
          )}
          <button
            className="block lg:hidden focus:outline-none ml-4"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:justify-center lg:space-x-5 max-lg:space-y-2 max-lg:py-4`}
      >
        <Link
          to="/"
          className="block lg:hover:text-primary text-white font-semibold text-[15px]"
          onClick={toggleMenu}
        >
          Products
        </Link>
        <Link
          to="/mycart"
          className="block lg:hover:text-primary text-white font-semibold text-[15px]"
          onClick={toggleMenu}
        >
          Cart
        </Link>
        <Link
          to="/myorder"
          className="block lg:hover:text-primary text-white font-semibold text-[15px]"
          onClick={toggleMenu}
        >
          Order
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;