import React from "react";

const Label = ({ className = "", children }) => {
  return (
    <label
      className={`nc-Label text-sm font-medium text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
