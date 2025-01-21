import React from 'react'
import NavbarElement from './NavbarElement'

const Navbar = () => {
  return (
    <div className='flex flex-col p-1 gap-1 justify-between h-full'>
      <div>
        <NavbarElement title={"Home"} route={"/home/"} imgSource={"https://img.icons8.com/?size=100&id=iYcOAebNCEeX&format=png&color=000000"} />
        <NavbarElement title={"Messages"} route={"/home/message"} imgSource={"https://img.icons8.com/?size=100&id=PedPR10iVAnY&format=png&color=000000"} />
        <NavbarElement title={"Add Post"} route={"/home/addpost"} imgSource={"https://img.icons8.com/?size=100&id=VqxLf3Y9RVLk&format=png&color=000000"} />
      </div>
      <NavbarElement title={"Settings"} route={"/home/settings"} imgSource={"https://img.icons8.com/?size=100&id=4511GGVppfIx&format=png&color=000000"} />
    </div>
  )
}

export default Navbar