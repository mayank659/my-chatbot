import React from 'react'

import Toggler from './Toggler'

export default function Desktopnav({isDarkMode,setIsDarkMode}) {
    

  return (
        <div className="navbar h-27 md:flex hidden items-center justify-around w-full select-none">
          <div className="logo text-[55px] font-bold text-green-500">Maya</div>
          <div className="menu flex items-center justify-center gap-4">

          {/* about section */}
          <div className={`about font-medium cursor-pointer font-sans text-[20px] ${isDarkMode ? 'text-black' : 'text-white'}`}>About</div>


            {/* checkbox */}
            <Toggler isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}  mobile="desktop-toggle"/>

          </div>

        </div>
  )
}
