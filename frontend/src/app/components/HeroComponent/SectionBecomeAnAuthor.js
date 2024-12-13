"use client"
import React from "react";
import NcImage from "../../Shared/NcImage/NcImage";
import rightImgDemo from "../../../../public/BecomeAnAuthorImg.png";
import ButtonPrimary from "../../Shared/Button/ButtonPrimary";
import Logo from "../../Shared/Logo/Logo";
import Link from "next/link";

const SectionBecomeAnAuthor = ({ className = "", rightImg = rightImgDemo }) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-20" />
        <h2 className="mt-6 text-3xl font-semibold sm:text-4xl sm:mt-11">
          Why did you choose us?
        </h2>
        <span className="block mt-6 text-neutral-500">
          Accompanying us, you have a trip full of experiences. With Chisfis,
          booking accommodation, resort villas, hotels, private houses,
          apartments... becomes fast, convenient and easy.
        </span>
        <Link href="/Signup">
        <ButtonPrimary className="mt-6 bg-[#357965] sm:mt-11">
          Become an author
        </ButtonPrimary>
        </Link>
      </div>
      <div className="flex-grow">
        <NcImage src="\BecomeAnAuthorImg.png" />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
