
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  menuOpen: true,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    setMenuOpen: (state, action) => {
      state.menuOpen = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, toggleMenu, setMenuOpen } =
  counterSlice.actions;

export default counterSlice.reducer;
