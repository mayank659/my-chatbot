import React from 'react'

export default function Toggler({isDarkMode,setIsDarkMode,mobile}) {
    return (
        <div className="flex">
            <input type="checkbox" name="darkmode" id={mobile} className='peer sr-only' onChange={() => setIsDarkMode(!isDarkMode)} />
            <label htmlFor={mobile} className='cursor-pointer after:transition-all peer-checked:after:translate-x-full  peer-checked:bg-green-400 peer-checked:border-green-500 transition-all duration-300 peer-checked:after:bg-green-700 after:left-1 relative flex items-center p-0.4 h-7 w-12.5 bg-white-500 border border-gray-600 after:absolute after:content-[""] after:h-5 after:w-5 after:rounded-full after:bg-gray-600 rounded-full'></label>
            <span className={`${isDarkMode ? 'text-gray-600' : 'text-white'} ml-2`}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
    )
}
