import React from 'react'
import Navbar from './component/Navbar'
import Footer from '../components/Footer/Footer'
import Favorites from './component/Favorites'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      {/* Navbar stays at the top */}
      <header className='mb-24'>
        <Navbar />
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
