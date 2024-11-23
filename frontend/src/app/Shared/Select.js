import React from "react";

const Select = ({
  className = "",
  sizeClass = "h-11",
  children,
  ...args
}) => {
  return (
    <select
      className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-2xl border border-neutral-300 bg-white text-neutral-900 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:ring-blue-500 dark:focus:ring-opacity-25`}
      {...args}
    >
      {children}
    </select>
  );
};

export default Select;
