import { createSlice } from "@reduxjs/toolkit";
import { getDashboardThunk } from "./thunk";

const initialState = {
  data: {},
  loading: false,
  message: "",
  error: null,
};

const slice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setSingleCouponDetails: (state, action) => {
      state.singleCouponDetails = action.payload;
    },
  },
  // getDashboardThunk
  extraReducers: (builder) => {
    builder.addCase(getDashboardThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getDashboardThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.data = action.payload.data;
    });
    builder.addCase(getDashboardThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
  },
});

export const { setSingleCouponDetails } = slice.actions;
export default slice.reducer;
