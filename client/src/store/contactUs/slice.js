import { createSlice } from "@reduxjs/toolkit";
import {
  deleteContactUsThunk,
  getContactUsOnClickThunk,
  getContactUsThunk,
  postContactUsThunk,
} from "./thunk";

const initialState = {
  contactUsList: [],
};

const slice = createSlice({
  name: "ContactUs",
  initialState,
  extraReducers: (builder) => {
    builder
      // postContactUsThunk
      .addCase(postContactUsThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(postContactUsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message;
        state.error = "";
      })
      .addCase(postContactUsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // getContactUsThunk
      .addCase(getContactUsOnClickThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getContactUsOnClickThunk.fulfilled, (state, action) => {
        const newData = action.payload.data.filter(
          (newProduct) =>
            !state.contactUsList.some(
              (existingData) => existingData._id === newProduct._id
            )
        );
        state.contactUsList.push(...newData);
        state.loading = false;
        state.message = action?.payload?.message;
        state.contactUsPaginationData = action.payload.pagination;
        state.error = "";
      })
      .addCase(getContactUsOnClickThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // getContactUsThunk
      .addCase(getContactUsThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getContactUsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUsList = action?.payload?.data;
        state.message = action?.payload?.message;
        state.contactUsPaginationData = action.payload.pagination;
        state.error = "";
      })
      .addCase(getContactUsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // deleteContactUsThunk
      .addCase(deleteContactUsThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(deleteContactUsThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.contactUsList = action?.payload?.data;
        state.message = action?.payload?.message;
        // state.contactUsPaginationData = action.payload.pagination;
        state.error = "";
      })
      .addCase(deleteContactUsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });
  },
});

export default slice.reducer;
