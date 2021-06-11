import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, setupAuthHeaderForServiceCalls } from "../utils";

export const getUserDetailsFromLocalStorage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {
    userId: null,
    name: "",
    userName: "",
    bio: "",
    token: null,
  };
  console.log({ userDetails });
  return userDetails;
};

export const loginWithCredentials = createAsyncThunk(
  "authentication/loginWithCredentials",
  async (userDetails, { rejectWithValue }) => {
    try {
      console.log("trying to log", userDetails);
      const res = await axios({
        method: "POST",
        url: `${API_URL}/users-social/login`,
        headers: {
          email: userDetails.userEmail,
          password: userDetails.userPassword,
        },
      });

      if (res.status === 200) {
        console.log("login success");
        return res.data;
      }
      throw new Error("Error Occurred !");
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const signUpButtonClicked=createAsyncThunk("authentication/signUpButtonClicked",async(signUpDetails)=>{
  console.log(signUpDetails)
  const response = await axios({
    method:"POST",
    url:`${API_URL}/users-social/signup`,
    data:{
        name:signUpDetails.name,
        email:signUpDetails.userEmail,
        password:signUpDetails.userPassword,
        userName:signUpDetails.userName
    }
  })

  return response.data
})

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    // status: "idle",
    ...getUserDetailsFromLocalStorage(),
  },
  reducers: {
    logOutButtonClicked: (state) => {
      state.token = null;
      state.userId = null;
      state.userName = "";
      state.name = "";
      state.bio = "";
      state.status = "idle";
      localStorage?.removeItem("userDetails");
      setupAuthHeaderForServiceCalls(null);
    },
  },
  extraReducers: {
    [loginWithCredentials.pending]: (state) => {
      state.status = "loading";
    },
    [loginWithCredentials.fulfilled]: (state, action) => {
      console.log("In fulfilled", action);
      state.status = "fulfilled";
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.token = action.payload.token;
      setupAuthHeaderForServiceCalls(action.payload.token);
      localStorage?.setItem(
        "userDetails",
        JSON.stringify({
          token: action.payload.token,
          userId: action.payload.userId,
          name: action.payload.name,
          userName: action.payload.userName,
          bio:action.payload.bio
        })
      );
    },
    [loginWithCredentials.rejected]: (state, action) => {
      console.log("in rejection", action);
      state.status = "rejected";
    },
  },
  [signUpButtonClicked.pending]:(state)=>{
    state.status="loading"
  },
  [signUpButtonClicked.fulfilled]:(state)=>{
    state.status="fulfilled"
  },
  [signUpButtonClicked.rejected]:(state)=>{
    state.status="rejected"
  }
});

export const { logOutButtonClicked } = authenticationSlice.actions;
export default authenticationSlice.reducer;

export const useAuth = () => {
  return useSelector((state) => state.auth);
};
