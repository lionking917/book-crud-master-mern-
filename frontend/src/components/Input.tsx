import React from "react";
import { InputProps } from "../types";

function Input({htmlFor, label, name, value, onChange, type, error}: InputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-base font-medium leading-5 text-gray-700">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`border outline-none px-4 py-1 focus:ring-2 ring-blue-600 transition-all duration-200 ${error ? 'border-red-400 ring-transparent' : ''}`}
      />
      <small className="text-red-400">{error}</small>
    </div>
  );
}

export default Input;
