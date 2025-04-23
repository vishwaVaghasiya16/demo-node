import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTax, getTax, updateTax } from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const createTaxThunk = createAsyncThunk(
  "createTaxThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createTax(values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.taxValue || error.response?.data?.message;

      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);

export const getTaxThunk = createAsyncThunk(
  "getTaxThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getTax(query);
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

export const updateTaxThunk = createAsyncThunk(
  "updateTaxThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateTax(id, values);
      toastSuccess(response?.data?.message);
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
