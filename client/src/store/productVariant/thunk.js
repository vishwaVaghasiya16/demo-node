import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProductVariant,
  getAllProductVariantByAdmin,
  getProductStatusNPrice,
  getVariantDetails,
  postVariant,
  updateVariant,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getAllProductVariantThunk = createAsyncThunk(
  "getProductVariant",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getAllProductVariant(id);
      return data;
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

export const getAllProductVariantByAdminThunk = createAsyncThunk(
  "getAllProductVariantByAdminThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getAllProductVariantByAdmin(values);
      // toastSuccess(data.message);
      return data;
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

export const getProductStatusNPriceThunk = createAsyncThunk(
  "getProductStatusNPrice",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await getProductStatusNPrice(value);
      return data;
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

export const getVariantDetailsThunk = createAsyncThunk(
  "getProductVariantDetails",
  async ({ id = "", query = {} }, { rejectWithValue }) => {
    try {
      const { data } = await getVariantDetails(id, query);
      return data;
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

export const postVariantThunk = createAsyncThunk(
  "postVariantDetails",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await postVariant(value);
      toastSuccess(data.message);
      return data;
    } catch (error) {
      let errorMessage = "error";
      // Toast the error message
      if (error.response?.data) {
        const errorData = error.response.data;
        delete errorData.message;
        errorMessage =
          Object.values(errorData).find((value) => typeof value == "string") ||
          error.response.data.message ||
          error.message;
        errorMessage && toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const updateVariantThunk = createAsyncThunk(
  "updateVariantThunk",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const { data } = await updateVariant(id, value);
      toastSuccess(data.message);
      return data;
    } catch (error) {
      let errorMessage;
      // Toast the error message
      if (error.response?.data) {
        const errorData = error.response.data;
        delete errorData.message;
        errorMessage =
          Object.values(errorData).find((value) => typeof value == "string") ||
          error.response.data.message;
      }
      toastError(errorMessage || "error");
      // Reject with error message
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
