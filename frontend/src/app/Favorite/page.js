import React from 'react'
import Navbar from './component/Navbar'
import Footer from '../components/Footer/Footer'
import Favorites from './component/Favorites'
import Header from '../components/Header'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto"> 
      {/* Navbar stays at the top */}
      <header className='mb-24'>
        <Header />
      </header>

      {/* Favorites content fills the remaining space */}
      <main className="flex-grow">
        <Favorites />
      </main>

      {/* Footer stays at the bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Page
