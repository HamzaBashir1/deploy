import React from 'react'
import Footer from '../components/Footer/Footer'
import Hero from './component/Hero'
import Features from './component/Features'
import FQA from './component/FQA'
import Navbar from '../Favorite/component/Navbar'
import Email from './component/Email'
function page() {
  return (
    <div className='max-w-[1920px] mx-auto'>
    <Navbar/>
      <div className='py-20 px-14'>
        <Hero/>
      </div>
      <Features/>
      <FQA/>
      <Email />
    <Footer/>
    </div>
  )
}

export default page
