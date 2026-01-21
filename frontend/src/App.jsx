import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div className="bg-slate-200 w-screen h-screen ">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/signin" element={<AuthForm type={"signin"} />}></Route>
          <Route path="/signup" element={<AuthForm type={"signup"} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
