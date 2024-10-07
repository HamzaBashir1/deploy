import React from 'react'
import FQA from './component/FQA'
import Footer from '../components/Footer/Footer'
import Navbar from '../Blog/component/Navbar'
function page() {
  return (
    <div>
      <Navbar/>
      <section>
        <FQA/>
      </section>
      <Footer/>
    </div>
  )
}

export default page
