"use client";

import { FormContext } from "../../FormContext";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";

const FiveStartIconForRate = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  // Access `updateRatnig` from FormContext
  const { updateRating } = useContext(FormContext);

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  // Handle star click to update rating
  const handleStarClick = (item) => {
    setPoint(item);
    updateRating(item); // Call updateRatnig with the selected star value
  };

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <StarIcon
          key={item}
          className={`${
            point >= item || currentHover >= item ? "text-yellow-500" : ""
          } ${iconClass}`}
          onMouseEnter={() => setCurrentHover(item)}
          onMouseLeave={() => setCurrentHover(0)}
          onClick={() => handleStarClick(item)} // Call handleStarClick on click
        />
      ))}
    </div>
  );
};

export default FiveStartIconForRate;
