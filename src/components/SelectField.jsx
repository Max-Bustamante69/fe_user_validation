import React from "react";

const SelectField = ({ label, options, value, ...props }) => {
  return (
    <div className="flex flex-col  w-full space-y-1">
      <label className="font-semibold text-primary ">{label}</label>
      <select
        value={value}
        className="w-full font-semibold appearance-none p-2 mt-1 border border-gray-300 rounded-md bg-white text-secondary-text  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 disabled:text-neutral-600 disabled:cursor-not-allowed disabled:bg-gray-100"
        {...props}
      >
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
