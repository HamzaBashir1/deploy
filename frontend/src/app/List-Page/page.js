import React from 'react'
import Title from './component/Title'
import CardSection from './component/CardSection'
import Discount from './component/Discount'
import Section from './component/Section'
import Pagination from './component/Pagination'
import Filter from './component/Filter'
import CommonSection from './component/CommonSection'
import Email from './component/Email'
import Navbar from './component/Navbar'
import Footer from "../components/Footer/Footer"

const Page = () => {
  return (
    <div>
      <Navbar/>
        <div className='bg-[#F3F4F6]'>
          <Title/>
          <CardSection />
          <Discount />
          <Section />
          <CardSection />
          <Pagination/>
          <Filter/>
          <CommonSection/>
          <Email/>
        </div>
      <Footer/>
    </div>
  )
}

export default Page
