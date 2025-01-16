import React from 'react'
import NavbarElement from './NavbarElement'

const Navbar = () => {
  return (
      <div className='flex flex-col p-1 gap-1'>
        <NavbarElement title={"Home"} route={"/home/"} imgSource={"https://img.icons8.com/?size=100&id=iYcOAebNCEeX&format=png&color=000000"} />
        <NavbarElement title={"Messages"} route={"/home/message"} imgSource={"https://img.icons8.com/?size=100&id=PedPR10iVAnY&format=png&color=000000"} />
        <NavbarElement title={"Settings"} route={"/home/settings"} imgSource={"https://img.icons8.com/?size=100&id=4511GGVppfIx&format=png&color=000000"} />
      </div>
  )
}

export default Navbar