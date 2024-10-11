import Image from 'next/image';
import React from 'react';
import BanskáŠtiavnica from '../../../../public/BanskáŠtiavnica.jpg';
import LowTatras from '../../../../public/LowTatras.png';
import TatranskáLomnica from '../../../../public/TatranskáLomnica.jpg';
import StarýSmokovec from '../../../../public/StarýSmokovec.JPG';
import ŠtrbskéPleso from '../../../../public/ŠtrbskéPleso.jpg';
import LiptovskýMikuláš from '../../../../public/LiptovskýMikuláš.jpg'
import Terchová from '../../../../public/Terchová.jpg'
import Bojnice from '../../../../public/Bojnice.jpg'
import BanskáBystrica from '../../../../public/BanskáBystrica.jpg'
import Košice from '../../../../public/Košice.jpg'
import Bratislava from '../../../../public/Bratislava.jpg'
import Pieniny from '../../../../public/Pieniny.png'
import Link from 'next/link';
 
const locations = [
  { name: 'Banská Štiavnica', image: BanskáŠtiavnica, count: 551 },
  { name: 'High Tatras', image: LowTatras, count: 420 },
  { name: 'Tatranská Lomnica', image: TatranskáLomnica, count: 320 },
  { name: 'Starý Smokovec', image: StarýSmokovec, count: 215 },
  { name: 'Štrbské Pleso', image: ŠtrbskéPleso, count: 180 },
  { name: 'Donovaly', image: Pieniny, count: 180 },
  { name: 'Liptovský Mikuláš', image: LiptovskýMikuláš, count: 180 },
  { name: 'Terchová', image: Terchová, count: 180 },
  { name: 'Bojnice', image: Bojnice, count: 180 },
  { name: 'Banská Bystrica', image: BanskáBystrica, count: 180 },
  { name: 'Košice', image: Košice, count: 180 },
  { name: 'Bratislava', image: Bratislava, count: 180 },
];

const CitiesTown = () => {
  return (
    <div className='p-4 md:p-6 lg:p-8 mx-4 md:mx-6 lg:mx-8'>
      {/* Grid for all items */}
      <Link href="/List-Page">

      <div className='hidden lg:grid lg:grid-cols-4 gap-6'>
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
  );
}

export default CitiesTown;