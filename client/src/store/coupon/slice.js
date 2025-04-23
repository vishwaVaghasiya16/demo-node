import { createSlice } from "@reduxjs/toolkit";
import {
  createCouponThunk,
  getCouponByAdminThunk,
  getCouponThunk,
  updateCouponThunk,
} from "./thunk";

const initialState = {
  data: [],
  couponList: [],
  singleCouponDetails: {},
  couponPaginationData: {},
  dataTableLoading: false,
  loading: false,
  message: "",
  error: null,
};

const slice = createSlice({
  name: "Coupon",
  initialState,
  reducers: {
    setSingleCouponDetails: (state, action) => {
      state.singleCouponDetails = action.payload;
    },
  },
  // getCouponThunk
  extraReducers: (builder) => {
    builder.addCase(getCouponThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getCouponThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.data = action.payload.data;
    });
    builder.addCase(getCouponThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // getCouponByAdminThunk
    builder.addCase(getCouponByAdminThunk.pending, (state) => {
      state.dataTableLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getCouponByAdminThunk.fulfilled, (state, action) => {
      state.dataTableLoading = false;
      state.message = "";
      state.couponList = action.payload.data;
      state.couponPaginationData = action.payload.pagination;
      state.error = null;
    });
    builder.addCase(getCouponByAdminThunk.rejected, (state) => {
      state.dataTableLoading = false;
      state.message = "";
      state.error = null;
    });
    // createCouponThunk
    builder.addCase(createCouponThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(createCouponThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(createCouponThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // updateCouponThunk
    builder.addCase(updateCouponThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateCouponThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(updateCouponThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
  },
});

export const { setSingleCouponDetails } = slice.actions;
export default slice.reducer;
