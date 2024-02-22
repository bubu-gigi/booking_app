import { createSlice } from "@reduxjs/toolkit"

interface PhotosRemovedState {
  photosRemoved: string[],
}

const initialState: PhotosRemovedState = {
  photosRemoved: [],
}

const photosRemovedSlice = createSlice({
  name: "photosRemoved",
  initialState,
  reducers: {
    addPhoto: (state,action) => {
      state.photosRemoved.push(action.payload);
    },
    removePhoto: (state,action) => {
      const index = state.photosRemoved.indexOf(action.payload);
      state.photosRemoved.splice(index, 1);
    },
  },
});

export const { addPhoto, removePhoto } = photosRemovedSlice.actions;

export default photosRemovedSlice.reducer;