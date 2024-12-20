"use client";

import BackgroundSection from "../components/BackgroundSection";
import ListingImageGallery from "./component/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "./component/SectionSliderNewCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useContext } from "react";
import Navbar from "../Favorite/component/Navbar";
import Footer from "../components/Footer/Footer";
import { imageGallery as listingStayImageGallery } from "./constant";
import Subscribe from "./component/Subscribe";
import MobileFooterSticky from "./component/MobileFooterSticky";
import Header from "../components/Header";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";

const DetailtLayoutInner = ({ children }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams(); 
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    const params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}`);
  };

  const getImageGalleryListing = () => {
    // console.log("update image", images)
    if (thisPathname?.includes("/listing-stay-detail")) {
      return listingStayImageGallery;
    }
    return [];
  };

  return (
    <div className="ListingDetailPage">
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className="mt-4"></div>
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
        <Subscribe className="pt-24 lg:pt-32" />
      </div>
      <MobileFooterSticky />
      <Footer />
    </div> 
  );
};

const DetailtLayout = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailtLayoutInner>{children}</DetailtLayoutInner>
    </Suspense>
  );
};

export default DetailtLayout;
