import Image from 'next/image';
import React, { useContext } from 'react';
import Orava from '../../../../public/Orava.png';
import Slovenskýraj from '../../../../public/Slovenskýraj.jpg';
import kysuce from '../../../../public/kysuce.jpg';
import Turiec from '../../../../public/Turiec.jpg';
import VelkaFatra from '../../../../public/VelkaFatra.png';
import Orava1 from '../../../../public/Orava1.png'
import Pieniny from '../../../../public/Pieniny.png'
import Herohronie from '../../../../public/Herohronie.png'
import Sleep from '../../../../public/Sleep.png'
import { FormContext } from '@/app/FormContext';
import Link from 'next/link';

const locations = [
  { name: 'Orava', image: Orava, count: 215 },
  { name: 'Slovenský raj', image: Slovenskýraj, count: 551 },
  { name: 'kysuce', image: kysuce, count: 420 },
  { name: 'Turiec', image: Turiec, count: 320 },
  { name: 'Liptov', image: Orava1, count: 180 },
  { name: 'Pieniny', image: Pieniny, count: 180 },
  { name: 'Velka Fatra', image: VelkaFatra, count: 180 },
  { name: 'Orava', image: Orava1, count: 180 },
  { name: 'Sleep', image: Sleep, count: 180 },
  { name: 'Herohronie', image: Herohronie, count: 180 },
  { name: 'Donovaly', image: Pieniny, count: 180 },
  { name: 'Štiavnické hills', image: Herohronie, count: 180 },
];

const TouristArea = () => {
  const { location,updateLocation,updateCity,updateCountry} = useContext(FormContext);

  return (
    <div className='p-4 mx-4 md:p-6 lg:p-8 md:mx-6 lg:mx-8'>
      {/* Grid for all items */}
      <Link href="/List-Page">
      <div className='hidden gap-6 lg:grid lg:grid-cols-4'>
        {locations.map((location, index) => (
          <div
            key={index}
            className='flex items-center space-x-4'
            onClick={() => updateLocation(location.name)}
          >
            <Image
              src={location.image}
              alt={location.name}
              className='rounded-lg'
              width={100}
              height={75}
              // layout='intrinsic'
            />
            <div className='flex flex-col'>
              <h1 className='text-[#292A34] text-lg font-semibold'>{location.name}</h1>
              <p className='text-[13px] text-[#888888]'>{location.count} objects</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid for first four items on mobile */}
      <div className='lg:hidden'>
        <div className='grid grid-cols-1 gap-6'>
          {locations.slice(0, 4).map((location, index) => (
            <div
              key={index}
              className='flex items-center space-x-4'
            >
              <Image
                src={location.image}
                alt={location.name}
                className='rounded-lg'
                width={100}
                height={75}
                // layout='intrinsic'
              />
              <div className='flex flex-col'>
                <h1 className='text-[#292A34] text-lg font-semibold'>{location.name}</h1>
                <p className='text-[13px] text-[#888888]'>{location.count} objects</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Link>
    </div>
  );
}

export default TouristArea;