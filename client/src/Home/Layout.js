import React, { createContext, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Home from './Home'
import Message from './Chat/Message';
import Settings from './Settings';

export const userContext = createContext();

const Layout = () => {
  const location = useLocation();
  const [user] = useState(location?.state);
  return (
    <userContext.Provider value={user}>
      <h2 className='bg-sky-700 text-6xl text-white p-2 w-full'>Connect</h2>
      <div className='flex h-full w-full'>
        <div className='shrink-0 bg-white'>
          <Navbar />
        </div>
        <div className='grow-[4] shrink bg-white'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/message' element={<Message />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </userContext.Provider>
  )
}

export default Layout