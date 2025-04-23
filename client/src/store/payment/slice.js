import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderPaymentThunk,
  getAllOrdersPaymentThunk,
  razorpayPaymentCaptureThunk,
  refundPaymentThunk,
} from "./thunk";

const initialState = {
  loading: false,
  paymentCaptureLoading: true,
  refundPaymentLoading: false,
  error: "",
  message: "",
  success: false,
  paymentOrders: {},
  paymentList: [],
  paymentCaptureData: {},
  paymentsPaginationData: {},
};

const slice = createSlice({
  name: "Payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createOrderPaymentThunk
    builder.addCase(createOrderPaymentThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(createOrderPaymentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentOrders = action.payload.data;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(createOrderPaymentThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // getAllOrdersPaymentThunk
    builder.addCase(getAllOrdersPaymentThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getAllOrdersPaymentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentList = action.payload.data;
      state.paymentsPaginationData = action.payload.pagination;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(getAllOrdersPaymentThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // razorpayPaymentCaptureThunk
    builder.addCase(razorpayPaymentCaptureThunk.pending, (state) => {
      state.paymentCaptureLoading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(razorpayPaymentCaptureThunk.fulfilled, (state, action) => {
      state.paymentCaptureLoading = false;
      state.paymentCaptureData = action.payload.data;
      state.message = action?.payload?.message;
      state.success = true;
      state.error = "";
    });
    builder.addCase(razorpayPaymentCaptureThunk.rejected, (state, action) => {
      state.paymentCaptureLoading = false;
      state.error = action?.payload?.message;
      state.paymentCaptureData = {};
      state.success = false;
      state.message = "";
    });
    // refundPaymentThunk
    builder.addCase(refundPaymentThunk.pending, (state) => {
      state.refundPaymentLoading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(refundPaymentThunk.fulfilled, (state, action) => {
      state.refundPaymentLoading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(refundPaymentThunk.rejected, (state, action) => {
      state.refundPaymentLoading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
  },
});

// export const {} = slice.actions;
export default slice.reducer;
