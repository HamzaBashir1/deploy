import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Filter = () => {
  // Array of items to be displayed
  const items = [
    'High Tatras',
    'Low Tatras',
    'Little Fatra',
    'Velka Fatra',
    'Orava',
    'Liptov',
    'Pieniny',
    'Donovaly',
    'Štiavnické Hills',
    'Horehronie',
  ];

  // Define responsive styles for the cards
  const cardStyle = 
    'flex items-center gap-3 rounded-lg bg-white py-4 px-6 sm:py-[20px] sm:px-10 w-full h-[60px]';

  return (
    <div className="bg-[#F3F4F6]">
      <div className="px-4 sm:px-10 md:px-16 lg:px-20 pt-10 sm:pt-20 pb-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={index} className={cardStyle}>
            <BsSearch />
            <h1 className="text-[15px] leading-5">{item}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
