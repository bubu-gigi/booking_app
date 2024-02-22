import { createSlice } from "@reduxjs/toolkit"

interface RedirectState {
  redirect: boolean,
}

const initialState: RedirectState = {
  redirect: false,
}

const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setRedirectTrue: (state) => {
      state.redirect = true;
    },
    setRedirectFalse: (state) => {
      state.redirect = false;
    },
  },
});

export const { setRedirectTrue, setRedirectFalse } = redirectSlice.actions;

export default redirectSlice.reducer;