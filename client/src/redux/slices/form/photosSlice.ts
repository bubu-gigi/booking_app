import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PhotosState {
  photos: string[];
}

const initialState: PhotosState = {
  photos: [],
}

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setAddedPhotos: (state, action) => {
      state.photos = action.payload;
    },
    removePhotoRedux: (state, action) => {
      const index = state.photos.indexOf(action.payload);
      state.photos.splice(index, 1);
    },
    putNewPhotos: (state, action) => {
      const data = state.photos.concat(action.payload);
      state.photos = data;
      console.log(data);
      console.log(state.photos);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadPhotoAsync.pending, () => {
      //console.log("pending");
    }).addCase(uploadPhotoAsync.rejected, () => {
      console.error("error");
    }).addCase(uploadPhotoAsync.fulfilled, (state, action) => {
      const photos = action.payload as string[];
      for(let i = 0; i < photos.length; i++) {
        let photo = photos[i];
        const photoSplitted = photo.split('/');
        state.photos.push(photoSplitted[1]);
      }
    }),
    builder.addCase(getPhotosAsync.pending, () => {
      //console.log("pending");
    }).addCase(getPhotosAsync.rejected, () => {
      console.error("error");
    }).addCase(getPhotosAsync.fulfilled, (state, action) => {
      const photos = action.payload as string[];
      for(let i=0; i < photos.length; i++) {
        state.photos.push(photos[i]);
      }
    })
  }
    /*builder.addCase(removePhotoAsync.pending, () => {
      //console.log("pending");
    }).addCase(removePhotoAsync.rejected, () => {
      console.error("error");
    }).addCase(removePhotoAsync.fulfilled, (state, action) => {
      state.photos.filter((photo) => photo != action.payload);
      console.log(state.photos);
    })*/
});

export const uploadPhotoAsync = createAsyncThunk(
  "photos/uploadPhoto",
  async(photos: FormData) => {
    try {
      const {data} = await axios.post("/upload", photos, { headers: {'Content-Type':'multipart/form-data'} });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const getPhotosAsync = createAsyncThunk(
  "photos/getPhotos",
  async() => {
    try {
      const {data} = await axios.get("/set-photos");
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

/*export const removePhotoAsync = createAsyncThunk(
  'photos/removePhoto',
  async(filename: string) => {
    try {
      const {data} = await axios.post("/remove-photo", filename);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
)*/

export const { setAddedPhotos,removePhotoRedux,putNewPhotos } = photosSlice.actions;

export default photosSlice.reducer;