"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import Heading from './component/Heading';
import Location from './component/Location';
import Date from './component/Date';
import Photo from './component/Photo';
import Information from './component/Information'
import ReservationCard from './component/ReservationCard'
import Navbar from './component/Navbar';
import Ratings from './component/Ratings';
import Overlook from './component/Overlook';
import EMail from './component/EMail';
import Diet from './component/Diet';
import Persons from './component/Persons';
import CommonSection from '../List-Page/component/CommonSection';
import WeatherForecast from './component/WeatherForecast';
import Accommodation from './component/Accommodation';

const Page = () => {
  

  return (
    <div>
      <Navbar/>
    <div className='bg-[#f8f8f8]'>
      <Heading />
      <Photo />
      <ReservationCard/>
      <Date />
    <Information/>
    <Location/>
    <Persons/>
    <Accommodation/>
    <Diet/>
    <Overlook/>
    <Ratings/>
    <WeatherForecast/>
    <CommonSection/>
    <EMail/>
    </div>
    </div>
  );
}

export default Page;
