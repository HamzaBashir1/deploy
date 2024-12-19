"use client";

import { avatarColors } from "./contants";
import React, { useContext, useEffect } from "react";
import avatar1 from "../../../public/avatars/Image-1.png";
import Image from "next/image";
import useFetchData from "../hooks/useFetchData";
import { FormContext } from "../FormContext";

const Avatar = ({
  containerClassName = "ring-1 ring-white",
  sizeClass = "h-6 w-6 text-sm",
  id,
  radius = "rounded-full",
  imgUrl = avatar1,
  userName,
  hasChecked,
  hasCheckedClass = "w-4 h-4 -top-0.5 -right-0.5",
}) => {
  const { updatedate } = useContext(FormContext);

  // Fetch user data
  const { data: userData, loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/hosts/${id}`
  );

  // Function to format date to "Month Year"
  function formatToMonthYear(datas) {
    try {
      // Ensure the input is parsed correctly into a Date object
      const date = new Date(datas);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date provided:", datas);
        return "Invalid Date";
      }

      // Format the date to "Month Year"
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  }

  // Compute formatted date when userData changes
  useEffect(() => {
    if (userData?.createdAt) {
      const formattedDate = formatToMonthYear(userData.createdAt);
      console.log("Formatted Date:", formattedDate); // For debugging
      updatedate(formattedDate); // Update the context with the formatted date
    }
  }, [userData?.createdAt, updatedate]);

  const url = userData?.photo || "";
  const name = userName || "John Doe";

  // Function to set background color based on the user's name
  const _setBgColor = (name) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <Image
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      )}
      {!url && <span className="wil-avatar__name">{name[0]}</span>}

      {hasChecked && (
        <span
          className={` bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  ${hasCheckedClass}`}
        >
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  );
};

export default Avatar;
