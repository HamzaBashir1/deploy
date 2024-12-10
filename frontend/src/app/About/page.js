import React from "react";
import SectionSubscribe2 from "../components/Subscribe";
import BgGlassmorphism from "../components/BgGlassmorphism";
import BackgroundSection from "../components/BackgroundSection";
import Hero from "./component/Hero";
import SectionFounder from "./component/SectionFounder";
import SectionClientSay from "../components/HeroComponent/SectionClientSay";
import SectionStatistic from "./component/SectionStatics";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

const Page = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
    <Header />
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <Hero
          rightImg="/about-hero-right.png"
          heading="👋 About Us."
          btnText=""
          subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageAbout_" />
        </div>

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
