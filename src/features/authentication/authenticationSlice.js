import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, setupAuthHeaderForServiceCalls } from "../utils";

export const getUserDetailsFromLocalStorage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {
    userId: null,
    // name: "",
    userName: "",
    // bio: "",
    // followers: [],
    // following: [],
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
export const signUpButtonClicked = createAsyncThunk(
  "authentication/signUpButtonClicked",
  async (signUpDetails) => {
    console.log(signUpDetails);
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users-social/signup`,
      data: {
        name: signUpDetails.name,
        email: signUpDetails.userEmail,
        password: signUpDetails.userPassword,
        userName: signUpDetails.userName,
      },
    });

    return response.data;
  }
);

export const loadUserDetails = createAsyncThunk(
  "authentication/loadUserDetails",
  async (userName) => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/${userName}/profile`,
    });
    return response.data;
  }
);

export const saveButtonClicked = createAsyncThunk(
  "authenticationSlice/saveButtonClicked",
  async (updatedData) => {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users-social/profile`,
      data: { ...updatedData },
    });
    return response.data;
  }
);

export const followUnfollowButtonClickedOnFeedCard = createAsyncThunk(
  "authenticationSlice/followUnfollowButtonClicked",
  async (userId) => {
    console.log("Id to be followed is...", userId);
    const response = await axios({
      method: "POST",
      url: `${API_URL}/users-social/following`,
      data: {
        userId: userId._id,
      },
    });
    return response.data;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    // status: "idle",
    name: "",
    // userName: "",
    bio: "",
    followers: [],
    following: [],
    ...getUserDetailsFromLocalStorage(),
  },
  reducers: {
    logOutButtonClicked: (state) => {
      state.token = null;
      state.userId = null;
      state.userName = "";
      state.name = "";
      state.bio = "";
      state.followers = [];
      state.following = [];
      state.status = "idle";
      localStorage?.removeItem("userDetails");
      setupAuthHeaderForServiceCalls(null);
    },
  },
  extraReducers: {
    [loginWithCredentials.pending]: (state) => {
      state.status = "loading";
    },
    [loginWithCredentials.fulfilled]: (state, { payload }) => {
      console.log("In fulfilled");
      state.status = "fulfilled";
      state.userId = payload.userId;
      state.userName = payload.userName;
      // state.name = payload.name;
      // state.bio = payload.bio;
      // state.followers = payload.followers;
      // state.following = payload.following;
      state.token = payload.token;
      setupAuthHeaderForServiceCalls(payload.token);
      localStorage?.setItem(
        "userDetails",
        JSON.stringify({
          token: payload.token,
          userId: payload.userId,
          // name: payload.name,
          userName: payload.userName,
          // bio: payload.bio,
          // followers: payload.followers,
          // following: payload.following,
        })
      );
    },
    [loginWithCredentials.rejected]: (state, action) => {
      console.log("in rejection", action);
      state.status = "rejected";
    },
    [signUpButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [signUpButtonClicked.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [signUpButtonClicked.rejected]: (state) => {
      state.status = "rejected";
    },
    [loadUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [loadUserDetails.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.name = payload.name;
      state.bio = payload.socialUser.bio;
      state.userName = payload.socialUser.userName;
      state.followers = payload.socialUser.followers;
      state.following = payload.socialUser.following;
    },
    [loadUserDetails.rejected]: (state) => {
      state.status = "rejected";
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
    [followUnfollowButtonClickedOnFeedCard.pending]: (state) => {
      state.status = "loading";
    },
    [followUnfollowButtonClickedOnFeedCard.fulfilled]: (state, action) => {
      console.log("logging payload...", action.payload);
      state.status = "fulfilled";
      if (state.following.includes(action.payload.idFollowed)) {
        state.following = state.following.filter(
          (id) => id !== action.payload.idFollowed
        );
      } else {
        state.following.push(action.payload.idFollowed);
      }
    },
    [followUnfollowButtonClickedOnFeedCard.rejected]: (state, action) => {
      state.status = "rejected";
      console.log("follow button clicked", action.payload);
    },
  },
});

export const { logOutButtonClicked } = authenticationSlice.actions;
export default authenticationSlice.reducer;

export const useAuth = () => {
  return useSelector((state) => state.auth);
};
