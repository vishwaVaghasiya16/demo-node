import { createSlice } from "@reduxjs/toolkit";
import { getBackendEnums } from "./thunk";

const initialState = {
  loading: false,
  error: "",
  message: "",
  enumsData: {},
};

const slice = createSlice({
  name: "EnumsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBackendEnums.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getBackendEnums.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message;
        state.enumsData = action.payload.data;
        state.error = "";
      })
      .addCase(getBackendEnums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });
  },
});

export default slice.reducer;
