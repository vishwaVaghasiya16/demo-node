import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import {
  postContactUs,
  getContactUs,
  deleteContactUs,
} from "../../helpers/backend_helper";

export const postContactUsThunk = createAsyncThunk(
  "postContactUsThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await postContactUs(values);
      toastSuccess("Thank you for contacting us");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.name ||
        error.response?.data?.email ||
        error.response?.data?.phone ||
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

export const getContactUsThunk = createAsyncThunk(
  "getContactUsThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getContactUs(values);
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

export const getContactUsOnClickThunk = createAsyncThunk(
  "getContactUsOnClickThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getContactUs(values);
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

export const deleteContactUsThunk = createAsyncThunk(
  "deleteContactUsThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteContactUs(id);
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
