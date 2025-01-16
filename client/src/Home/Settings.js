import React, { useContext, useState } from 'react'
import { userContext } from './Layout'
import defaultProfile from '../Assets/default_profile.png'
import Detail from '../Utilities/Detail'

const Settings = () => {
  const [user] = useState(useContext(userContext));
  console.log(user);
  return (
    <div className='flex flex-col h-full border-2 items-center p-2 gap-2'>
      <div className='h-44 w-44 bg-slate-300 rounded-full overflow-hidden'>
        <img alt="profile" src={user.hasImage ? user.profilePictureURL : defaultProfile} className="object-scale-down w-full h-full" />
      </div>
      <div className='grow-[4] flex flex-col'>
        <Detail heading="Username" value={user.username}/>
        <Detail heading="Email" value={user.email} />
        <Detail heading="Bio" value={user.bio} singleLine={false} />
      </div>
    </div>
  )
}

export default Settings