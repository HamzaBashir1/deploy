

import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Pagination = () => {
  return (
    <div className='my-10 flex items-center justify-center bg-[#F3F4F6]'>
      <div className='flex flex-row gap-10'>
        <BsArrowLeft/>
        <button >1</button>
        <button >2</button>
        <button >3</button>
        <button >4</button>
        <button >5</button>
        <BsArrowRight/>
      </div>
    </div>
  )
}

export default Pagination
