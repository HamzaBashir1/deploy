import React from "react";
import Loading from "./components/Loader/Loading";
import Error from "./components/Error/Error";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import PropertyCard from "./components/PropertyCard";
import Email from "./components/Email";
import Work from "./components/Work";
import CardSection from "./components/CardSection";
import Location from "./components/location/Location";
import Section from "./components/Section";
import FeatureSection from './components/FeatureSection'
import Footer from "./components/Footer/Footer";


export default function Home() {
  return (
    <main>
      <Hero/>
      <Categories/>
      <CardSection/>
      <Location/>
      <Section/>
      <FeatureSection/>
      <Work />
      <Email />
      <Footer/>
    </main>
  );
}
