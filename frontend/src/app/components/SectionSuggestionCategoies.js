"use client"
import React, { useEffect, useMemo, useRef } from 'react';
import Heading from './HowItWork/Heading';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const SectionCard = ({ image, title, description }) => (
  <li className="glide__slide">
    <img 
      src={image} 
      className='md:w-[400px] md:h-[350px] w-[300px] h-[250px] rounded-2xl'
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

const SectionSuggestionCategories = ({
  itemPerRow = 5,
  sliderStyle = "style1",
  uniqueClassName = "",
}) => {
  const glideRef = useRef(null);
  const UNIQUE_CLASS = "SectionSliderNewCategories__" + uniqueClassName;

  const categories = [
    {
      image: 'https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      title: 'Enjoy the great cold',
      description: '188,288 properties'
    },
    {
      image: 'https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Sleep in a floating way',
      description: '145,920 properties'
    },
    {
      image: 'https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: "In the billionaire's house",
      description: '120,500 properties'
    },
    {
      image: 'https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Cool in the deep forest',
      description: '98,100 properties'
    },
    {
      image: 'https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: "In the billionaire's house",
      description: '77,200 properties'
    },
    {
      image: 'https://images.pexels.com/photos/9828170/pexels-photo-9828170.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
      title: "In the billionaire's house",
      description: '77,200 properties'
    },
    {
      image: 'https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Cool in the deep forest',
      description: '77,200 properties'
    },
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
              />
            ))}
          </ul>
        </div>
        {sliderStyle === "style1"  }
      </div>
        
    </div>
  );
};

export default SectionSuggestionCategories;
