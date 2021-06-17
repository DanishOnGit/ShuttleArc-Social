import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL, setupAuthHeaderForServiceCalls } from "../utils";

export const getUserDetailsFromLocalStorage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {
    userId: null,
    userName: "",
    token: null,
  };
  return userDetails;
};

export const loginWithCredentials = createAsyncThunk(
  "authentication/loginWithCredentials",
  async (userDetails, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/users-social/login`,
        headers: {
          email: userDetails.userEmail,
          password: userDetails.userPassword,
        },
      });

      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Error Occurred !");
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const signUpButtonClicked = createAsyncThunk(
  "authentication/signUpButtonClicked",
  async (signUpDetails, { rejectWithValue }) => {
    try {
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
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const shuttleArcLoginButtonClicked = createAsyncThunk(
  "authentication/shuttleArcLoginButtonClicked",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL}/users-social/shuttlearc-login-authentication`,
        headers: {
          email: userDetails.userEmail,
          password: userDetails.userPassword,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
      if (response.status === 409) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const shuttleArcSignupButtonClicked = createAsyncThunk(
  "authentication/shuttleArcSignupButtonClicked",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL}/users-social/shuttlearc-signup`,
        data: {
          userName: userDetails.userName,
          userId: userDetails.shuttleArcId,
        },
      });
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
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
    console.log({ userId });
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

export const followingButtonClickedInProfileMenu = createAsyncThunk(
  "authentication/followingButtonClickedInProfileMenu",
  async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL}/users-social/following`,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const followersButtonClickedInProfileMenu=createAsyncThunk("authentication/followersButtonClickedInProfileMenu",async()=>{
  try{
   const response=await axios({
     method:"GET",
     url:`${API_URL}/users-social/followers`
   })
  
   return response.data
  }catch(error){
    console.log(error)
  }
 })

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    status: "idle",
    error: null,
    name: "",
    bio: "",
    email: "",
    shuttleArcId: "",
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
      state.status = "fulfilled";
      state.userId = payload.userId;
      state.userName = payload.userName;
      state.token = payload.token;
      setupAuthHeaderForServiceCalls(payload.token);
      localStorage?.setItem(
        "userDetails",
        JSON.stringify({
          token: payload.token,
          userId: payload.userId,
          userName: payload.userName,
        })
      );
    },
    [loginWithCredentials.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [shuttleArcLoginButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [shuttleArcLoginButtonClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.shuttleArcId = action.payload.user._id;
    },
    [shuttleArcLoginButtonClicked.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [shuttleArcSignupButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [shuttleArcSignupButtonClicked.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [shuttleArcSignupButtonClicked.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [signUpButtonClicked.pending]: (state) => {
      state.status = "loading";
    },

    [signUpButtonClicked.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [signUpButtonClicked.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
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
    [saveButtonClicked.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [saveButtonClicked.rejected]: (state) => {
      state.status = "rejected";
    },
    [followUnfollowButtonClickedOnFeedCard.pending]: (state) => {
      state.status = "loading";
    },
    [followUnfollowButtonClickedOnFeedCard.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (state.following.includes(action.payload.idFollowed)) {
        state.following = state.following.filter(
          (id) => id !== action.payload.idFollowed
        );
      } else {
        state.following.push(action.payload.idFollowed);
      }
    },
    [followUnfollowButtonClickedOnFeedCard.rejected]: (state) => {
      state.status = "rejected";
    },
    [followingButtonClickedInProfileMenu.pending]: (state) => {
      state.status = "loading";
    },
    [followingButtonClickedInProfileMenu.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.following = action.payload.following;
    },
    [followingButtonClickedInProfileMenu.rejected]: (state) => {
      state.status = "rejected";
    },
    [followersButtonClickedInProfileMenu.pending]:(state)=>{
      state.status="loading"
    },
    [followersButtonClickedInProfileMenu.fulfilled]:(state,action)=>{
      state.status="fulfilled"
      state.followers=action.payload.followers
    },
    [followersButtonClickedInProfileMenu.rejected]:(state)=>{
      state.status="rejected"
    }
  },
});

export const { logOutButtonClicked } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const useAuth = () => {
  return useSelector((state) => state.auth);
};
