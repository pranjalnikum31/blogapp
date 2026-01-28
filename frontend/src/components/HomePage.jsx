import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  async function fetchBlogs() {
    let res = await axios.get(`http://localhost:3000/blogs`);
    console.log(res);
    setBlogs(res.data.blogs);
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="w-[70%]">
      {blogs.map((blog) => (
        <Link key={blog._id} to={"blog/"+blog._id}>
          <div  className="my-5 flex">
            <div className="w-[60%] flex flex-col gap-2">
              <div>
                {/* <img src=""/> */}
                <p>{blog.creator.name}</p>
              </div>
              <h2 className="font-bold text-3xl">{blog.title}</h2>
              <h4 className="">{blog.description}</h4>
              <div className="flex gap-5">
                <p>{new Date(blog?.createdAt).toDateString()}</p>
                <p>500</p>
                <p>200</p>
              </div>
            </div>
            <div className="w-[30%]">
              <img src={blog.image} alt="" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
