import React from 'react'
import Navbar from './component/Navbar'
import Footer from '../components/Footer/Footer'
import Favorites from './component/Favorites'
import Header from '../components/Header'
import FooterNav from '../Shared/FooterNav'
import HeroSearchForm2Mobile from '../components/HeroSearchForm2Mobile'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto"> 
      {/* Navbar stays at the top */}
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>

      {/* Favorites content fills the remaining space */}
      <main className="flex-grow">
        <Favorites />
      </main>

      {/* Footer stays at the bottom */}
      <footer>
        <Footer />
      </footer>
      <div className="lg:hidden">
        <FooterNav/>
      </div>
    </div>
  )
}

export default Page
