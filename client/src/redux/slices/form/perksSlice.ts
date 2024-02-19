import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PerksState {
  perks: string[];
}

const initialState: PerksState = {
  perks: [],
};

const perksSlice = createSlice({
  name: "perks",
  initialState,
  reducers: {
    addPerk: (state,value: PayloadAction<string>) => {
      state.perks.push(value.payload);
    },
    removePerk: (state,value: PayloadAction<string>) => {
      const index = state.perks.indexOf(value.payload);
      state.perks.splice(index, 1);
    },
  }
});

export const { addPerk, removePerk } = perksSlice.actions;

export default perksSlice.reducer;
