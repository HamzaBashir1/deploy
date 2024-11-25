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



const DEMO_CATS = [
  {
    id: "1",
    href: "/listing-stay",
    name: "New York",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "London",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Tokyo",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "6",
    href: "/listing-stay",
    name: "Maldives",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const DEMO_CATS_2 = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
        <BgGlassmorphism />
        <HeroSection />
        {/* Section 1 */}
        <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        />
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
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
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
