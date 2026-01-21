import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full h-full flex flex-col  items-center'>
      <div className='w-full h-[70px] text-white bg-amber-700'>
        Navbar
      </div>
      <Outlet/>
    </div>
  )
}

export default Navbar
