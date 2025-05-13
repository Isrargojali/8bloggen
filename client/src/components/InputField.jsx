// src/components/InputField.jsx
import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-lg text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
