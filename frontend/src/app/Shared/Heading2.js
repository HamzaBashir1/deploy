import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const Heading2 = ({
  className = "",
  heading = "Stays in Slovakia",
  subHeading,
}) => {
  
  const {city, updateCity } = useContext(FormContext);
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{city}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block mt-3 text-neutral-500">
          
          <span className="mx-2">·</span>
          
          <span className="mx-2">·</span>
        </span>
      )}
    </div>
  );
};

export default Heading2;
