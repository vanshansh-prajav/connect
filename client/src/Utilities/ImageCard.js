import React from 'react'

const ImageCard = ({ post }) => {

  return (
    <div className='transition-all duration-300 w-60 shadow-md rounded-lg hover:shadow-[3px_3px_10px_5px_rgba(0,0,0,0.3)] cursor-pointer '>
      <img alt='post' src={post.postImage.secure_url} className='rounded-lg object-scale-down hover:grayscale' />
    </div>
  )
}

export default ImageCard