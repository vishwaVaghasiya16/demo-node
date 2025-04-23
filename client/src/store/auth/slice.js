import { createSlice } from "@reduxjs/toolkit";
import {
  addStaffThunk,
  forgetPassword,
  getAllStaffsThunk,
  getCustomersDetailsThunk,
  getCustomersThunk,
  getStaffDetailsThunk,
  otpVerify,
  resetPassword,
  signIn,
  signInWithGoogle,
  signUp,
  updateUserDetails,
  updateUserRoleAndActiveThunk,
  verifyToken,
} from "./thunk";
import { getToken } from "../../helpers/api_helper";

const token = getToken();

const initialState = {
  loading: false,
  error: "",
  message: "",
  email: "",
  user: {},
  allStaffs: [],
  allCustomers: [],
  singleCustomerDetails: {},
  token: token,
  authType: "",
  userPaginationData: {},
  staffDetails: {},
};

const slice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthBox(state, action) {
      state.authType = action.payload;
      state.loading = false;
      state.error = "";
      state.message = "";
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    logOut(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.user = {};
      state.allStaffs = [];
      state.loading = false;
      state.error = "";
      state.message = "";
      state.authType = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    // signUp
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // otpVerification
    builder.addCase(otpVerify.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // signIn
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.token = getToken();
      state.error = "";
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // signInWithGoogle
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.token = getToken();
      state.error = "";
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // verifyTokenThunk
    builder.addCase(verifyToken.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.message = "";
    });
    // forgetPassword
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // resetPassword
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // updateUserDetails
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      const updateUserDetails = {
        ...state.user,
        username: action?.payload?.data?.username,
        email: action?.payload?.data?.email,
        phone: action?.payload?.data?.phone,
      };
      state.user = updateUserDetails;
      state.error = "";
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // getCustomersThunk
    builder.addCase(getCustomersThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getCustomersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.allCustomers = action.payload.data;
      state.userPaginationData = action.payload.pagination;
      state.error = "";
    });
    builder.addCase(getCustomersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // getCustomersDetailsThunk
    builder.addCase(getCustomersDetailsThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getCustomersDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.singleCustomerDetails = action.payload.data;
      state.error = "";
    });
    builder.addCase(getCustomersDetailsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // getAllStaffsThunk
    builder.addCase(getAllStaffsThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getAllStaffsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.allStaffs = action.payload.data;
      state.userPaginationData = action.payload.pagination;
      state.error = "";
    });
    builder.addCase(getAllStaffsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // getStaffDetailsThunk
    builder.addCase(getStaffDetailsThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getStaffDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.staffDetails = action.payload.data[0];
      state.error = "";
    });
    builder.addCase(getStaffDetailsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // updateUserRoleAndActiveThunk
    builder.addCase(updateUserRoleAndActiveThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(updateUserRoleAndActiveThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(updateUserRoleAndActiveThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // addStaffThunk
    builder.addCase(addStaffThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(addStaffThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = "";
    });
    builder.addCase(addStaffThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
  },
});

export const { setAuthBox, setUserEmail, logOut } = slice.actions;
export default slice.reducer;
