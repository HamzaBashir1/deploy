import React from 'react'
import Navbar from './component/Navbar'
import Footer from '../components/Footer/Footer'
import Content from './component/Content'
import Email from './component/Email'
import Header from '../components/Header'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <Header />
      <Content/>
      <Email/>
      <Footer/>
    </div>
  )
}

export default page
