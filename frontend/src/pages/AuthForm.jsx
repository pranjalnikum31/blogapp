import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AuthForm({type}) {
  const [userData,setUserData]=useState({name:"",email:"",password:""})
    async function handleAuthForm(e) {
      e.preventDefault();
      try {
        // const data=await fetch(`http://localhost:3000/${type}`,{
        //   method:"POST",
        //   body:JSON.stringify(userData),
        //   headers:{
        //     "Content-Type":"application/json",
        //   }
        // })
        // const res=await data.json()
        // console.log(res);
        const res= await axios.post(`http://localhost:3000/${type}`,userData)
        console.log(res);
        localStorage.setItem("user",JSON.stringify(res.data.user))
        localStorage.setItem("token",JSON.stringify(res.data.token))
        toast.success("done")
      } catch (error) {
        toast.error(error.response.data.message)
      }
      
    }
    return (
      <div className="border border-black mt-28 w-[20%] flex flex-col items-center gap-10">
        <h1 className="text-3xl">{type =="signup" ? "SignUp":"SignIn"}</h1>
        <form onSubmit={handleAuthForm} className="w-[100%] flex flex-col items-center gap-10">
          <input
            type="email"
            placeholder="enter your email"
            className="bg-white h-[50px]  focus:outline-none text-xl p-2 rounded-l w-full"
            onChange={(e)=>setUserData(prev=>({...prev,email:e.target.value}))}
          />
          {
            type=="signup" ? <input
            type="text"
            placeholder="enter name"
            className="bg-white h-[50px]  focus:outline-none text-xl p-2 rounded-l w-full"
            onChange={(e)=>setUserData(prev=>({...prev,name:e.target.value}))}
          />:""
          }
          <input
            type="password"
            placeholder="enter password"
            className="bg-white h-[50px]  focus:outline-none text-xl p-2 rounded-l w-full"
            onChange={(e)=>setUserData(prev=>({...prev,password:e.target.value}))}
          />
          <button
            
            className="bg-white h-[50px]  focus:outline-none text-xl p-2 rounded-l w-[100px]"
          >
            {type=="signup"?"Register":"Login"}
          </button>
        </form>
        {type =="signup" ? <p>already have an account? <Link to={"/signin"}>SignIn</Link></p>:<p>Dont have an account? <Link to={"/signup"}>SignUp</Link></p>}
      </div>
    );
}

export default AuthForm
