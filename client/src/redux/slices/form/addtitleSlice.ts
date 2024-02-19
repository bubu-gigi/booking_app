import { createSlice } from "@reduxjs/toolkit"

interface DataState {
  address: string,
  title: string,
}

const initialState: DataState = {
  address: '',
  title: '',
}

const addtitleSlice = createSlice({
  name: "addtitle",
  initialState,
  reducers: {
    setAddress: (state,action) => {
      state.address = action.payload;
    },
    setTitle: (state,action) => {
      state.title = action.payload;
    },
  },
});

export const { setAddress, setTitle } = addtitleSlice.actions;

export default addtitleSlice.reducer;