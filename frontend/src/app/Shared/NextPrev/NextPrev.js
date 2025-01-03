import React from "react";
import twFocusClass from "../../utlis/twFocusClass";

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
      className={`nc-NextPrev relative flex items-center text-neutral-900 ${className}`}
      data-nc-id="NextPrev"
      data-glide-el="controls"
    >
      {!onlyNext && (
        <button
          className={`${btnClassName} ${
            !onlyPrev ? "mr-[6px]" : ""
          } bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickPrev}
          title="Prev"
          data-glide-dir="<"
        >
          <i className="las la-angle-left"></i>
        </button>
      )}
      {!onlyPrev && (
        <button
          className={`${btnClassName} bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickNext}
          title="Next"
          data-glide-dir=">"
        >
          <i className="las la-angle-right"></i>
        </button>
      )}
    </div>
  );
};

export default NextPrev;
