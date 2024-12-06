"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Heading from "./HowItWork/Heading";
import CardCategoryBox1 from "./CardCategoryBox";
import { FormContext } from "../FormContext";


const DEMO_CATS = [
  {
    id: "1",
    
    name: "Bratislava",
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://images.pexels.com/photos/2289920/pexels-photo-2289920.jpeg",
  },
  {
    id: "2",
    
    name: "Košice",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://files.slovakia.travel/_processed_/csm_shutterstock_1350387527_4c66e9b257.jpg",
  },
  {
    id: "3",
    
    name: "Banská Bystrica",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Banska_Bystrica_SNP_Square.jpg",
  },
  {
    id: "4",
    
    name: "Trenčín",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://i.pinimg.com/736x/38/07/33/38073334e7c677fee9b12f16b5c30422.jpg",
  },
  {
    id: "5",
    
    name: "žilina",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSZkj3AoAWEEJUZSeqz6VBuoRRhz_u9ZIoL2H58vORXJ6f2lotnIgj3fxFscujTUt08",
  },
  {
    id: "6",
    
    name: "prešov",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQlhWGekoMAwbAVe-owh4ePwMDx-cR2xNtQSyn6CzpQbzZyn8zTJgPcgJ6KtEEIa3XS",
  },
  {
    id: "7",
    
    name: "trnava",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://i.pinimg.com/736x/38/07/33/38073334e7c677fee9b12f16b5c30422.jpg",
  },
  {
    id: "8",
    
    name: "Nitra",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQRrfQTWcGEuKoyoq_G4qUtptlu6SldLiOlr-8NwwMKUt7y_tvGJkrGkTvoTlpJ9r2A",
  },
];

const SectionGridCategoryBox = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const { updateCity,city } = useContext(FormContext); // Access the updateCity function from FormContext
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize the Next.js router

  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;
    default:
      CardComponentName = CardCategoryBox1;
  }

  const handleCardClick = async (cityName) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      updateCity(cityName);
      console.log("city",city) // Update the city title
      router.push(`/listing-stay-map`); // Redirect with city name as a query parameter
    } catch (error) {
      console.error("Error updating city or redirecting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places near where you live"
        isCenter={headingCenter}
      >
        Explore nearby
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <CardComponentName
            key={i}
            taxonomy={item}
            onClick={() => handleCardClick(item.name)} // Pass city name to the handler
          />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
