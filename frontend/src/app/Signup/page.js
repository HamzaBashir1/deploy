import React from 'react'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Footer from "../components/Footer/Footer"
import Header from '../components/Header'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <Header />
      <div className='my-44'>
        <Signup/>
      </div>
      <Footer />
    </div>
  )
}

export default page
