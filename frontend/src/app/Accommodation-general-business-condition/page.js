import React from 'react'
import Navbar from './component/Navbar'
import GeneralBusinessConditions from './component/GeneralBusinessConditions'
import Footer from '../components/Footer/Footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <GeneralBusinessConditions/>
      <Footer/>
    </div>
  )
}

export default page
