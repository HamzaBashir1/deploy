import React from "react";

import logoImg from "../../../../public/putko.png";
import logoLightImg from "../../../../public/P.png";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg.js";
import Link from "next/link";

const Logo = ({ img = logoImg, imgLight = logoLightImg, className = "w-24" }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-600 focus:outline-none focus:ring-0 ${className}`}
    >
      <LogoSvgLight />
      <LogoSvg />

      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {/* {img ? (
        <img
          className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )} */}
    </Link>
  );
};

export default Logo;
