import React from 'react';
import Image from 'next/image';
import { BiHeart } from 'react-icons/bi';
import { LuWaves } from "react-icons/lu";
import { MdLocalParking } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import putko from '../../../../public/bedroom.jpg';

const PropertyCard = () => {
  return (
    <div className='flex flex-col overflow-hidden border shadow-lg rounded-3xl w-80'>
        <div className='relative w-full h-48'>
            <Image src={putko} alt="Bedroom" layout='fill' objectFit='cover' className='rounded-t-lg' />
            <div className='absolute top-2 right-2 bg-[#00000059] rounded-full p-1'>
                <BiHeart className='text-xl text-[#4FBE9F]' />
            </div>
        </div>
        <div className='p-4'>
            <h1 className='font-bold text-lg text-[#1F2937]'>The Lounge & Bar</h1>
            <p className='text-sm text-[#666666]'>12 persons, 220 m², 4 bedrooms, 2 bathrooms</p>
            <div className='flex flex-wrap gap-2 mt-3'>
                <div className='border rounded-lg p-2 flex items-center border-[#292A34]'>
                    <LuWaves className='text-[#292A34]' />
                </div>
                <div className='border rounded-lg p-2 flex items-center border-[#292A34]'>
                    <MdLocalParking className='text-[#292A34]' />
                </div>
                <div className='border rounded-lg p-2 flex items-center border-[#292A34]'>
                    <IoWifi className='text-[#292A34]' />
                </div>
                <div className='border rounded-lg p-2 flex items-center border-[#292A34]'>
                    <MdOutlinePets className='text-[#292A34]' />
                </div>
            </div>
            <div className='flex items-center mt-3'>
                <CiLocationOn className='text-[#292A34]' />
                <p className='text-sm text-[#292A34] ml-2'>Cottage, Oščadnica, Slovakia</p>
            </div>
            <hr className="my-4 h-0.5 bg-neutral-100 dark:bg-white/10" />
            <div className='flex items-center justify-between'>
                <h1 className='text-base font-bold'>$311 <span className='text-sm font-normal'>/night</span></h1>
                <div className='flex items-center'>
                    <CiStar className='text-[#DC2626]' />
                    <h1 className='ml-1 text-sm font-bold'>4.9</h1>
                    <p className='ml-2 text-sm text-gray-600'>(122)</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PropertyCard;
