import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import {
  createVideoCallSchedule,
  getVideoCallSchedule,
  updateVideoCallSchedule,
} from "../../helpers/backend_helper";

export const createVideoCallScheduleThunk = createAsyncThunk(
  "createVideoCallScheduleThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createVideoCallSchedule(values);
      toastSuccess(response?.data?.message);
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

export const getVideoCallScheduleThunk = createAsyncThunk(
  "getVideoCallScheduleThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getVideoCallSchedule(values);
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

export const updateVideoCallScheduleThunk = createAsyncThunk(
  "updateVideoCallScheduleThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateVideoCallSchedule(id, values);
      toastSuccess(response?.data?.message);
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
