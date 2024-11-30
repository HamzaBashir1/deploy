"use client"
import Glide from "@glidejs/glide";
import React, { useEffect } from "react";
import Heading from "../HowItWork/Heading";
// import useNcId from "../../hooks/useNcId";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    clientAddress: "Malaysia",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    clientAddress: "London",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
  {
    id: 3,
    clientName: "Berta Emili",
    clientAddress: "Tokyo",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
];

const SectionClientSay = ({ className = "", uniqueClassName = "" }) => {
  const UNIQUE_CLASS = `SectionClientSay_glide_${uniqueClassName}` ;

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      setTimeout(() => {
        new Glide(`.${UNIQUE_CLASS}`, {
            type: "carousel",
          perView: 1,
        }).mount();
      }, 10);
    }
  }, []);

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <img className="absolute top-9 -left-20" src="/clientSay1.png" alt="" />
        <img
          className="absolute bottom-[100px] right-full mr-40"
          src="/clientSay2.png"
          alt=""
        />
        <img
          className="absolute top-full left-[140px]"
          src="/clientSay3.png"
          alt=""
        />
        <img
          className="absolute -bottom-10 right-[140px]"
          src="/clientSay4.png"
          alt=""
        />
        <img
          className="absolute left-full ml-32 bottom-[80px]"
          src="/clientSay5.png"
          alt=""
        />
        <img className="absolute -right-10 top-10 " src="/clientSay6.png" alt="" />
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading desc="Let's see what people think of Chisfis" isCenter>
        Good news from far away
      </Heading>
      <div className="relative max-w-2xl mx-auto md:mb-16">
        {renderBg()}
        <img className="mx-auto" src="/clientSayMain.png" alt="" />
        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
          <img
            className="absolute -mr-16 opacity-50 md:opacity-100 lg:mr-3 right-full top-1"
            src="/quotation.png"
            alt=""
          />
          <img
            className="absolute -ml-16 opacity-50 md:opacity-100 lg:ml-3 left-full top-1"
            src="/quotation2.png"
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col items-center text-center glide__slide"
                >
                  <span className="block text-2xl">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <div className="flex items-center mt-6 mb-16 space-x-2 text-lg text-neutral-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{item.clientAddress}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex items-center justify-center mt-16 glide__bullets"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="w-2 h-2 mx-1 rounded-full glide__bullet bg-neutral-300 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
