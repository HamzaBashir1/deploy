import Link from 'next/link'
import React from 'react'
import { BiSolidLeftArrow } from 'react-icons/bi'
import BlogForm from './component/BlogForm'
import Navbar from './component/Navbar'

const page = () => {
  return (
    <div className='max-w-[1920px] mx-auto'>
        <Navbar/>
        <section className='mt-8'>
            <BlogForm/>
        </section>
    </div>
  )
}

export default page
