import Image from 'next/image';
import React, { useContext } from 'react';
import LiptovskáMara from '../../../../public/LiptovskáMara.jpg';
import Oravskápriehrada from '../../../../public/Oravskápriehrada.jpg';
import VodnánádržSĺňava from '../../../../public/VodnánádržSĺňava.jpg';
import Orava from '../../../../public/Orava.png';
import VelkaFatra from '../../../../public/VelkaFatra.png';
import Orava1 from '../../../../public/Orava1.png'
import Pieniny from '../../../../public/Pieniny.png'
import Link from 'next/link';
import { FormContext } from '@/app/FormContext';

const locations = [
  { name: 'Liptovská Mara', image: LiptovskáMara, count: 551 },
  { name: 'Oravská priehrada', image: Oravskápriehrada, count: 420 },
  { name: 'Vodná nádrž Sĺňava', image: VodnánádržSĺňava, count: 320 },
  { name: 'Veľká Domaša', image: Orava, count: 215 },
  { name: 'Hodrušské jazero', image: VelkaFatra, count: 180 },
  { name: 'Klinger', image: Orava1, count: 180 },
  { name: 'Zemplínska Šírava', image: Orava1, count: 180 },
  { name: 'Počúvadlianske jazero', image: Pieniny, count: 180 },
];
 
const WaterBodies = () => {
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
      </Link>
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
    </div>
  )
}

export default WaterBodies
