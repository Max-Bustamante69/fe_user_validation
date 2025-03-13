import React from "react";

const InputField = ({ label, type, placeholder, value ,...props}) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      <label className=" font-semibold text-primary ">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full font-semibold  p-2 mt-1 border border-gray-300 rounded-md "
        {...props}
      />
    </div>
  );
};

export default InputField;