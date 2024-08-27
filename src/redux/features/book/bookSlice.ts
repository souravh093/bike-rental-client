import { createSlice } from "@reduxjs/toolkit";

export type TBookInitialState = {
  advancedPayment?: number;
  bikeId: string;
  startTime: string;
};

const initialState: TBookInitialState = {
  advancedPayment: 100,
  bikeId: "",
  startTime: new Date().toISOString(),
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setInitialBook: (state, action) => {
      console.log(action.payload);
      state = action.payload;
    },
    removeInitialBook: (state) => {
      state.advancedPayment = 100;
      state.bikeId = "";
      state.startTime = new Date().toISOString();
    },
  },
});

export const { setInitialBook } = bookSlice.actions;
export default bookSlice.reducer;
