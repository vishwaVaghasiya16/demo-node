import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersAdminThunk,
  getAllPaymentOrdersAdminThunk,
  getOrderThunk,
  getReturnRequestThunk,
  returnOrderRequestThunk,
} from "./thunk";

const initialState = {
  loading: false,
  error: "",
  message: "",
  orders: [],
  data: [],
  pendingOrders: [],
  ordersPaginationData: {},
  returnOrderLoading: false,
  returnRequest: [],
  returnRequestPaginationData: {},
};

const slice = createSlice({
  name: "Orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllOrdersAdminThunk
      .addCase(getAllOrdersAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getAllOrdersAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.pendingOrders = action.payload.data.filter((ele) => !ele.isPaid);
        state.ordersPaginationData = action.payload.pagination;
        state.message = action?.payload?.message;
        state.error = "";
      })
      .addCase(getAllOrdersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // getAllPaymentOrdersAdminThunk
      .addCase(getAllPaymentOrdersAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getAllPaymentOrdersAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.pendingOrders = action.payload.data.filter((ele) => !ele.isPaid);
        state.ordersPaginationData = action.payload.pagination;
        state.message = action?.payload?.message;
        state.error = "";
      })
      .addCase(getAllPaymentOrdersAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // get order
      .addCase(getOrderThunk.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = null;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(getOrderThunk.rejected, (state) => {
        state.loading = false;
        state.message = "";
        state.error = null;
      })
      // return order
      .addCase(returnOrderRequestThunk.pending, (state) => {
        state.returnOrderLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(returnOrderRequestThunk.fulfilled, (state) => {
        state.returnOrderLoading = false;
        state.error = null;
        state.message = "";
      })
      .addCase(returnOrderRequestThunk.rejected, (state) => {
        state.returnOrderLoading = false;
        state.error = null;
        state.message = "";
      })
      // get return order request
      .addCase(getReturnRequestThunk.pending, (state) => {
        state.returnOrderLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(getReturnRequestThunk.fulfilled, (state, action) => {
        state.returnOrderLoading = false;
        state.error = null;
        state.message = "";
        state.returnRequest = action.payload.data;
        state.returnRequestPaginationData = action.payload.pagination;
      })
      .addCase(getReturnRequestThunk.rejected, (state) => {
        state.returnOrderLoading = false;
        state.error = null;
        state.message = "";
      });
  },
});

// export const {} = slice.actions;
export default slice.reducer;
