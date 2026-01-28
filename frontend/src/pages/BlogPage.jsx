import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { id } = useParams();

  const [blogData, setBlogData] = useState(null);

  async function FetchBlogById() {
    try {
      const res = await axios.get(`http://localhost:3000/blogs/${id}`);
      setBlogData(res.data.blog);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    FetchBlogById();
  }, []);

  return (
    <div className="min-h-screen flex justify-center py-10">
      {blogData ? (
        <div className="max-w-[700px] w-full px-4 flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            By <span className="font-medium">{blogData?.creator?.name}</span>
          </p>

          <h1 className="text-3xl font-bold leading-tight">
            {blogData?.title}
          </h1>

          <p className="text-gray-700 leading-relaxed">
            {blogData?.description}
          </p>

          <img
            src={blogData?.image}
            alt=""
            className="w-full rounded-lg object-cover"
          />

          <p className="text-xs text-gray-400">
            {new Date(blogData?.createdAt).toDateString()}
          </p>
        </div>
      ) : (
        <h1 className="text-lg font-medium">loading...</h1>
      )}
    </div>
  );
}

export default BlogPage;
