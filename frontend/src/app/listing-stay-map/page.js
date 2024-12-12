"use client"

import React, { Suspense } from "react";
import SectionGridHasMap from "./component/SectionGridHasMap";
import HeroSection from "./component/HeroSection";
import BgGlassmorphism from "../components/BgGlassmorphism";
import Subscribe from "../components/Subscribe";
import BackgroundSection from "../components/BackgroundSection";
import GridAuthorBox from "../components/GridAuthorBox";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loader/Loading";
import Header from "./component/Header";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";
import FooterNav from "../Shared/FooterNav";

const page = () => {
  return (
    <div>
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
      <Suspense fallback={<Loading />}>
        <BgGlassmorphism />
        <HeroSection/>
      </Suspense>
      </div>
      <div className="pb-24 mx-4 md:mx-0 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <Suspense fallback={<Loading />}>
          <SectionGridHasMap />
        </Suspense>
      </div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
        <Subscribe />
      
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50" />
          <GridAuthorBox />
        </div>
      </div>
      <Footer/>
      <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  );
};

export default page;