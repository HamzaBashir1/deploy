import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import BanskáŠtiavnica from '../../../../public/BanskáŠtiavnica.jpg';
import LowTatras from '../../../../public/LowTatras.png';
import TatranskáLomnica from '../../../../public/TatranskáLomnica.jpg';
import StarýSmokovec from '../../../../public/StarýSmokovec.JPG';
import ŠtrbskéPleso from '../../../../public/ŠtrbskéPleso.jpg';
import LiptovskýMikuláš from '../../../../public/LiptovskýMikuláš.jpg';
import Terchová from '../../../../public/Terchová.jpg';
import Bojnice from '../../../../public/Bojnice.jpg';
import BanskáBystrica from '../../../../public/BanskáBystrica.jpg';
import Košice from '../../../../public/Košice.jpg';
import Bratislava from '../../../../public/Bratislava.jpg';
import Pieniny from '../../../../public/Pieniny.png';
import Link from 'next/link';
import { FormContext } from '@/app/FormContext';

const Searching = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const { updateLocation} = useContext(FormContext);
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search in Slovakia..."
          className="w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredLocations.map((location, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Image
                src={location.image}
                alt={location.name}
                className="rounded-lg"
                width={100}
                height={75}
              />
              <div className="flex flex-col">
                <h1 className="text-[#292A34] text-lg font-semibold" onClick={() => updateLocation(location.name)}>
                  {location.name}
                </h1>
                <p className="text-[13px] text-[#888888]">
                  {location.count} objects
                </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Searching;
