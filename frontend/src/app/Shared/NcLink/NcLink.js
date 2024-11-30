import Link from "next/link";
import React from "react";

const NcLink = ({
  className = "font-medium",
  colorClass = "text-primary-6000 hover:text-primary-800",
  children,
  ...args
}) => {
  return (
    <Link
      className={`nc-NcLink ${colorClass} ${className}`}
      data-nc-id="NcLink"
      {...args}
    >
      {children}
    </Link>
  );
};

export default NcLink;
