import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../utils";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/users-social/notifications`,
    });
    return response.data;
  }
);
export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {},
  extraReducers: {
    [getNotifications.fulfilled]: (state, { payload }) => {
      console.log();
      state.notifications = payload.notifications;
    },
  },
});

export default notificationSlice.reducer;
export const useNotifications = () => {
  return useSelector((state) => state.notifications);
};
