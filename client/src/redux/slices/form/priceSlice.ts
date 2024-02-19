import { createSlice } from "@reduxjs/toolkit"

interface PriceData {
  price: number,
}

const initialState: PriceData = {
  price: 0.0,
}

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice: (state,action) => {
      state.price = action.payload;
    }
  }
});

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;