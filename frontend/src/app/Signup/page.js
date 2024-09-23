import React from 'react'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Footer from "../components/Footer/Footer"

const page = () => {
  return (
    <div >
      <Navbar/>
      <div className='my-44'>
        <Signup/>
      </div>
      <Footer />
    </div>
  )
}

export default page
