import React from "react";
import { CiStar } from "react-icons/ci";

const StartRating = ({
  className = "",
  point = 0,
  reviewCount = 0,
}) => {
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        <CiStar className="w-[18px] h-[18px] text-orange-500" />
      </div>
      <span className="font-medium ">{point || 0}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
        ({reviewCount || 0})
      </span>
    </div>
  );
};

export default StartRating;
