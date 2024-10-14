"use client";
import React, { useState } from 'react';
import SubscriptionPriceList from './component/SubscriptionPriceList';
import RentOptions from './component/RentOptions';
import Navbar from './component/Navbar';
import FormControl from './component/FormControl';
import Footer from "../components/Footer/Footer";

const Page = () => {
  const [currentTab, setCurrentTab] = useState(0); 
  const setTab = (newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <div className='max-w-[1920px] mx-auto'>
      <Navbar />
      <FormControl />
      <Footer />
    </div>
  );
}

export default Page;
