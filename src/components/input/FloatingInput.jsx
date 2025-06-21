// src/components/FloatingInput.jsx
import React from 'react';

export default function FloatingInput({ id, name, label, type = 'text', value, onChange, ...rest }) {
  return (
    <div className="relative my-4 max-w-md">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-transparent text-base outline-none focus:ring-2 focus:ring-green-500 transition"
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute left-4 bg-white px-1 transform transition-all
          top-[-0.6rem] text-sm
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
          peer-focus:-top-2 peer-focus:text-green-600"
      >
        {label}
      </label>
    </div>
  );
}
