import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const NavbarElement = ({ imgSource, title, route }) => {
  const nameDialog = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);
  const enter = () => {
    setDialogOpen(true);
  }
  const leave = () => {
    setDialogOpen(false);
  }
  return (
    <div className="flex justify-center items-center p-2 text-white text-lg cursor-pointer rounded-md">
      <Link to={route} className="relative">
        <img
          src={imgSource}
          alt={title}
          onMouseOver={enter}
          onMouseLeave={leave}
          className="static w-8"
        />
        <dialog
          className="absolute top-1/4 -right-44  bg-black text-sm text-white rounded-full pl-2 pr-2"
          open={dialogOpen}
          ref={nameDialog}
        >
          <span>{title}</span>
        </dialog>
      </Link>
    </div>

  )
}

export default NavbarElement