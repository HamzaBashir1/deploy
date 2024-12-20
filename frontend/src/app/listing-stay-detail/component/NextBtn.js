import twFocusClass from "../../utlis/twFocusClass";
import React from "react";

const NextBtn = ({ className = "w-10 h-10 text-lg", ...args }) => {
  return (
    <button
      className={`NextBtn ${className} bg-white border border-neutral-200 rounded-full inline-flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
      {...args}
    >
      <i className="las la-angle-right"></i>
    </button>
  );
};

export default NextBtn;
