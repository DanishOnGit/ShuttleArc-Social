import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { Login } from "./features/login/Login";
import { Signup } from "./features/signup/Signup";
import { EditProfile } from "./features/profile/EditProfile";
import { ShuttleArcSignup } from "./features/signup/ShuttleArcSignup";
import { ShuttleArcLogin } from "./features/login/ShuttleArcLogin";
import { Feed } from "./features/feed/Feed";
import { NavBar } from "./features/feed/NavBar";
import { PublicRoute } from "./features/publicRoute/PublicRoute";
import { useAuth } from "./features/authentication/authenticationSlice";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./features/utils";
import { useDispatch } from "react-redux";

function App() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  console.log({ token });
  if (token) {
    setupAuthHeaderForServiceCalls(token);
    console.log({ token });
  }

  useEffect(() => {
    setupAuthExceptionHandler(dispatch);
  }, [token]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/home" element={<Feed />} />
        <Route path="/edit-Profile" element={<EditProfile />} />
        <PublicRoute path="/" element={<Login />} />
        <PublicRoute path="/signup" element={<Signup />} />
        <PublicRoute path="/shuttlearc-login" element={<ShuttleArcLogin />} />
        <PublicRoute path="/shuttlearc-signup" element={<ShuttleArcSignup />} />
        
      </Routes>
    </div>
  );
}

export default App;
