import React from "react";
import Link from "next/link"; // Corrected from 'to' to 'href' for Next.js Link
import NcImage from "../../Shared/NcImage/NcImage";

const CardCategory1 = ({
  className = "",
  size = "normal",
  taxonomy,
}) => {
  // Destructure properties with fallback values
  const { count = 0, name, href = "/", thumbnail = "" } = taxonomy || {};

  return (
    <Link
      href={href} 
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      {/* Render image with fallback in case thumbnail is missing */}
      {thumbnail && (
        <NcImage
          containerClassName={`flex-shrink-0 ${size === "large" ? "w-20 h-20" : "w-12 h-12"} rounded-lg mr-4 overflow-hidden`}
          src={thumbnail}
          alt={`${name} thumbnail`}  // Added alt text for accessibility
        />
      )}
      <div>
        <h2
          className={`${size === "large" ? "text-lg" : "text-base"} nc-card-title text-neutral-900 font-semibold`}
        >
          {name}
        </h2>
        <span
          className={`${size === "large" ? "text-sm" : "text-xs"} block mt-[2px] text-neutral-500`}
        >
          {count} Articles
        </span>
      </div>
    </Link>
  );
};

export default CardCategory1;
