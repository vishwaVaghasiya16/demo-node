import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createHomeData,
  deleteSingleData,
  getHomeData,
  updateHomeData,
  updateSingleHomeData,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getHomeDataThunk = createAsyncThunk(
  "homeThunk",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getHomeData();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const createHomeDataThunk = createAsyncThunk(
  "createHomeDataThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createHomeData(data);
      // toastSuccess(response.data.message);
      toastSuccess("Section created successfully");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.type ||
        error?.response?.data?.files ||
        error?.response?.data?.redirectUrl ||
        error?.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const updateHomeDataThunk = createAsyncThunk(
  "updateHomeDataThunk",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateHomeData(id, data);
      // toastSuccess(response.data.message);
      toastSuccess("Section created successfully");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.type ||
        error?.response?.data?.files ||
        error?.response?.data?.redirectUrl ||
        error?.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const updateSingleHomeDataThunk = createAsyncThunk(
  "updateSingleHomeDataThunk",
  async ({ id, subId, data }, { rejectWithValue }) => {
    try {
      const response = await updateSingleHomeData(id, subId, data);
      toastSuccess(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.type ||
        error?.response?.data?.files ||
        error?.response?.data?.redirectUrl ||
        error?.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const deleteSingleDataThunk = createAsyncThunk(
  "deleteSingleDataThunk",
  async ({ id, subId }, { rejectWithValue }) => {
    try {
      const response = await deleteSingleData(id, subId);
      toastSuccess(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.type ||
        error?.response?.data?.files ||
        error?.response?.data?.redirectUrl ||
        error?.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
