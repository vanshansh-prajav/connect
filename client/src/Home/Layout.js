import React, { createContext, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Home from './Home'
import Message from './Chat/Message';
import Settings from './Settings';
import AddPost from './AddPost/AddPost';

export const userContext = createContext();

const Layout = () => {
  const [location] = useState(useLocation());
  const [user] = useState(location.state.user);
  const [keepLogin] = useState(location.state.keepLogin);
  if (keepLogin) {
    localStorage.setItem('userData', JSON.stringify(user));
  }
  else {
    localStorage.removeItem('userData');
  }
  return (
    <userContext.Provider value={user}>
      <div className='flex h-full w-full max-h-full'>
        <div className='shrink-0 bg-white'>
          <Navbar />
        </div>
        <div className='grow-[4] shrink bg-white'>
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/message' element={<Message />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/addpost' element={<AddPost />} />
          </Routes>
        </div>
      </div>
    </userContext.Provider>
  )
}

export default Layout