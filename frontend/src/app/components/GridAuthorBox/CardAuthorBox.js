import React from "react";
import { CiStar } from "react-icons/ci";
import Badge from "../Badge/Badge";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

const CardAuthorBox = ({ className = "", index, author }) => {
  const { _id, name, location, photo, email, overallrating  } = author || {}; 

  return (
    <Link
      href={`/host-detail/${_id}`}// This makes it a clickable link
      className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 [ nc-box-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox"
    >
      {index && (
        <Badge
          className="absolute left-3 top-3"
          color={index === 1 ? "red" : index === 2 ? "blue" : "green"}
          name={`#${index}`}
        />
      )}
      <Avatar
        sizeClass="w-20 h-20 text-2xl"
        radius="rounded-full"
        imgUrl={photo} // Using the dynamic avatar prop
        userName={name} // Using the dynamic display name
      />
      <div className="mt-3">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{name}</span> {/* Display dynamic name */}
        </h2>
        <span className="block mt-1.5 text-sm text-neutral-500">
          {email} {/* Display dynamic email */}
        </span>
      </div>
      <div className="flex items-center justify-center px-5 py-2 mt-4 rounded-full bg-neutral-100">
      <span className="text-xs font-medium pt-[1px]">{overallrating || 0}</span> {/* Display dynamic rating */}
      {overallrating > 0 ? (
        <BsStarFill className="w-4 h-4 ml-2 text-amber-500" /> 
      ) : (
        <CiStar className="w-5 h-5 ml-2 text-amber-500" /> 
      )}
    </div>
    
    </Link>
  );
};

export default CardAuthorBox;
