import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../utils";

export const getAllSocialUsers = createAsyncThunk(
  "profile/getAllSocialUsers",
  async () => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social`,
    });
    return response.data;
  }
);

export const editProfileClicked = createAsyncThunk(
  "profile/editProfileClicked",
  async () => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/profile`,
    });
    return response.data;
  }
);

export const followUnfollowButtonClickedOnProfileHeader = createAsyncThunk(
  "profile/followUnfollowButtonClickedOnProfileHeader",
  async (userId) => {
    await axios({
      method: "POST",
      url: `${API_URL}/users-social/following`,
      data: {
        userId: userId._id,
      },
    });
    return { loggedInUsersId: userId.loggedInUsersId };
  }
);

export const viewingUserProfile = createAsyncThunk(
  "profile/viewingUserProfile",
  async (userDetails) => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/${userDetails.userName}/profile`,
    });
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    status: "idle",
    socialId: null,
    name: "",
    userName: "",
    bio: "",
    followers: [],
    following: [],
    posts: [],
    allSocialUsers: [],
  },
  reducers: {
    resetProfile: (state, action) => {
      state.status = "idle";
      state.socialId = null;
      state.name = "";
      state.userName = "";
      state.bio = "";
      state.followers = [];
      state.following = [];
      state.posts = [];
    },
  },
  extraReducers: {
    [editProfileClicked.pending]: (state) => {
      state.status = "loading";
    },
    [editProfileClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [editProfileClicked.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [followUnfollowButtonClickedOnProfileHeader.pending]: (state) => {
      state.status = "loading";
    },
    [followUnfollowButtonClickedOnProfileHeader.fulfilled]: (state, action) => {
      console.log("From foUnfoProHeader", action.payload);
      state.status = "fulfilled";
      if (state.followers.includes(action.payload.loggedInUsersId)) {
        state.followers = state.followers.filter(
          (id) => id !== action.payload.loggedInUsersId
        );
      } else {
        state.followers.push(action.payload.loggedInUsersId);
      }
    },
    [followUnfollowButtonClickedOnProfileHeader.rejected]: (state, action) => {
      state.status = "rejected";
    },
    
    [viewingUserProfile.pending]: (state) => {
      state.status = "loading";
    },
    [viewingUserProfile.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.socialId = payload.socialUser._id;
      state.name = payload.name;
      state.userName = payload.socialUser.userName;
      state.bio = payload.socialUser.bio;
      state.followers = payload.socialUser.followers;
      state.following = payload.socialUser.following;
      state.posts = payload.posts;
      console.log("Viewing profile...", payload);
    },
    [viewingUserProfile.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [getAllSocialUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getAllSocialUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      state.allSocialUsers = action.payload.updatedSocialUsers;
    },
    [getAllSocialUsers.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export const useProfile = () => {
  return useSelector((state) => state.profile);
};
export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
