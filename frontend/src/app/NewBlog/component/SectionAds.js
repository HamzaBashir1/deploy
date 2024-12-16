import React from "react";
import NcImage from "../../Shared/NcImage/NcImage";

const SectionAds = ({ className = "" }) => {
  return (
    <a href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <NcImage className="w-full" src="/ads.png" />
    </a>
  );
};

export default SectionAds;
