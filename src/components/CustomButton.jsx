import React from "react";

const CustomButton = ({ btnText, type, onClick }) => {
  return (
    <button
      className={`bg-primary hover:bg-brandGreen text-white font-bold py-2 px-4 rounded-full w-full`}
      type={type}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default CustomButton;
