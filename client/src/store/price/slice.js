import { createSlice } from "@reduxjs/toolkit";
import {
  createMetalPriceThunk,
  getMetalPriceThunk,
  updateMetalPriceThunk,
} from "./thunk";

const initialState = {
  loading: false,
  error: "",
  message: "",
  priceData: [],
  singlePriceData: {},
};

const slice = createSlice({
  name: "Price",
  initialState,
  reducers: {
    setSinglePriceData: (state, action) => {
      state.singlePriceData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // createMetalPriceThunk
    builder.addCase(createMetalPriceThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(createMetalPriceThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(createMetalPriceThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // getMetalPriceThunk
    builder.addCase(getMetalPriceThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getMetalPriceThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.priceData = action.payload.data;
      state.error = "";
    });
    builder.addCase(getMetalPriceThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // updateMetalPriceThunk
    builder.addCase(updateMetalPriceThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(updateMetalPriceThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(updateMetalPriceThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
  },
});

export const { setSinglePriceData } = slice.actions;
export default slice.reducer;
