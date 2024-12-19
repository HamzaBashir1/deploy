import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const StartRating = ({ className = "", point = 4.5, reviewCount = 112 }) => {
  const {updatehostcommentleght,
    updatehostoverallRating,
    hostoverallRating,
    hostcommentleght
} = useContext(FormContext);
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        <StarIcon className="w-[18px] h-[18px] text-orange-500" /> 
      </div>
      <span className="font-medium ">{ hostoverallRating }</span>
      <span className="text-neutral-500">
        ({ hostcommentleght})
      </span>
    </div>
  );
};

export default StartRating;
