import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from './Layout'
import defaultProfile from '../Assets/default_profile.png'
import DetailInput from '../Utilities/DetailInput'
import Button from '../Utilities/Button'

const Settings = () => {
  const relocate = useNavigate();
  const [user] = useState(useContext(userContext));
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    relocate('/');
  }

  return (
    <div className='flex flex-col h-full items-center justify-center p-2 gap-2'>
      <div className='h-44 w-44 bg-slate-300 rounded-full overflow-hidden'>
        <img alt="profile" src={user.hasImage ? user.profilePictureURL : defaultProfile} className="object-scale-down w-full h-full" />
      </div>
      <div className='grow-[4] flex flex-col'>
        <DetailInput heading="Username" placeholder={"Enter Name"} getter={name} setter={setName} />
        <DetailInput heading="Email" placeholder={"Enter Email"} getter={email} setter={setEmail} />
        <DetailInput heading="Bio" placeholder={"Enter Bio"} singleLine={false} getter={bio} setter={setBio} />
      </div>
      <div>
        <Button type={"button"} data={"Logout"} click={handleLogout} />
      </div>
    </div>
  )
}

export default Settings