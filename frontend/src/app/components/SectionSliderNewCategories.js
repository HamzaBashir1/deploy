"use client"
import React, { useEffect, useMemo, useRef } from 'react';
import Heading from './HowItWork/Heading';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import NextPrev from './HowItWork/NextPrev';

const SectionCard = ({ image, title, description }) => (
  <li className="glide__slide">
    <img 
      src={image} 
      className='md:w-[250px] md:h-[350px] w-[300px] h-[250px] rounded-2xl'
      alt={title}
    />
    <h1 className='mt-4 text-base sm:text-lg text-neutral-900 font-medium truncate'>
      {title}
    </h1>
    <p className='block mt-2 text-sm text-neutral-600'>
      {description}
    </p>
  </li>
);

const SectionSliderNewCategories = ({
  itemPerRow = 5,
  sliderStyle = "style1",
  uniqueClassName = "",
}) => {
  const glideRef = useRef(null);
  const UNIQUE_CLASS = "SectionSliderNewCategories__" + uniqueClassName;

  const categories = [
    {
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      title: 'New York',
      description: '188,288 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Los Angeles',
      description: '145,920 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      title: 'Miami',
      description: '120,500 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      title: 'San Francisco',
      description: '98,100 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Chicago',
      description: '77,200 properties'
    }
  ];

  const MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      type: 'carousel',
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          perView: itemPerRow - 1,
        },
        768: {
          perView: itemPerRow - 2,
        },
        640: {
          perView: itemPerRow - 3,
        },
        500: {
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  return (
    <div>
      <Heading
        desc="Descriptions for sections"
      >
        Heading of sections
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
              />
            ))}
          </ul>
        </div>
        {sliderStyle === "style1" && (
          <NextPrev className="justify-end -top-[70px] mt-8" />
        )}
      </div>
        
    </div>
  );
};

export default SectionSliderNewCategories;
