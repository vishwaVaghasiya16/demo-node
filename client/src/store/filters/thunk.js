import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFilter,
  deleteFilter,
  deleteSingleFilter,
  getFilter,
  updateFilter,
  updateSingleFilter,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const createFilterThunk = createAsyncThunk(
  "createFilterThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createFilter(values);
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

export const getFilterThunk = createAsyncThunk(
  "getFilterThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getFilter(query);
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

export const deleteFilterThunk = createAsyncThunk(
  "deleteFilterThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteFilter(id);
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

export const deleteSingleFilterThunk = createAsyncThunk(
  "deleteSingleFilterThunk",
  async ({ mainId, id }, { rejectWithValue }) => {
    try {
      const response = await deleteSingleFilter(mainId, id);
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

export const updateFilterThunk = createAsyncThunk(
  "updateFilterThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateFilter(id, values);
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

export const updateSingleFilterThunk = createAsyncThunk(
  "updateSingleFilterThunk",
  async ({ mainId, id, values }, { rejectWithValue }) => {
    try {
      const response = await updateSingleFilter(mainId, id, values);
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
