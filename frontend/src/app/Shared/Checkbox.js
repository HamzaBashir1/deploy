"use client";

import React from "react";

const Checkbox = ({
  subLabel = "",
  label = "",
  name,
  checked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="focus:ring-[#357965] h-6 w-6 text-[#357965] border-primary rounded border-neutral-500 bg-white checked:bg-white dark:bg-neutral-700 dark:checked:bg-[#357965]"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-3.5 flex flex-col flex-1 justify-center"
        >
          <span className="text-neutral-900 dark:text-neutral-100">
            {label}
          </span>
          {subLabel && (
            <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;