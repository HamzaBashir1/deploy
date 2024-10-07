"use client"
import React from 'react'
import Hero from './component/Hero'
import Narbar from './component/Navbar'
import Article from './component/Article'
import Footer from '../components/Footer/Footer'
// <ArticleLayout/>
function Page() {
  return (
    <div>
    <Narbar/>
      <Hero/>
      <Article/>
      <Footer/>
    </div>
  )
}

export default Page
