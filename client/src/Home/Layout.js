import React, { createContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home'
const userContext = createContext();

const Layout = () => {
  const location = useLocation();
  const user = location?.state;
  console.log(user);
  return (
    <userContext.Provider value={user}>
      <div className='flex'>
        <div className='flex'>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </userContext.Provider>
  )
}

export default Layout