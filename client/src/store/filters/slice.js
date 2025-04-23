import { createSlice } from "@reduxjs/toolkit";
import {
  createFilterThunk,
  deleteFilterThunk,
  deleteSingleFilterThunk,
  getFilterThunk,
  updateFilterThunk,
  updateSingleFilterThunk,
} from "./thunk";

const isDarkModeLocal = JSON.parse(localStorage.getItem("isDarkMode"));

const initialState = {
  // Features Filters
  isToggle: false,
  isDarkMode: isDarkModeLocal || false,

  // Category Filters Page
  deleteLoading: false,
  dataLoading: false,
  loading: false,
  error: "",
  message: "",
  filters: [],
};

const slice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    setFilterValue: (state, action) => {
      state.filters = action.payload;
    },
    setToggleValue: (state, action) => {
      state.isToggle = action.payload;
    },
    setLightDarkMode: (state) => {
      if (state.isDarkMode) {
        state.isDarkMode = false;
        localStorage.setItem("isDarkMode", JSON.stringify(false));
      } else {
        state.isDarkMode = true;
        localStorage.setItem("isDarkMode", JSON.stringify(true));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // createFilterThunk
      .addCase(createFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(createFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message;
        state.error = "";
      })
      .addCase(createFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // getFilterThunk
      .addCase(getFilterThunk.pending, (state) => {
        state.dataLoading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getFilterThunk.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.message = action.payload.message;
        state.filters = action.payload.data;
        state.error = "";
      })
      .addCase(getFilterThunk.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // deleteFilterThunk
      .addCase(deleteFilterThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(deleteFilterThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(deleteFilterThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // deleteSingleFilterThunk
      .addCase(deleteSingleFilterThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(deleteSingleFilterThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(deleteSingleFilterThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // updateFilterThunk
      .addCase(updateFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(updateFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(updateFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.message = "";
      })
      // updateSingleFilterThunk
      .addCase(updateSingleFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(updateSingleFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(updateSingleFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.message = "";
      });
  },
});

export const { setToggleValue, setLightDarkMode, setFilterValue } =
  slice.actions;
export default slice.reducer;
