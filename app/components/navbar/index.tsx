"use client";
import React from 'react'
import Desktop_NavBar from './desktop-navbar'
import Mobile_NavBar from './mobile-navbar'

const Navbar = () => {
  return (
    <nav className=' w-full p-6 bg-neutral-800'>
    <Desktop_NavBar/>
    <Mobile_NavBar/>
    </nav>
  )
}

export default Navbar