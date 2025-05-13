// src/components/Button.jsx
import React from "react";

const Button = ({ onClick, label, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 px-6 ${className} text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300`}
    >
      {label}
    </button>
  );
};

export default Button;
