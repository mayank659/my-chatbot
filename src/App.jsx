import React, { useState, useEffect, useRef } from 'react'
import Desktopnav from './component/Desktopnav'
import './App.css'
import Mobilenavbar from './Mobilenavbar'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [response,setresponse] = useState(false)
  const [sent, setSent] = useState([{ text: 'Hello, how can I help you today?', sender: 'bot' }])
  const chatBoxRef = useRef(null)

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })

  }, [sent])

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      setSent([...sent, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      setresponse(true);
      try {
        /* https://chatbot-backend-hrqf.onrender.com/chat */

        const response = await axios.post('https://chatbot-backend-hrqf.onrender.com/chat', { message: inputValue });
        setSent(prevSent => [...prevSent, { text: response.data.response, sender: 'bot' }]);
      } catch (error) {
        if(error){
          console.error('Error sending message:', error);
          setSent(prevSent => [...prevSent, { text: 'Sorry, there was an error processing your request.', sender: 'bot' }]);
        }
      } finally {
        setresponse(false);
      }
    }
  }

  return (
    <>
      <div className={`body ${isDarkMode ? 'bg-white' : 'bg-black'} min-h-screen w-full max-w-full overflow-x-hidden`}>

        <div className="main flex items-center justify-center flex-col min-w-0">

          {/* desktop view navbar*/}
          <Desktopnav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* mobile view navbar */}
          <Mobilenavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* chatbox */}
          <div className={`chatbox
        relative
        flex
        flex-col
        items-center
        md:w-[90%]
        max-w-full
        min-w-0
        overflow-hidden
        mt-17
        md:mt-5
        h-[calc(100vh-68px)]
        p-2
        rounded-lg
        ${isDarkMode ? "md:bg-gray-100 bg-white" : "bg-gray-800"}}`}>
            <div className=" box
          w-full
          max-w-full
          min-w-0
          h-[calc(100%-60px)]
          flex
          flex-col
          items-center
          justify-start
          overflow-y-auto
          overflow-x-hidden
          scrollbar-none
          pb-20">
              {sent.map((message, index) => (
                <div key={index} className={` message
              w-full
              max-w-full
              min-w-0
              px-3
              sm:px-4
              md:px-6
              mb-4
              ${
                message.sender === "user"
                  ? "text-right"
                  : "text-left"
              }`}>
                  <div className={`inline-block
                max-w-[95%]
                sm:max-w-[90%]
                md:max-w-[75%]
                min-w-0
                px-3
                py-2
                sm:px-4
                sm:py-3
                rounded-lg
                text-left
                wrap-break-word
                overflow-hidden
                ${
                  message.sender === "user"
                    ? "bg-green-500 text-white"
                    : isDarkMode
                      ? "bg-gray-300 text-black"
                      : "bg-gray-700 text-white"
                }`}>
  
     {message.sender === "user" ? (
                <span className="wrap-break-word whitespace-pre-wrap">
                  {message.text}
                </span>
              ) : (
                <ReactMarkdown
                  components={{

                    h1: ({ children }) => (
                      <h1 className="text-lg sm:text-xl font-bold mt-2 mb-3">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-base sm:text-lg font-bold mt-3 mb-2">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-sm sm:text-base font-bold mt-3 mb-2">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="mb-3 leading-6 text-sm sm:text-base wrap-break-word">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 sm:pl-6 mb-3 space-y-1">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 sm:pl-6 mb-3 space-y-1">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="leading-6 wrap-break-word">
                        {children}
                      </li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-bold">
                        {children}
                      </strong>
                    ),

                    pre: ({ children }) => (
                      <pre
                        className="
                          w-full
                          max-w-full
                          box-border
                          bg-black
                          text-white
                          p-3
                          rounded-lg
                          my-3
                          overflow-x-auto
                          text-xs
                          sm:text-sm
                        "
                      >
                        {children}
                      </pre>
                    ),

                    code: ({ children }) => (
                      <code className="text-xs sm:text-sm wrap-break-word">
                        {children}
                      </code>
                    ),

                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              )}

            </div>
          </div>
        ))}
              <div className="bottom" ref={chatBoxRef}></div>
            </div>

            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            className={`border fixed bottom-8 border-gray-300 outline-none hover:border-green-500 focus:border-green-500 rounded-full w-[80%] md:w-[60%] h-12 pl-7 pr-4 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} ${isDarkMode ? 'text-black' : 'text-white'}`} placeholder={`${response ? "Ai is running! Please wait..." : "Ask anything"}`} disabled={response ? true : false}/>

          </div>


        </div>
      </div>
    </>
  )
}

export default App 