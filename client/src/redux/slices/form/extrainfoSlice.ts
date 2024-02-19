import { createSlice } from "@reduxjs/toolkit"

interface ExtraInfoState {
  extraInfo: string,
}

const initialState: ExtraInfoState = {
  extraInfo: '',
}

const extrainfoSlice = createSlice({
  name: "extrainfo",
  initialState,
  reducers: {
    setExtraInfo: (state,action) => {
      state.extraInfo = action.payload;
    },
  }
});

export const { setExtraInfo } = extrainfoSlice.actions;

export default extrainfoSlice.reducer;