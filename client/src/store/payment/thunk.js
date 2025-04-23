import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderPayment,
  getAllOrdersPayment,
  razorpayPaymentCapture,
  refundPayment,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const createOrderPaymentThunk = createAsyncThunk(
  "createOrderPaymentThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await createOrderPayment(values);
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

export const getAllOrdersPaymentThunk = createAsyncThunk(
  "getAllOrdersPaymentThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersPayment(values);
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

export const razorpayPaymentCaptureThunk = createAsyncThunk(
  "razorpayPaymentCaptureThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await razorpayPaymentCapture(values);
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

export const refundPaymentThunk = createAsyncThunk(
  "refundPaymentThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await refundPayment(values);
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
