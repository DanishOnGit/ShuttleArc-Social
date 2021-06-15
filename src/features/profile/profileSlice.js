import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserDetailsFromLocalStorage } from "../authentication/authenticationSlice";
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
    console.log(getUserDetailsFromLocalStorage().name);
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/profile`,
    });
    return response.data;
  }
);

// export const saveButtonClicked = createAsyncThunk(
//   "profile/saveButtonClicked",
//   async (updatedData) => {
//     const response = await axios({
//       method: "POST",
//       url: `${API_URL}/users-social/profile`,
//       data: { ...updatedData },
//     });
//     return response.data;
//   }
// );

export const getFollowingStatus = createAsyncThunk(
  "profile/getFollowingStatus",
  async () => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/following`,
    });
    return response.data;
  }
);

export const viewingUserProfile = createAsyncThunk(
  "profile/viewingUserProfile",
  async (userDetails) => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/${userDetails.userName}/profile`
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
      console.log("edit prpofile clicked", action.payload);
    },
    [editProfileClicked.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("edit prpofile clicked", action.payload);
    },

    // [saveButtonClicked.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [saveButtonClicked.fulfilled]: (state, action) => {
    //   state.status = "fulfilled";
    //   console.log("save button clicked", action.payload);
    // },
    // [saveButtonClicked.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   console.log("save button clicked", action.payload);
    // },

    // [followUnfollowButtonClicked.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [followUnfollowButtonClicked.fulfilled]: (state, action) => {
    //   console.log("logging payload...", action.payload);
    //   state.status = "fulfilled";
    //   state.following.push(action.payload.idFollowed);
    // },
    // [followUnfollowButtonClicked.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   console.log("follow button clicked", action.payload);
    // },
    [getFollowingStatus.pending]: (state) => {
      state.status = "loading";
    },
    [getFollowingStatus.fulfilled]: (state, action) => {
      console.log("logging curent state", action.payload);
      state.status = "fulfilled";
      state.following = action.payload.following;
    },
    [getFollowingStatus.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("follow button clicked", action.payload);
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
      console.log("Error Viewing profile...", action.payload);
    },
    [getAllSocialUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getAllSocialUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log("Getting all users...", action.payload);
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
