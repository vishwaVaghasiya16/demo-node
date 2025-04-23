import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import {
  getProductByAdmin,
  getProducts,
  postProduct,
  searchProduct,
  updateProduct,
} from "../../helpers/backend_helper";

export const getProductsOnScrollThunk = createAsyncThunk(
  "getProductsOnScrollThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getProducts(values);
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

export const getProductsThunk = createAsyncThunk(
  "getProductsThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getProducts(values);
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

export const getProductByAdminThunk = createAsyncThunk(
  "getProductByAdminThunk",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getProductByAdmin(query);
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

export const deleteProductThunk = createAsyncThunk(
  "deleteProductThunk",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = data;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchProductThunk = createAsyncThunk(
  "searchProductThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await searchProduct(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchProductPaginationThunk = createAsyncThunk(
  "searchProductPaginationThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await searchProduct(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);
