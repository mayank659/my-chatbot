import React, { useState, useEffect, useRef } from 'react'
import Desktopnav from './component/Desktopnav'
import './App.css'
import Mobilenavbar from './Mobilenavbar'
import axios from 'axios'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [sent, setSent] = useState([{ text: 'Hello, how can I help you today?', sender: 'bot' }])
  const chatBoxRef = useRef(null)

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })

  }, [sent])

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      setSent([...sent, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      try {
        const response = await axios.post('https://chatbot-backend-hrqf.onrender.com/chat', { message: inputValue });
        setSent(prevSent => [...prevSent, { text: response.data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setSent(prevSent => [...prevSent, { text: 'Sorry, there was an error processing your request.', sender: 'bot' }]);
      }
    }
  }

  return (
    <>
      <div className={`body ${isDarkMode ? 'bg-white' : 'bg-black'} min-h-screen w-full`}>

        <div className="main flex items-center justify-center flex-col">

          {/* desktop view navbar*/}
          <Desktopnav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* mobile view navbar */}
          <Mobilenavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* chatbox */}
          <div className={`chatbox flex relative flex-col overflow-y-auto overflow-x-hidden items-center mt-17 md:mt-5 justify-start w-full h-[calc(100vh-4.29rem)] md:h-[620px] md:w-3/4 h-[500px] rounded-lg mt-10 ${isDarkMode ? 'md:bg-gray-100 bg-white' : 'bg-gray-800'}`}>
            <div className="box w-full h-[86%] md:h-[90%] scrollbar-none flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden">
              {sent.map((message, index) => (
                <div key={index} className={`message md:m-6 m-4 w-[90%] ${message.sender === 'user' ? 'text-right' : 'text-left'} mb-4`}>
                  <p className={`inline-block break-all px-4 py-2 rounded-lg ${message.sender === 'user' ? (isDarkMode ? 'bg-green-500 text-white' : 'bg-green-500 text-white') : (isDarkMode ? 'bg-gray-300 text-black' : 'bg-gray-700 text-white')}`}>
                    {message.text}
                  </p>

                </div>
              ))}
              <div className="bottom" ref={chatBoxRef}></div>
            </div>


            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }} className={`border fixed bottom-8 border-gray-300 outline-none hover:border-green-500 focus:border-green-500 rounded-full w-[80%] md:w-[60%] h-12 pl-7 pr-4 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} ${isDarkMode ? 'text-black' : 'text-white'}`} placeholder='Ask anything' />
          </div>


        </div>
      </div>
    </>
  )
}

export default App 