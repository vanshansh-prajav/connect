import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from './CommentSection'
const ImagePage = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch("http://localhost:3001/getpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        })
        const res = JSON.parse(await response.json());
        console.log(res);
        if (response.status === 201) {
          setCurrentPost(res);
        }
        else {
          throw new Error(res);
        }
      } catch (error) {
        alert(`Error ${error.message}`);
      }
    }
    getPost();
  }, [id])
  return (
    <>
      {currentPost ?
        <div className="flex h-full w-full justify-center items-center">
          <div className="flex w-4/6 h-4/6 bg-gray-200 rounded-lg">
            <div className="p-2 flex w-1/2 items-center justify-center">
              <img
                src={currentPost.postImage.secure_url}
                alt="post"
                className="rounded-lg object-scale-down max-w-full max-h-full"
              />
            </div>
            <div className="p-2 w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-bold text-4xl font-bold">{currentPost.title}</span>
                <br />
                <div className='bg-white rounded-md p-1'>
                  <span>{currentPost.decription}</span>
                </div>
              </div>
              <div className='flex flex-col max-h-60'>
                <CommentSection />
                <div className='flex w-full'>
                  <input placeholder='Views...' type='text' className='w-full'/>
                  <button className='pl-2 pr-2 p-1 rounded-br-md bg-red-500'>add</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        :
        "..Loading"}
    </>
  )
}

export default ImagePage