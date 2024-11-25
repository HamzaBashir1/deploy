import Image from 'next/image';
import React, { useContext } from 'react';
import snow from '../../../../public/snow.jpg';
import parkSnowDonovaly from '../../../../public/park-Snow-Donovaly.jpg';
import SnowlandValčianskadolina from '../../../../public/SnowlandValčianskadolina.jpg';
import SalamandraResort from '../../../../public/SalamandraResort.jpg';
import SnowparadiseVeľkáRača from '../../../../public/SnowparadiseVeľkáRača.jpg';
import WinterparkMartinky from '../../../../public/WinterparkMartinky.jpg'
import RužomberokMalinôBrdo from '../../../../public/RužomberokMalinôBrdo.jpg'
import VrátnaMaláFatra from '../../../../public/VrátnaMaláFatra.jpg'
import JasenskáDolina from '../../../../public/JasenskáDolina.jpg'
import BachledkaSkiSun from '../../../../public/BachledkaSki&Sun.jpg'
import Skalkaarena from '../../../../public/Skalkaarena.jpg'
import Krahule from '../../../../public/Krahule.jpg'
import { FormContext } from '@/app/FormContext';
import Link from 'next/link';

const locations = [
  { name: 'Sure', image: snow, count: 222 },
  { name: 'park Snow Donovaly', image: parkSnowDonovaly, count: 52 },
  { name: 'Snowland Valčianska dolina', image: SnowlandValčianskadolina, count: 71 },
  { name: 'Salamandra Resort', image: SalamandraResort, count: 42 },
  { name: 'Snowparadise Veľká Rača', image: SnowparadiseVeľkáRača, count: 183 },
  { name: 'Winter park Martinky', image: WinterparkMartinky, count: 64 },
  { name: 'Ružomberok - Malinô Brdo', image: RužomberokMalinôBrdo, count: 193 },
  { name: 'Vrátna Malá Fatra', image: VrátnaMaláFatra, count: 106 },
  { name: 'Jasenská Dolina', image: JasenskáDolina, count: 73 },
  { name: 'Bachledka Ski & Sun', image: BachledkaSkiSun, count: 119 },
  { name: 'Skalka arena', image: Skalkaarena, count: 48 },
  { name: 'Krahule', image: Krahule, count: 25 },
];

const SkiResort = () => {
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

export default SkiResort;