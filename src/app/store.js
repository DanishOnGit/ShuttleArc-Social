import { configureStore } from '@reduxjs/toolkit';
import postSliceReducer from "../features/posts/postSlice"
import authSliceReducer from "../features/authentication/authenticationSlice";
import profileSliceReducer from '../features/profile/profileSlice';
// import { useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
   posts:postSliceReducer,
   auth:authSliceReducer,
   profile:profileSliceReducer
  },
});


