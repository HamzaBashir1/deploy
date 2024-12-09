"use client";
import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormContext } from "../FormContext";
import Heading from "./HowItWork/Heading";
import NextPrev from "./HowItWork/NextPrev";

const SectionCard = ({ image, title, description , onClick}) => (
  <li className="glide__slide" onClick={onClick}>
  <Link
  href={{
    pathname: "/listing-stay-map",
    query: { title: title },
  }}
  passHref
>  
  <img 
      src={image} 
      className='md:w-[400px] md:h-[350px] w-[300px] h-[250px] rounded-2xl'
      alt={title}
    />
    <h1 className='mt-4 text-base font-medium truncate sm:text-lg text-neutral-900'>
      {title}
    </h1>
    <p className='block mt-2 text-sm text-neutral-600'>
      {description}
    </p>
    </Link>
  </li>
);


const SectionSliderNewCategories = ({
  itemPerRow = 5,
  sliderStyle = "style1",
  uniqueClassName = "default",
}) => {
  const { updateCity } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const glideRef = useRef(null);
  const router = useRouter();

  const UNIQUE_CLASS = `SectionSliderNewCategories__${uniqueClassName}`;

  const categories = [
    {
      image: 'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      title: 'Bratislava',
      description: '188,288 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Devin Castle',
      description: '145,920 properties'
    },
    {
      image: 'https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: "Kosice",
      description: '120,500 properties'
    },
    {
      image: 'https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'High tatras',
      description: '98,100 properties'
    },
    {
      image: 'https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: "Poprad",
      description: '77,200 properties'
    },
    {
      image: 'https://images.pexels.com/photos/9828170/pexels-photo-9828170.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
      title: "Trnava",
      description: '77,200 properties'
    },
    {
      image: 'https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Levoca',
      description: '77,200 properties'
    },
  ];

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: itemPerRow,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: { perView: itemPerRow - 1 },
          1024: { perView: itemPerRow - 1 },
          768: { perView: itemPerRow - 2 },
          640: { perView: itemPerRow - 3 },
          500: { perView: 1.3 },
        },
      });

      glide.mount();

      return () => {
        glide.destroy();
      };
    }
  }, [itemPerRow]);

  const handleCardClick = async (title) => {
    if (isLoading) return;
    setIsLoading(true);
    updateCity(title);
    setIsLoading(false);
  };

  return (
    <div className=''>
    <Heading
      desc="Popular places to stay that Chisfis recommends for you"
    >
      Suggestion of Section
    </Heading>
    
    <div ref={glideRef} className={`glide nc-SectionSliderNewCategories ${UNIQUE_CLASS}`}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
        {categories.map((category, index) => (
          <SectionCard
            key={index}
            image={category.image}
            title={category.title}
            description={category.description}
            onClick={() => handleCardClick(category.title)}
          />
        ))}

        </ul>
      </div>
      {sliderStyle === "style1" && <NextPrev className="justify-end -mt-14" />}
    </div>
      
  </div>

  );
};

export default SectionSliderNewCategories;