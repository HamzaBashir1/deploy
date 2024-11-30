import React from "react";
import VectorImg from "../../../public/VectorHIW.svg";
import Heading from "./HowItWork/Heading";
import NcImage from "./NcImage/NcImage";

const DEMO_DATA = [
  {
    id: 1,
    img: "/HIW2.png",
    title: "Book & relax",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 2,
    img: "/HIW2.png",
    title: "Smart checklist",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 3,
    img: "/HIW3.png",
    title: "Save more",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
];

const SectionHowItWork = ({ className = "", data = DEMO_DATA }) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter desc="Keep calm & travel on">
        How it work
      </Heading>
      <div className="mt-20 relative grid md:grid-cols-3 gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-10"
          src="/VectorHIW.svg"
          alt=""
        />
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            {item.imgDark ? (
              <>
                <NcImage
                  containerClassName="block mb-8 max-w-[200px] mx-auto"
                  src={item.img}
                />
                <NcImage
                  containerClassName="hidden mb-8 max-w-[200px] mx-auto"
                  src={item.imgDark}
                />
              </>
            ) : (
              <NcImage
                containerClassName="mb-8 max-w-[200px] mx-auto"
                src={item.img}
              />
            )}
            <div className="text-center mt-auto">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className="block mt-5 text-neutral-500">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
