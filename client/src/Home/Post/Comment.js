import React from 'react'

const Comment = ({ comment }) => {
  return (
    <div className='flex p-2 pt-0 pb-0 rounded-md bg-gray-100 items-center'>
      <div className='rounded-full w-10 h-10 overflow-hidden bg-black '>
        <img alt='profile' src={comment.profilePicture} className='self-center justify-self-center object-scale-down '/>
      </div>
      <div className='p-1 flex flex-col'>
        <span className='text-lg font-bold'>{comment.username}</span>
        <span className='text-sm font-light'>{comment.comment}</span>
      </div>
    </div>
  )
}

export default Comment