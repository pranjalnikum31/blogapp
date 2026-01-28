import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AddBlog from "./pages/AddBlog";
import BlogPage from "./pages/BlogPage";
function App() {
  return (
    <div className="bg-slate-200 w-full h-full ">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/signin" element={<AuthForm type={"signin"} />}></Route>
          <Route path="/signup" element={<AuthForm type={"signup"} />}></Route>
          <Route path="/addblog" element={<AddBlog/>}></Route>
          <Route path="/blog/:id" element={<BlogPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
