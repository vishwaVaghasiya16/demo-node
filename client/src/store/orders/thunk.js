import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddress,
  getAllOrders,
  getAllPaymentOrders,
  getOrder,
  getReturnRequest,
  returnOrderRequest,
  updateOrderStatus,
  updateReturnRequest,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { getCartThunk } from "../actions";

export const getAllPaymentOrdersAdminThunk = createAsyncThunk(
  "getAllPaymentOrdersAdminThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getAllPaymentOrders(values);
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

export const getAllOrdersAdminThunk = createAsyncThunk(
  "getAllOrdersAdminThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getAllOrders(values);
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

export const getOrderThunk = createAsyncThunk(
  "getOrderThunk",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getOrder(query);
      return data;
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

export const addAddressThunk = createAsyncThunk(
  "addAddressThunk",
  async ({ id, values }, { rejectWithValue, dispatch }) => {
    try {
      const response = await addAddress(id, values);
      toastSuccess(response?.data?.message);
      await dispatch(getCartThunk());
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.shippingAddress ||
        error.response?.data?.billingAddress ||
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

export const updateOrderStatusThunk = createAsyncThunk(
  "updateOrderStatusThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(id, values);
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

export const returnOrderRequestThunk = createAsyncThunk(
  "returnOrderRequestThunk",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await returnOrderRequest(value);
      toastSuccess(data?.message);
      return data;
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

export const getReturnRequestThunk = createAsyncThunk(
  "getReturnRequestThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getReturnRequest(values);
      return data;
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

export const updateReturnRequestThunk = createAsyncThunk(
  "updateReturnRequestThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateReturnRequest(id, values);
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
