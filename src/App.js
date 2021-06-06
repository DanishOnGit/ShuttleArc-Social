import React from "react";
import "./App.css";
import {Routes,Route} from "react-router"; 
import { Login } from "./features/login/Login";
import { Signup } from "./features/signup/Signup";
import { ComposePost } from "./features/posts/ComposePost";
import { FeedCard } from "./features/feed/FeedCard";
import { UserProfile } from "./features/profile/UserProfile";
import { EditProfile } from "./features/profile/EditProfile";
import { ShuttleArcSignup } from "./features/signup/ShuttleArcSignup";
import { ShuttleArcLogin } from "./features/login/ShuttleArcLogin";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/shuttlearc-login"element={<ShuttleArcLogin/>} />
      <Route path="/shuttlearc-signup"element={<ShuttleArcSignup/>} />
    </Routes>
      {/* <ComposePost /> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <FeedCard/>
      <UserProfile/>
      <EditProfile/> */}
    </div>
  );
}

export default App;
