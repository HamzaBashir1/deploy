import React from 'react'
import Navbar from './component/Navbar'
import Login from './component/login'
import Footer from "../components/Footer/Footer"

const page = () => {
  return (
    <div >
      <Navbar/>
      <div className='my-44'>
        <Login/>
      </div>
      <Footer />
    </div>
  )
}

export default page
