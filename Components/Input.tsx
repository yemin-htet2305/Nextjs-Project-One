import React from "react";
function Input({
  placeholder,
  label,
}: {
  placeholder?: string;
  label?: string;
}) {
  return (
    <>
      {label && <label className="block text-white">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 rounded-md bg-primary text-white w-full mt-2"
      />
    </>
  );
}
export default Input;
