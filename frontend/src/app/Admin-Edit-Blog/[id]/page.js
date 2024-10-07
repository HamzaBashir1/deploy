import Link from 'next/link'
import React from 'react'
import Navbar from './component/Navbar'
import BlogForm from './component/BlogForm'

const page = () => {
  return (
    <div>
        <Navbar/>
        <section className='mt-8'>
            <BlogForm/>
        </section>
    </div>
  )
}

export default page
