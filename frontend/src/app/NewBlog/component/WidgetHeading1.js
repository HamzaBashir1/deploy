import React from "react";
import Link from "next/link";

const WidgetHeading1 = ({
  className = "",
  title,
  viewAll,
}) => {
  return (
    <div
      className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 ${className}`}
      data-nc-id="WidgetHeading1"
    >
      <h2 className="text-lg text-neutral-900 font-semibold flex-grow">
        {title}
      </h2>
      {!!viewAll.href && (
        <a
          href={viewAll.href}
          passHref
          target={viewAll.targetBlank ? "_blank" : undefined}
          rel={viewAll.targetBlank ? "noopener noreferrer" : undefined}
          className="flex-shrink-0 block text-primary-700 font-semibold text-sm"
        >
          {viewAll.label}
        </a>
      )}
    </div>
  );
};

export default WidgetHeading1;
