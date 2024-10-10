"use client";
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import putko from '../../../../public/putko.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram, AiFillFacebook } from 'react-icons/ai';

const socialLinks = [
  {
    path: "https://www.youtube.com/channel/UC-U0einusd8kyhjC2HBexUg",
    icon: <AiFillYoutube className='group-hover:text-white w-5 h-5' />,
  },
  {
    path: "https://www.facebook.com/profile.php?id=61563346348433",
    icon: <AiFillFacebook className='group-hover:text-white w-5 h-5' />,
  },
  {
    path: "https://www.instagram.com/",
    icon: <AiOutlineInstagram className='group-hover:text-white w-5 h-5' />,
  },
  {
    path: "https://www.linkedin.com/",
    icon: <RiLinkedinFill className='group-hover:text-white w-5 h-5' />,
  },
];

const quickLink01 = [
  {
    path: "/Blog",
    display: "Blog for customers",
  },
  {
    path: "/Booking",
    display: "How selection and booking works",
  },
  {
    path: "/FAQ",
    display: "Frequently asked question",
  },
  {
    path: "/General-business-conditions",
    display: "General business conditions",
  },
];

const quickLink02 = [
  {
    path: "/Blog",
    display: "Blog for accommodation providers",
  },
  {
    path: "/BUY",
    display: "Rent accommodation with putko",
  },
  {
    path: "/FAQ",
    display: "Frequently asked question",
  },
  {
    path: "/Accommodation-general-business-condition",
    display: "General business conditions",
  },
];

const quickLink03 = [
  {
    path: "#",
    display: "Mon - Fri from 9:00 - 17:00",
  },
  {
    path: "tel:+4212122200212",
    display: "+421 21222 002 12",
  },
  {
    path: "mailto:info@putko.com",
    display: "info@putko.com",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='pb-10 pt-12 bg-[#F6FEF9]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:justify-between gap-8'>
          <div className='flex flex-col md:items-start'>
            <Image src={putko} alt='Putko Logo' width={100} height={100} />
            <p className='text-base leading-7 font-normal text-textColor mt-4 text-left md:text-left'>
              Design amazing digital experiences that <br /> create more happy in the world.
            </p>

          </div>
          <div className='flex flex-col'>
            <h2 className='text-xs leading-6 font-bold mb-4 text-gray-600'>
              For Customers
            </h2>

            <ul className='space-y-2'>
              {quickLink01.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className='text-base leading-7 font-normal text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-xs leading-6 font-bold mb-4 text-gray-600'>
              For Accommodation Providers
            </h2>

            <ul className='space-y-2'>
              {quickLink02.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className='text-base leading-7 font-normal text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-xs leading-6 font-bold mb-4 text-gray-600'>
              Support and Contact
            </h2>

            <ul className='space-y-2'>
              {quickLink03.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className='text-base leading-7 font-normal text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-6 border-t border-[#EAECF0] bg-[#EAECF0]" />

        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <p className='text-base leading-7 font-normal '>
              © {year} Putko all rights reserved.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            {socialLinks.map((link, index) => (
              <a
                href={link.path}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className='w-8 h-8 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-[#4FBE9F] hover:border-none'
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
