import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductVariantByAdminThunk,
  getAllProductVariantThunk,
  getProductStatusNPriceThunk,
} from "./thunk";

const initialState = {
  data: [],
  variantList: [],
  variantPaginationData: {},
  loading: false,
  addUpdateLoading:false,
  message: "",
  error: null,

  // product status n price

  statusPriceData: [],
  statusPriceLoading: false,
};

const slice = createSlice({
  name: "ProductVariant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProductVariantByAdminThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(
      getAllProductVariantByAdminThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = null;
        state.variantList = action.payload.data;
        state.variantPaginationData = action.payload.pagination;
      }
    );
    builder.addCase(getAllProductVariantByAdminThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getAllProductVariantThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getAllProductVariantThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.data = action.payload.data;
    });
    builder.addCase(getAllProductVariantThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // ======================================================
    //   product status and price based on selected variant
    // ======================================================

    builder.addCase(getProductStatusNPriceThunk.pending, (state) => {
      state.statusPriceLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getProductStatusNPriceThunk.fulfilled, (state, action) => {
      state.statusPriceLoading = false;
      state.message = "";
      state.error = null;
      state.statusPriceData = action.payload.data;
    });
    builder.addCase(getProductStatusNPriceThunk.rejected, (state) => {
      state.statusPriceLoading = false;
      state.message = "";
      state.error = null;
    });
  },
});

export default slice.reducer;
