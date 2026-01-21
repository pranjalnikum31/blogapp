import React, { useEffect, useState } from 'react'
import axios from 'axios';

function HomePage() {
  const [blogs,setBlogs]=useState([])
  async function fetchBlogs() {
    let res= await axios.get(`http://localhost:3000/blogs`)
    console.log(res);
    setBlogs(res.data.blogs)
  }
  useEffect(()=>{
    fetchBlogs();
  },[])
  return (
    <div className='w-[70%]'>{
      blogs.map(blog=>(
        <div key={blog._id} className='my-5 flex'>
        <div className='w-[60%] flex flex-col gap-2'>
            <div>
                {/* <img src=""/> */}
                <p>{blog.creator.name}</p>
            </div>
            <h2 className='font-bold text-3xl'>{blog.title}</h2>
            <h4 className='line-clamp-2'>{blog.descirption}</h4>
            <div className='flex gap-5'>
                <p>{blog.createdAt}</p>
                <p>500</p>
                <p>200</p>
            </div>
        </div>
        <div className='w-[30%]'>
            <img src={blog.image} alt="" />
        </div>
      </div>
      ))
    }
      
    </div>
  )
}

export default HomePage
