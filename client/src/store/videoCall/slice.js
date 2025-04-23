import { createSlice } from "@reduxjs/toolkit";
import {
  createVideoCallScheduleThunk,
  getVideoCallScheduleThunk,
} from "./thunk";

const initialState = {
  data: {},
  videoCallSchedulesList: [],
  videoCallSchedulesPaginationData: {},
  loading: false,
  message: "",
  error: null,
};

const slice = createSlice({
  name: "VideoCall",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVideoCallScheduleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(createVideoCallScheduleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(createVideoCallScheduleThunk.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getVideoCallScheduleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(getVideoCallScheduleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.videoCallSchedulesList = action.payload.data;
        state.videoCallSchedulesPaginationData = action.payload.pagination;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getVideoCallScheduleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.message = "";
      });
  },
});

export default slice.reducer;
