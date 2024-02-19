import { createSlice } from "@reduxjs/toolkit"

interface DescriptionState {
  description: string,
}

const initialState: DescriptionState = {
  description: '',
}

const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    setDescription: (state,action) => {
      state.description = action.payload;
    }
  }
});

export const { setDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;