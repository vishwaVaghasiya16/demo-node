import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  otpVerification,
  otpResend as fetchOtpResend,
  signInUser,
  signInWithGoogle as fetchSignInWithGoogle,
  verifyToken as fetchVerifyToken,
  signUpUser,
  forgetPassword as fetchForgetPassword,
  resetPassword as fetchResetPassword,
  changeUserDetails,
  getCustomers,
  updateUserRoleAndActive,
  addStaff,
  getAllStaff,
  getStaffDetails,
  getCustomersDetails,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { getToken } from "../../helpers/api_helper";
import { logOut } from "./slice";

export const signUp = createAsyncThunk(
  "signUp",
  async (values, { rejectWithValue }) => {
    try {
      const response = await signUpUser(values);
      toastSuccess(response?.data?.message);
      return { ...response.data, status: response?.status };
    } catch (error) {
      const errorMessage =
        error.response?.data?.username ||
        error.response?.data?.email ||
        error.response?.data?.password ||
        error.response?.data?.phone ||
        error.response?.data?.image ||
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
export const otpVerify = createAsyncThunk(
  "otpVerify",
  async (values, { rejectWithValue }) => {
    try {
      const response = await otpVerification(values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.otp || error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const otpResend = createAsyncThunk(
  "otpResend",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetchOtpResend(values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.otp || error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const signIn = createAsyncThunk(
  "signIn",
  async (values, { rejectWithValue }) => {
    try {
      const response = await signInUser(values);
      if (response?.data?.data?.token) {
        localStorage.setItem("token", response?.data?.data?.token);
      }
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.email ||
        error.response?.data?.password ||
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
export const signInWithGoogle = createAsyncThunk(
  "signInWithGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchSignInWithGoogle(token);
      if (response?.data?.data?.token) {
        localStorage.setItem("token", response?.data?.data?.token);
      }
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error response
      return rejectWithValue(errorMessage);
    }
  }
);
export const verifyToken = createAsyncThunk(
  "verifyToken",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchVerifyToken(values);
      if (!response.data.data) {
        const token = getToken();
        if (token) {
          dispatch(logOut());
        }
        throw new Error("User not found");
      }
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error response
      return rejectWithValue({
        status: !error.response ? 500 : error.response.status,
        message: errorMessage,
      });
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetchForgetPassword(values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.email || error.response?.data?.message;
      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await changeUserDetails(id, values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.image ||
        error.response?.data?.email ||
        error.response?.data?.joiningDate ||
        error.response?.data?.dob ||
        error.response?.data?.gender ||
        error.response?.data?.address ||
        error.response?.data?.authentication ||
        error.response?.data?.username ||
        error.response?.data?.phone ||
        error.response?.data?.l ||
        error.response?.data?.oldPassword ||
        error.response?.data?.newPassword ||
        error.response?.data?.confirmPassword ||
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
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ token, values }, { rejectWithValue }) => {
    try {
      const response = await fetchResetPassword(token, values);
      toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.token ||
        error.response?.data?.newPassword ||
        error.response?.data?.confirmPassword ||
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
export const getCustomersThunk = createAsyncThunk(
  "getCustomersThunk",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await getCustomers(values);
      // toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      if (
        error.response.statusText === "Unauthorized" &&
        error.response.status === 401
      ) {
        const token = getToken();
        dispatch(verifyToken({ token }));
      }

      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const getCustomersDetailsThunk = createAsyncThunk(
  "getCustomersDetailsThunk",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await getCustomersDetails(values);
      // toastSuccess(response?.data?.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      if (
        error.response.statusText === "Unauthorized" &&
        error.response.status === 401
      ) {
        const token = getToken();
        dispatch(verifyToken({ token }));
      }

      // Toast the error message
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const getAllStaffsThunk = createAsyncThunk(
  "getAllStaffsThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await getAllStaff(values);
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
export const getStaffDetailsThunk = createAsyncThunk(
  "getStaffDetailsThunk",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getStaffDetails(query);
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
export const updateUserRoleAndActiveThunk = createAsyncThunk(
  "updateUserRoleAndActiveThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const response = await updateUserRoleAndActive(id, values);
      // toastSuccess(response?.data?.message);
      toastSuccess("User Status Updated Successfully");
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
export const addStaffThunk = createAsyncThunk(
  "addStaffThunk",
  async (values, { rejectWithValue }) => {
    try {
      const response = await addStaff(values);
      // toastSuccess(response?.data?.message);
      toastSuccess("Staff created Successfully");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.username ||
        error.response?.data?.phone ||
        error.response?.data?.email ||
        error.response?.data?.role ||
        error.response?.data?.joiningDate ||
        error.response?.data?.empId ||
        error.response?.data?.password ||
        error.response?.data?.confirmPassword ||
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
