import React from 'react'

const Tag = ({ tag, index, removeTag }) => {
  return (
    <div className='flex gap-2 pl-2 pr-2 p-1 rounded-md w-fit border-2 border-gray-200'>
      <div className='text-balance'>{tag}</div>
      <button className='shrink-0' onClick={() => removeTag({ index })}><img alt='Remove Tag' src='https://img.icons8.com/?size=100&id=tBs4jEKyshHO&format=png&color=000000' className='w-4 h-4 self-center cursor-pointer' /></button>
    </div>
  )
}

export default Tag