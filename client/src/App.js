import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Layout from './Home/Layout'

const App = () => {
  return (
    <div className="h-screen w-screen justify-center items-center overflow-hidden flex flex-col bg-zinc-700 font-mono">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/*' element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App