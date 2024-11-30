"use client";

import React from "react";
import Button from "./Button";

const ButtonSecondary = ({ className = "", ...args }) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
