import React from 'react'
import Toggler from './component/Toggler'
import { useState } from 'react'

export default function Mobilenavbar({isDarkMode,setIsDarkMode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <> 
      <div className={`navbar h-17 md:hidden flex items-center select-none justify-between ${isDarkMode ? 'bg-white' : 'bg-gray-900'} w-full fixed top-0`}>
      <div className={`${isDarkMode ? 'text-black' : 'text-white'} ${isDarkMode ? 'bg-gray-200' : 'bg-gray-500'} p-3 h-10 w-10 rounded-full flex ml-2 items-center justify-center`} onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>☰</div>
      <div className="mr-2">
        <Toggler isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} mobile="mobile-toggle"/>
      </div>
    </div>

       <div className={`side flex flex-col md:hidden ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'} gap-20 transition-transform duration-300 z-99 ${isMenuOpen ? 'translate-x-0' : 'translate-x-[-100%]'} left-0 h-[calc(100vh-4rem)] w-45 items-center top-17 fixed`}>
          <div className="logo text-3xl font-bold text-green-500 mt-14">Maya</div>
          <div className={`about font-medium cursor-pointer font-sans text-[17px] ${isDarkMode ? 'text-black' : 'text-white'}`}>About</div>
       </div>
    </>
  )
}
