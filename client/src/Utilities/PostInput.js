import React from 'react'

const PostInput = ({ title, getter, setter }) => {
    return (
        <div className='flex flex-col'>
            <span className='text-sm'>{title}</span>
            <input type='text' className={`rounded-xl text-2xl border-2 p-1 pl-2 pr-2`} value={getter} onChange={(e) => setter(e.target.value)} />
        </div>
    )
}

export default PostInput