import { createSlice } from "@reduxjs/toolkit";
import {
  editCategoryThunk,
  editSubCategoryThunk,
  getCategoryThunk,
  getSubCategoryThunk,
  postCategoryThunk,
  postSubCategoryThunk,
} from "./thunk";

const initialState = {
  categoryData: [],
  subCategoryData: [],
  dataLoading: false,
  loading: false,
  error: null,
  message: "",
  isCategoryEdit: false,
  isSubCategoryEdit: false,
};

const slice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setIsCategoryEdit: (state, action) => {
      state.isCategoryEdit = action.payload;
    },
    setIsSubCategoryEdit: (state, action) => {
      state.isSubCategoryEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // post category
      .addCase(postCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(postCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.categoryData.unshift(action.payload.data);
      })
      .addCase(postCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // get category
      .addCase(getCategoryThunk.pending, (state) => {
        state.dataLoading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.categoryData = action.payload.data;
        state.error = "";
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
        state.message = "";
      })
      // edit category
      .addCase(editCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(editCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = state.categoryData.map((item) => {
          if (item._id == action.payload.data._id) {
            return action.payload.data;
          }
          return item;
        });
        state.error = "";
        state.message = "";
      })
      .addCase(editCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // get sub category
      .addCase(getSubCategoryThunk.pending, (state, action) => {
        state.dataLoading = true;
        state.error = action.payload;
        state.message = "";
      })
      .addCase(getSubCategoryThunk.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
        state.message = "";
        state.subCategoryData = action.payload.data;
      })
      .addCase(getSubCategoryThunk.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
        state.message = "";
      })
      // post sub category
      .addCase(postSubCategoryThunk.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
        state.message = "";
      })
      .addCase(postSubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
        state.subCategoryData.unshift(action.payload.data);
      })
      .addCase(postSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      })
      // edit sub category
      .addCase(editSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(editSubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryData = state.subCategoryData.map((item) => {
          if (item._id == action.payload.data._id) {
            return action.payload.data;
          }
          return item;
        });
        state.error = "";
        state.message = "";
      })
      .addCase(editSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });
  },
});

export const { setIsCategoryEdit, setIsSubCategoryEdit } = slice.actions;
export default slice.reducer;
