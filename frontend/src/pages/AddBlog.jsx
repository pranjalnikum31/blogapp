import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function AddBlog() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const Navigate = useNavigate();
  async function handlePostBlog() {
    try {
      const res = await axios.post("http://localhost:3000/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      
      toast.success(res.data.message)
      Navigate("/")
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

  return token == null ? (
    <Navigate to={"/signin"} />
  ) : (
    <div>
      <label htmlFor="">Title</label>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) =>
          setBlogData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <br />
      <label htmlFor="">Description</label>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) =>
          setBlogData((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <br />
      <label htmlFor="image" className="">
        {
          blogData.image ? <img src={URL.createObjectURL(blogData.image)} alt="" className="w-auto h-auto aspect-video object-contain" /> :<div className="bg-slate-500 aspect-video flex justify-center items-center">select image</div>
        }
        
      </label>
      <input
        id="image"
        type="file"
        accept=".png,.jpeg,.jpg"
        onChange={(e) =>
          setBlogData((prev) => ({ ...prev, image: e.target.files[0] }))
        }
      />
      <br />
      <button onClick={handlePostBlog}>Post Blog</button>
    </div>
  );
}

export default AddBlog;
