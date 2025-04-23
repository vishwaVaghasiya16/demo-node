import { createSlice } from "@reduxjs/toolkit";
import {
  createHomeDataThunk,
  deleteSingleDataThunk,
  getHomeDataThunk,
  updateHomeDataThunk,
  updateSingleHomeDataThunk,
} from "./thunk";

const initialState = {
  deleteLoading: false,
  loading: false,
  error: null,
  message: "",
  homeData: {},
  createdHomeData: {},
};

const slice = createSlice({
  name: "CollectionsOverview",
  initialState,
  extraReducers: (builder) => {
    // getHomeDataThunk
    builder.addCase(getHomeDataThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getHomeDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.homeData = action.payload.data;
    });
    builder.addCase(getHomeDataThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // createHomeDataThunk
    builder.addCase(createHomeDataThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(createHomeDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.createdHomeData = action.payload.data;
    });
    builder.addCase(createHomeDataThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // updateHomeDataThunk
    builder.addCase(updateHomeDataThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateHomeDataThunk.fulfilled, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateHomeDataThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // updateSingleHomeDataThunk
    builder.addCase(updateSingleHomeDataThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateSingleHomeDataThunk.fulfilled, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateSingleHomeDataThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // deleteSingleDataThunk
    builder.addCase(deleteSingleDataThunk.pending, (state) => {
      state.deleteLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(deleteSingleDataThunk.fulfilled, (state) => {
      state.deleteLoading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(deleteSingleDataThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.message = "";
      state.error = null;
    });
  },
});

export default slice.reducer;
