import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  createSubCategory,
  deleteSubCategory,
  editCategory,
  editSubCategory,
  getCategory,
  getSubCategory,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const postCategoryThunk = createAsyncThunk(
  "postCategoryThunk",
  async ({ value } = {}, { rejectWithValue }) => {
    try {
      const response = await createCategory(value);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.type ||
        error.response?.data?.files ||
        error.response?.data?.message;
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

export const getCategoryThunk = createAsyncThunk(
  "getCategoryThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getCategory(query);
      //   toastSuccess(response?.data?.message);
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

export const editCategoryThunk = createAsyncThunk(
  "editCategoryThunk",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const { data } = await editCategory(id, value);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.type ||
        error.response?.data?.files ||
        error.response?.data?.message;
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const postSubCategoryThunk = createAsyncThunk(
  "postSubCategoryThunk",
  async ({ value }, { rejectWithValue }) => {
    try {
      const { data } = await createSubCategory(value);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.type ||
        error.response?.data?.category ||
        error.response?.data?.files ||
        error.response?.data?.message;
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

export const getSubCategoryThunk = createAsyncThunk(
  "getSubCategoryData",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getSubCategory(query);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const deleteSubCategoryThunk = createAsyncThunk(
  "deleteSubCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = deleteSubCategory(id);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const editSubCategoryThunk = createAsyncThunk(
  "editSubCategory",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const { data } = await editSubCategory(id, value);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.type ||
        error.response?.data?.category ||
        error.response?.data?.files ||
        error.response?.data?.message;
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
