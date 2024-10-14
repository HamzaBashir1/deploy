import React from 'react'
import Navbar from './component/Navbar'
import GeneralBusinessConditions from './component/GeneralBusinessConditions'
import Footer from '../components/Footer/Footer'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <Navbar/>
      <GeneralBusinessConditions/>
      <Footer/>
    </div>
  )
}

export default page
