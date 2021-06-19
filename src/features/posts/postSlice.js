import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../utils";

export const postButtonClicked = createAsyncThunk(
  "post/postButtonClicked",
  async (postDetails) => {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/posts`,
      data: {
        content: postDetails.postContent,
        userId: postDetails.userId,
      },
    });
    return response.data;
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
});

export const likeButtonClicked = createAsyncThunk(
  "post/likeButtonClicked",
  async (postId) => {
    console.log("Liked btn clicked")
    await axios({
      method: "POST",
      url: `${API_URL}/posts/${postId}`,
    });
    return postId;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [postButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [postButtonClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts.unshift(action.payload.post);
    },
    [postButtonClicked.rejected]: (state) => {
      state.status = "rejected";
    },
    [getAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [getAllPosts.rejected]: (state) => {
      state.status = "rejected";
    },
    [likeButtonClicked.pending]: (state) => {
      state.status = "loading";
    },
    [likeButtonClicked.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      if (postIndex !== -1) {
        state.posts[postIndex].isLikedByUser =
          !state.posts[postIndex].isLikedByUser;
      }
    },
    [likeButtonClicked.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});
export const usePost = () => {
  return useSelector((state) => state.posts);
};
export const { postButtonPressed } = postSlice.actions;
export default postSlice.reducer;
