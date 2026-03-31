import React from "react";
function Input({
  placeholder,
  label,
  text,
  ...props
}: {
  placeholder?: string;
  label?: string;
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      {label && <label className="block text-white font-bold text-xl">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 rounded-md bg-primary text-white w-full mt-2"
        {...props}
      />
      {text  && <p className="text-xs text-gray-400">{text}</p> }
    </>
  );
}
export default Input;
