import React from "react";
import twFocusClass from "./TwFocusClass";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const NextPrev = ({
  className = "",
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = "w-10 h-10",
  onlyNext = false,
  onlyPrev = false,
}) => {
  return (
    <div
      className={` flex items-center justify-between absolute top-0 right-0 text-black  ${className}`}
      data-nc-id="NextPrev"
      data-glide-el="controls"
    >
      {!onlyNext && (
        <button
          className={`${btnClassName} ${
            !onlyPrev ? "mr-[6px]" : ""
          } border rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickPrev}
          title="Prev"
          data-glide-dir="<"
        >
          <MdOutlineKeyboardArrowLeft className="" />
        </button>
      )}
      {!onlyPrev && (
        <button
          className={`${btnClassName}  rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickNext}
          title="Next"
          data-glide-dir=">"
        >
            <MdOutlineKeyboardArrowRight className="" />
        </button>
      )}
    </div>
  );
};

export default NextPrev;
