"use client";

import Button from "./Button";
import React from "react";

const ButtonPrimary = ({ className = "", ...args }) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-blue-950 hover:bg-blue-950 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
