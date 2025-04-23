import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getDashboardThunk = createAsyncThunk(
  "getDashboardThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getDashboard(query);
      // toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
