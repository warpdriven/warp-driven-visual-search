// Redux Toolkit Imports
import { createSlice } from "@reduxjs/toolkit";

export const sliceTheme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    reset(s) {
      Object.assign(s, initialState());
    },
  },
});

function initialState() {
  return {
    isDark: false,
  };
}
