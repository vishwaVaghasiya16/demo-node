import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMetalPrice,
  getMetalPrice,
  updateMetalPrice,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const createMetalPriceThunk = createAsyncThunk(
  "createMetalPriceThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createMetalPrice(values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.metalName ||
        error.response?.data?.ratePerGram ||
        error.response?.data?.discountType ||
        error.response?.data?.discountValue ||
        error.response?.data?.discountDescription ||
        error.response?.data?.startAt ||
        error.response?.data?.endAt ||
        error.response?.data?.message;

      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);

export const getMetalPriceThunk = createAsyncThunk(
  "getMetalPriceThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getMetalPrice(query);
      //   toastSuccess(response?.data?.message);
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

export const updateMetalPriceThunk = createAsyncThunk(
  "updateMetalPriceThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateMetalPrice(id, values);
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
