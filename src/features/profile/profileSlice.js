import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserDetailsFromLocalStorage } from "../authentication/authenticationSlice";
import { API_URL } from "../utils";

export const editProfileClicked = createAsyncThunk(
  "profile/editProfileClicked",
  async () => {
    console.log(getUserDetailsFromLocalStorage().name);
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/profile`,
    });
    return response.data;
  }
);

export const saveButtonClicked = createAsyncThunk(
  "profile/saveButtonClicked",
  async (updatedData) => {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users-social/profile`,
      data: { ...updatedData },
    });
    return response.data;
  }
);

export const followButtonClicked = createAsyncThunk(
  "profile/followButtonClicked",
  async (userId) => {
    console.log("Id to be followed is...", userId);
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users-social/following`,
      data: {
        userId:userId._id,
      },
    });
    return response.data;
  }
);

export const getFollowingStatus=createAsyncThunk("profile/getFollowingStatus",async()=>{
  const response =await axios({
    method:"GET",
    url:`${API_URL}/users-social/following`
  })
  return response.data
})

export const viewingUserProfile=createAsyncThunk("profile/viewingUserProfile",async(userDetails)=>{
  const response = await axios({
    method:"POST",
    url:`${API_URL}/users-social/${userDetails.userName}/profile`,
    data:{
          userName:userDetails.userName,
          userId:userDetails.userId
    }
  })
  return response.data
})

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    status: "idle",
    following: [],
    name:"",
    userName:"",
    followers:[],
    bio:"",
    posts:[]
  },
  reducers: {},
  extraReducers: {
    [editProfileClicked.pending]: (state) => {
      state.status = "loading";
    },
    [editProfileClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log("edit prpofile clicked", action.payload);
    },
    [editProfileClicked.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("edit prpofile clicked", action.payload);
    },

    [saveButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [saveButtonClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log("save button clicked", action.payload);
    },
    [saveButtonClicked.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("save button clicked", action.payload);
    },

    [followButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [followButtonClicked.fulfilled]: (state, action) => {
      console.log("logging payload...",action.payload)
      state.status = "fulfilled";
      state.following.push( action.payload.idFollowed);
    },
    [followButtonClicked.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("follow button clicked", action.payload);
    },
    [getFollowingStatus.pending]: (state) => {
      state.status = "loading";
    },
    [getFollowingStatus.fulfilled]: (state, action) => {
      console.log("logging curent state",action.payload)
      state.status = "fulfilled";
      state.following=action.payload.following
    },
    [getFollowingStatus.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("follow button clicked", action.payload);
    },
    [viewingUserProfile.pending]:(state)=>{
      state.status="loading";
    },
    [viewingUserProfile.fulfilled]:(state,action)=>{
      state.status="fulfilled";
      state.name = action.payload.name
      state.userName = action.payload.socialUser.userName
      state.bio=action.payload.socialUser.bio
      state.followers = action.payload.socialUser.followers
      state.posts = action.payload.posts
      console.log("Viewing profile...",action.payload)
    },
    [viewingUserProfile.rejected]:(state,action)=>{
      state.status="rejected";
      console.log("Error Viewing profile...",action.payload)
    },

  },
});

export const useProfile =()=>{
  return useSelector(state=>state.profile)
}
export default profileSlice.reducer;
