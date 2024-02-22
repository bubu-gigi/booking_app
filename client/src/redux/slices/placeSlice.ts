import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  places: [{
    owner: '',
    _id: '',
    title: '',
    address: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 0,
    price: 0.0,
  }],
}

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.places = [];
      state.places.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNewPlace.pending, () => {
      //console.log("pending");
    }).addCase(addNewPlace.rejected, () => {
      console.log("error");
    }).addCase(addNewPlace.fulfilled, (state, action) => {
      console.log(action.payload);
    }),

      builder.addCase(getUserPlaces.pending, () => {
        //console.log("pending");
      }).addCase(getUserPlaces.rejected, () => {
        console.error("error");
      }).addCase(getUserPlaces.fulfilled, (state, action) => {
        //@ts-ignore
        const places = action.payload?.data as string[];
        state.places = [];
        places.map((place) => {
          //@ts-ignore
          state.places.push(place);
        });
      }),

      builder.addCase(updatePlace.pending, () => {
        //console.log("pending");
      }).addCase(updatePlace.rejected, () => {
        console.error("error");
      }).addCase(updatePlace.fulfilled, (state, action) => {
        state.places = [];
        //@ts-ignore
        state.places.push(action.payload);
      }),

      builder.addCase(getPlaces.pending, () => {
        //console.log("pending");
      }).addCase(getPlaces.rejected, () => {
        console.error("error");
      }).addCase(getPlaces.fulfilled, (state, action) => {
        state.places = [];
        //@ts-ignore
        const { data } = action.payload as string[];
        //@ts-ignore
        state.places = data;
      })

    builder.addCase(getPlace.pending, () => {
      //console.log("pending");
    }).addCase(getPlace.rejected, () => {
      console.error("error");
    }).addCase(getPlace.fulfilled, (state, action) => {
      //@ts-ignore
      const { data } = action.payload;
      state.places.push(data);
    })
  }
});

export const addNewPlace = createAsyncThunk(
  "place/addNewPlace",
  async (place: object) => {
    try {
      const response = axios.post("/places", place);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
);

export const getUserPlaces = createAsyncThunk(
  "places/getUserPlaces",
  async () => {
    try {
      const response = axios.get("/user-places");
      return response;
    } catch (e) {
      console.error(e);
    }
  }
);

export const updatePlace = createAsyncThunk(
  "places/updatePlace",
  async (obj: object) => {
    try {
      //@ts-ignore
      const{ title,address,addedPhotos,description, perks, extraInfo, checkIn, checkOut, maxGuests, price, photosRemoved} = obj;
      //@ts-ignore
      const place = {
        title: title,
        address: address,
        addedPhotos: addedPhotos,
        description: description,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuests,
        price: price,
      }
      //@ts-ignore
      const { data } = await axios.put("/places/" + obj?._id, place);
      //@ts-ignore
      const { data:response } = await axios.post('/remove-photos', photosRemoved);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const getPlaces = createAsyncThunk(
  "places/getPlaces",
  async () => {
    try {
      const response = await axios.get("/places");
      return response;
    } catch (e) {
      console.error(e);
    }
  }
)

export const getPlace = createAsyncThunk(
  "place/getPlace",
  async (id: string) => {
    try {
      const response = await axios.get("/places/" + id);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
)

export const { setPlace } = placeSlice.actions;

export default placeSlice.reducer;