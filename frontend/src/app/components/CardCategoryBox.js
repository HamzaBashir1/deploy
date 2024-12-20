import React from "react";
import Badge from "./Badge/Badge";
import NcImage from "./NcImage/NcImage";
import convertNumbThousand from "../utlis/convertNumThousand";

const CardCategoryBox1 = ({
  className = "",
  taxonomy,
  onClick, // Accept onClick as a prop
}) => {
  const { count, name, thumbnail } = taxonomy;

  return (
    <div
      onClick={onClick} // Attach the click handler
      className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 [ nc-box-has-hover ] cursor-pointer ${className}`}
      data-nc-id="CardCategoryBox1"
    >
      {/* Badge showing count */}
      <Badge
        className="absolute right-2 top-2"
        color="gray"
        name={convertNumbThousand(count)}
      />

      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-full">
        <NcImage src={thumbnail} containerClassName="absolute inset-0" />
      </div>

      {/* Card details */}
      <div className="flex-grow ml-4 overflow-hidden">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span className={`block mt-2 text-sm text-neutral-500`}>
          19 minutes drive
        </span>
      </div>
    </div>
  );
};

export default CardCategoryBox1;
