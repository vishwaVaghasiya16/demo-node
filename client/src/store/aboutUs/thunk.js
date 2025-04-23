import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { getAboutUsData } from "../../helpers/backend_helper";

export const getAboutUsThunk = createAsyncThunk(
  "getAboutUsThunk",
  async (value, { rejectWithValue }) => {
    try {
      const response = await getAboutUsData(value);
      // toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
