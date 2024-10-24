import React from 'react'
import Navbar from './component/Navbar'
import Footer from '../components/Footer/Footer'
import Content from './component/Content'
import Email from './component/Email'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <Navbar/>
      <Content/>
      <Email/>
      <Footer/>
    </div>
  )
}

export default page
