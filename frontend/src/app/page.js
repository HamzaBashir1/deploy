import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./Favorite/component/Navbar";
import HeroSection from "./components/HeroSection";
import BgGlassmorphism from "./components/BgGlassmorphism";
import SectionHowItWork from "./components/HowItWork";
import SectionSliderNewCategories from "./components/SectionSliderNewCategories";
import OurFeatures from "./components/OurFeatures";
import BackgroundSection from "./components/BackgroundSection";
import GridFeaturePlaces from "./components/GridFeaturePlaces";
import Subscribe from "./components/Subscribe";
import GridAuthorBox from "./components/GridAuthorBox";
import SectionGridCategoryBox from "./components/GridCategoryBox";
import SectionBecomeAnAuthor from "./components/HeroComponent/SectionBecomeAnAuthor";
import SectionVideos from "./components/HeroComponent/SectionVideos";
import SectionClientSay from "./components/HeroComponent/SectionClientSay";
import Header from "./components/Header";
import SectionSuggestionCategories from "./components/SectionSuggestionCategoies";
import HeroSearchForm2Mobile from "./components/HeroSearchForm2Mobile";


export default function Home() {
  return (
    <main>
      <div
        className="sticky top-0 z-50 block bg-white md:hidden dark:bg-neutral-900 py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
        <BgGlassmorphism />
        <HeroSection />
        {/* Section 1 */}
        <SectionSliderNewCategories/>
        {/* section 2 */}
        <OurFeatures/>

        {/* SECTION 3*/}
        <div className="relative py-16">
          <BackgroundSection />
          <GridFeaturePlaces />
        </div>

        {/* SECTION 4*/}
        <SectionHowItWork />

        {/* SECTION 5 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSuggestionCategories
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div>

        {/* Section 6 */}
        <Subscribe />
        <div className="relative py-16">
        <BackgroundSection />
        <SectionBecomeAnAuthor />
      </div>
        {/* SECTION 7 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <GridAuthorBox />
        </div>
        <SectionVideos/>
        <SectionGridCategoryBox />
      </div>
      
      <div className="relative py-16">
      <BackgroundSection />
      <SectionClientSay uniqueClassName="" />
    </div> 
      <Footer />
    </main>
  );
}
