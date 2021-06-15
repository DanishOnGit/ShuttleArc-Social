import React, { useEffect } from "react";
import "./App.css";
import { Routes} from "react-router";
import { Login } from "./features/login/Login";
import { Signup } from "./features/signup/Signup";
import { EditProfile } from "./features/profile/EditProfile";
import { UserProfile } from "./features/profile/UserProfile";
import { ShuttleArcSignup } from "./features/signup/ShuttleArcSignup";
import { ShuttleArcLogin } from "./features/login/ShuttleArcLogin";
import { Feed } from "./features/feed/Feed";
import { NavBar } from "./features/feed/NavBar";
import { PublicRoute } from "./features/publicRoute/PublicRoute";
import { PrivateRoute } from "./features/privateRoute/PrivateRoute";
import { useAuth } from "./features/authentication/authenticationSlice";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./features/utils";
import { useDispatch } from "react-redux";
import { PageNotFound } from "./features/publicRoute/PageNotFound";
import { getAllSocialUsers } from "./features/profile/profileSlice";

function App() {
  const { token } = useAuth();
  const dispatch = useDispatch();

  if (token) {
    setupAuthHeaderForServiceCalls(token);
  }

  useEffect(() => {
    setupAuthExceptionHandler(dispatch);
    dispatch(getAllSocialUsers());
  }, [token, dispatch]);

  return (
    <div className="App">
      {token && <NavBar />}
      <Routes>
        <PrivateRoute path="/home" element={<Feed />} />
        <PrivateRoute path="/edit-Profile" element={<EditProfile />} />
        <PrivateRoute path="/:userName/profile" element={<UserProfile />} />
        <PublicRoute path="/" element={<Login />} />
        <PublicRoute path="/signup" element={<Signup />} />
        <PublicRoute path="/shuttlearc-login" element={<ShuttleArcLogin />} />
        <PublicRoute path="/shuttlearc-signup" element={<ShuttleArcSignup />} />
        <PublicRoute path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
