import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import ImageCard from '../Utilities/ImageCard';
import ImagePage from './Post/ImagePage';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getposts", {
          method: "GET"
        })
        const res = JSON.parse(await response.json());
        if (response.status === 201) {
          setPosts(res);
        }
        else {
          throw new Error(res);
        }
      } catch (error) {
        alert(`Error ${error.message}`);
      }
    }
    fetchData();
  }, []);


  return (
    <Routes>
      <Route path={'/'} element={<div className='h-full max-h-full overflow-y-scroll p-2 border-2 border-blue-500'>
        <ul className='flex gap-4'>
          {posts.map((post, index) => {
            return (
              <li key={index} >
                <Link to={`/home/${post._id}`}>
                  <ImageCard post={post} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>} />
      <Route path={'/:id'} element={<ImagePage />} />
    </Routes>
  )
}

export default Home