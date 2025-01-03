"use client";
import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormContext } from "../FormContext";
import Heading from "./HowItWork/Heading";
import NextPrev from "./HowItWork/NextPrev";

const SectionCard = ({ image, title, description, onClick }) => (
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
        className="md:w-[250px] md:h-[350px] w-[300px] h-[250px] rounded-2xl object-cover"
        alt={title}
      />
      <h1 className="mt-4 text-base font-medium truncate sm:text-lg text-neutral-900">
        {title}
      </h1>
      <p className="block mt-2 text-sm text-neutral-600">{description}</p>
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
      image: 'https://images.pexels.com/photos/2289920/pexels-photo-2289920.jpeg',
      title: 'Bratislava',
      description: '188,288 properties'
    },
    {
      image: 'https://files.slovakia.travel/_processed_/csm_shutterstock_1350387527_4c66e9b257.jpg',
      title: 'košice',
      description: '145,920 properties'
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Banska_Bystrica_SNP_Square.jpg',
      title: 'Banská Bystrica',
      description: '120,500 properties'
    },
    {
      image: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQdwmuhLNN7hH3zYSl34hmOSe81dPpkyLA0WgXnQ5wwjz9FT5s8qCG3hh7ny41EoePa',
      title: 'Trenčín',
      description: '98,100 properties'
    },
    {
      image: 'https://i.pinimg.com/736x/38/07/33/38073334e7c677fee9b12f16b5c30422.jpg',
      title: 'Trnava',
      description: '77,200 properties'
    },
    {
      image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQRrfQTWcGEuKoyoq_G4qUtptlu6SldLiOlr-8NwwMKUt7y_tvGJkrGkTvoTlpJ9r2A',
      title: 'Nitra',
      description: '77,200 properties'
    },
    {
      image: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQlhWGekoMAwbAVe-owh4ePwMDx-cR2xNtQSyn6CzpQbzZyn8zTJgPcgJ6KtEEIa3XS',
      title: 'Prešov',
      description: '77,200 properties'
    },
    {
      image: 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSZkj3AoAWEEJUZSeqz6VBuoRRhz_u9ZIoL2H58vORXJ6f2lotnIgj3fxFscujTUt08',
      title: 'Žilina',
      description: '77,200 properties'
    },
    {
      image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcQfCgj3vsq_oYO20KLd5g1ISYSJh698nLs3cDDSvacKi4dOiv00C48o0Mwa2MESl80i0GUk',
      title: 'Bardejov',
      description: '77,200 properties'
    }
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
    updateCity(title.toLowerCase());
    setIsLoading(false);
  };

  return (
    <div>
      <Heading desc="Descriptions for sections">Heading of sections</Heading>
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
