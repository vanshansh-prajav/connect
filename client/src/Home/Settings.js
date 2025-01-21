import React, { useContext, useState } from 'react'
import { userContext } from './Layout'
import defaultProfile from '../Assets/default_profile.png'
import DetailInput from '../Utilities/DetailInput'

const Settings = () => {
  const [user] = useState(useContext(userContext));
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

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
    </div>
  )
}

export default Settings