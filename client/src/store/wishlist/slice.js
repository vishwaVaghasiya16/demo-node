import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlistThunk,
  moveWishlistToCartThunk,
  postWishlistThunk,
} from "./thunk";

const initialState = {
  data: [],
  activeIds: [],
  loading: false,
  error: null,
  message: "",
  // move wishlist to cart
  moveLoading: false,
};

const slice = createSlice({
  name: "Wishlist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getWishlistThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(getWishlistThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.data = action.payload.data;
      const productIds =
        action.payload.data?.[0]?.products?.map((item) => item._id) || [];
      const variantIds =
        action.payload.data?.[0]?.variants?.map((item) => item._id) || [];
      state.activeIds = [...productIds, ...variantIds] || [];
      // state.activeIds = action.payload.data[0]?.variants?.map((item)=>item._id)
    });
    builder.addCase(getWishlistThunk.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    });
    builder.addCase(postWishlistThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(postWishlistThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      const uniqueId = state.activeIds.includes(action.payload.id);
      if (uniqueId) {
        state.activeIds = state.activeIds.filter(
          (item) => item !== action.payload.id
        );
        state.data[0].products = state.data[0].products.filter(
          (item) => item._id !== action.payload.id
        );
        state.data[0].variants = state.data[0].variants.filter(
          (item) => item._id !== action.payload.id
        );
      } else {
        state.activeIds.push(action.payload.id);
      }
    });
    builder.addCase(postWishlistThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // move wishlist to cart
    builder.addCase(moveWishlistToCartThunk.pending, (state) => {
      state.moveLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(moveWishlistToCartThunk.fulfilled, (state, action) => {
      state.moveLoading = false;
      state.message = "";
      state.error = null;
      state.activeIds = state.activeIds.filter(
        (item) => item !== action.payload.id
      );
      state.data[0].products = state.data[0]?.products.filter(
        (item) => item._id !== action.payload.id
      );
      state.data[0].variants = state.data[0]?.variants.filter(
        (item) => item._id !== action.payload.id
      );
    });
    builder.addCase(moveWishlistToCartThunk.rejected, (state) => {
      state.moveLoading = false;
      state.message = "";
      state.error = null;
    });
  },
});

export default slice.reducer;
