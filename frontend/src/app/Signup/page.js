import React from 'react'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Footer from "../components/Footer/Footer"

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
      <Navbar/>
      <div className='my-44'>
        <Signup/>
      </div>
      <Footer />
    </div>
  )
}

export default page
