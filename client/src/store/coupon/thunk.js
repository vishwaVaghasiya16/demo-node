import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCouponByAdmin,
  updateCoupon,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getCouponThunk = createAsyncThunk(
  "getCouponThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCoupon();
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

export const getCouponByAdminThunk = createAsyncThunk(
  "getCouponByAdminThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getCouponByAdmin(query);
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

export const createCouponThunk = createAsyncThunk(
  "createCouponThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCoupon(data);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.code ||
        error.response?.data?.discountType ||
        error.response?.data?.discountValue ||
        error.response?.data?.description ||
        error.response?.data?.validAmount ||
        error.response?.data?.endDate ||
        error.response?.data?.isActive ||
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

export const updateCouponThunk = createAsyncThunk(
  "updateCouponThunk",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateCoupon(id, data);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.code ||
        error.response?.data?.discountType ||
        error.response?.data?.discountValue ||
        error.response?.data?.description ||
        error.response?.data?.validAmount ||
        error.response?.data?.endDate ||
        error.response?.data?.isActive ||
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

export const deleteCouponThunk = createAsyncThunk(
  "deleteCouponThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCoupon(id);
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
