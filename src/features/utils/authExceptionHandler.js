import axios from "axios";
import {logOutButtonClicked} from "../authentication/authenticationSlice";

export function setupAuthExceptionHandler(dispatch) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          dispatch(logOutButtonClicked());
         
        }
        return Promise.reject(error);
      }
    );
  }