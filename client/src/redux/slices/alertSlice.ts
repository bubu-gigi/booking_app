import { createSlice } from "@reduxjs/toolkit";

interface AlertData {
  showTop: boolean;
  showUsername: boolean;
  showEmail: boolean;
  showPassword: boolean;
}

const initialState: AlertData = {
  showTop: false,
  showUsername: false,
  showEmail: false,
  showPassword: false,
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowTopTrue: (state) => {
      state.showTop = true;
    },
    setShowTopFalse: (state) => {
      state.showTop = false;
    },
    setShowUsernameTrue: (state) => {
      state.showUsername = true;
    },
    setShowUsernameFalse: (state) => {
      state.showUsername = false;
    },
    setShowEmailTrue: (state) => {
      state.showEmail = true;
    },
    setShowEmailFalse: (state) => {
      state.showEmail= false;
    },
    setShowPasswordTrue: (state) => {
      state.showPassword = true;
    },
    setShowPasswordFalse: (state) => {
      state.showPassword= false;
    },
  },
});

export const { setShowTopTrue, setShowTopFalse,setShowEmailFalse,setShowEmailTrue,setShowPasswordTrue,setShowPasswordFalse,setShowUsernameTrue,setShowUsernameFalse } = alertSlice.actions;

export default alertSlice.reducer;
