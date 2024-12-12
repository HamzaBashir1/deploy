import React from 'react'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Footer from "../components/Footer/Footer"
import Header from '../components/Header'
import FooterNav from '../Shared/FooterNav'
import HeroSearchForm2Mobile from '../components/HeroSearchForm2Mobile'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <div className='mb-20 mt-6'>
        <Signup/>
      </div>
      <Footer />
        <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  )
}

export default page
