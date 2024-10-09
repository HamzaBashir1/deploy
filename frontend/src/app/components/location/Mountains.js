import Image from 'next/image';
import React, { useContext } from 'react';
import HighTatras from '../../../../public/HighTatras.png';
import LowTatras from '../../../../public/LowTatras.png';
import LittleFatra from '../../../../public/LittleFatra.png';
import OravaZápadnéTatry from '../../../../public/OravaZápadnéTatry.jpg';
import VelkaFatra from '../../../../public/VelkaFatra.png';
import BelianskeTatra from '../../../../public/BelianskeTatra.jpg';
import Mapletrees from '../../../../public/Mapletrees.jpg';
import Herohronie from '../../../../public/Herohronie.png';
import Malekarpaty from '../../../../public/Malekarpaty.png';
import Bielekarpaty from '../../../../public/Bielekarpaty.jpg';
import { FormContext } from '@/app/FormContext';
import Link from 'next/link';

const locations = [
  { name: 'High Tatras', image: HighTatras, count: 551 },
  { name: 'Low Tatras', image: LowTatras, count: 420 },
  { name: 'Little Fatra', image: LittleFatra, count: 320 },
  { name: 'OravaZápadné Tatry', image: OravaZápadnéTatry, count: 215 },
  { name: 'Velka Fatra', image: VelkaFatra, count: 180 },
  { name: 'Belianske Tatra', image: BelianskeTatra, count: 180 },
  { name: 'Štiavnické hills', image: Herohronie, count: 180 },
  { name: 'Maple trees', image: Mapletrees, count: 180 },
  { name: 'Male karpaty', image: Malekarpaty, count: 180 },
  { name: 'Biele karpaty', image: Bielekarpaty, count: 180 },
];

const Mountains = () => {
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

export default Mountains;
