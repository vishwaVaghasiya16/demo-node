import { createSlice } from "@reduxjs/toolkit";
import { createTaxThunk, getTaxThunk, updateTaxThunk } from "./thunk";

const initialState = {
  loading: false,
  error: "",
  message: "",
  taxData: {},
};

const slice = createSlice({
  name: "Tax",
  initialState,
  extraReducers: (builder) => {
    // createTaxThunk
    builder.addCase(createTaxThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(createTaxThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(createTaxThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // getTaxThunk
    builder.addCase(getTaxThunk.pending, (state) => {
      // state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getTaxThunk.fulfilled, (state, action) => {
      // state.loading = false;
      state.message = action.payload.message;
      if (action.payload.data.length > 0) {
        state.taxData = action.payload.data[0];
      }
      state.error = "";
    });
    builder.addCase(getTaxThunk.rejected, (state, action) => {
      // state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // updateTaxThunk
    builder.addCase(updateTaxThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(updateTaxThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(updateTaxThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
  },
});

export default slice.reducer;
