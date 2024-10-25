"use client";
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const TestimonialCard = ({ image, title, location, description, name, role }) => (
    <div className="flex-shrink-0 w-full text-white bg-gray-900 rounded-lg shadow-lg p-6 sm:w-80">
      <img src={image} alt={title} className="object-cover w-full h-48 rounded-t-lg" />
      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-400">{location}</p>
        <p className="mb-6 text-sm">{description}</p>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
            {/* Placeholder for user avatar */}
          </div>
          <div className="ml-3">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlidesToShow = () => {
      setSlidesToShow(window.innerWidth >= 768 ? 4 : 1);
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const handlePrevious = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,  // Hide arrows within the slider itself
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="px-6 py-12 bg-gray-900">
      <h2 className="mb-8 text-3xl font-bold text-center text-white">They said about us</h2>
      <div className="relative">
        {/* Left Arrow */}
        <button onClick={handlePrevious} className="absolute left-0 z-10 items-center justify-center w-10 h-10 -ml-5 text-white bg-gray-700 rounded-full top-1/2 transform -translate-y-1/2">
          &#8592;
        </button>

        <Slider {...settings} ref={sliderRef}>
          <TestimonialCard
            image="/Pieniny.png"
            title="Bungalow in the heart of Liptov"
            location="Bungalow, Liptovská Mara, Slovakia"
            description="Despite the fact that Fiemso is a new accommodation portal, compared to competing websites on our market, it is far ahead of them."
            name="Gorazd"
            role="Owner"
          />
          <TestimonialCard
            image="/Pieniny.png"
            title="Charming Cottage"
            location="Cottage, High Tatras, Slovakia"
            description="The interface is user-friendly and makes managing bookings effortless."
            name="Anna"
            role="Manager"
          />
          <TestimonialCard
            image="/Pieniny.png"
            title="Bungalow in the heart of Liptov"
            location="Bungalow, Liptovská Mara, Slovakia"
            description="Despite the fact that Fiemso is a new accommodation portal, compared to competing websites on our market, it is far ahead of them."
            name="Gorazd"
            role="Owner"
          />
          <TestimonialCard
            image="/Pieniny.png"
            title="Charming Cottage"
            location="Cottage, High Tatras, Slovakia"
            description="The interface is user-friendly and makes managing bookings effortless."
            name="Anna"
            role="Manager"
          />
          <TestimonialCard
            image="/Pieniny.png"
            title="Charming Cottage"
            location="Cottage, High Tatras, Slovakia"
            description="The interface is user-friendly and makes managing bookings effortless."
            name="Anna"
            role="Manager"
          />
          {/* Additional TestimonialCards */}
        </Slider>

        {/* Right Arrow */}
        <button onClick={handleNext} className="absolute right-0 z-10 items-center justify-center w-10 h-10 -mr-5 text-white bg-gray-700 rounded-full top-1/2 transform -translate-y-1/2">
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;