import { createSlice } from "@reduxjs/toolkit"

interface DataState {
  checkIn: string,
  checkOut: string,
  maxGuests: number,
}

const initialState: DataState = {
  checkIn: '',
  checkOut: '',
  maxGuests: 0,
}

const checkInOutGuestsSlice = createSlice({
  name: "checkInOutGuests",
  initialState,
  reducers: {
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    setMaxGuests: (state, action) => {
      state.maxGuests = action.payload;
    },
  }
});

export const { setCheckIn, setCheckOut, setMaxGuests } = checkInOutGuestsSlice.actions;

export default checkInOutGuestsSlice.reducer;