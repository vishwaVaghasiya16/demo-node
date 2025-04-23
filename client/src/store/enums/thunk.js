import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { backendEnums } from "../../helpers/backend_helper";

export const getBackendEnums = createAsyncThunk(
  "getBackendEnums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await backendEnums();
      //   toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error response
      return rejectWithValue(errorMessage);
    }
  }
);
