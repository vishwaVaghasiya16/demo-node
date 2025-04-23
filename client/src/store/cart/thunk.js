import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyCoupon,
  deleteCartProduct,
  getCart,
  moveCartToWishlist,
  postAddToCart,
  removeCoupon,
  updateCart,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { setAuthBox } from "../auth/slice";
import { getWishlistThunk } from "../actions";

export const postAddToCartThunk = createAsyncThunk(
  "postAddToCartThunk",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { user } = state.Auth;
      if (Object.keys(user).length > 0) {
        const { data } = await postAddToCart(id);
        toastSuccess("Product added to cart");
        return data;
      } else {
        dispatch(setAuthBox("register"));
      }
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

export const getCartThunk = createAsyncThunk(
  "getCartThunk",
  async ({ query } = {}, { rejectWithValue, getState }) => {
    try {
      const { Auth } = getState();
      if(Auth?.user?._id){
        const newQuery = { ...query, user: Auth.user._id };
        const { data } = await getCart(newQuery);
        return data;
      } 
      return []
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

export const deleteCartItemThunk = createAsyncThunk(
  "deleteCartItem",
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteCartProduct(id, productId);
      data.id = productId;
      return data;
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

export const updateCartItemThunk = createAsyncThunk(
  "updateCartItem",
  async ({ id, editId, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateCart({ id, editId, values });
      data.id = editId;
      data.quantity = values.quantity;
      return data;
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

export const moveCartToWishlistThunk = createAsyncThunk(
  "moveCartToWishlistThunk",
  async ({ id, removeId }, { rejectWithValue }) => {
    try {
      const { data } = await moveCartToWishlist({ id, removeId });
      data.id = removeId;
      // await dispatch(getWishlistThunk())
      return data;
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

export const applyCouponThunk = createAsyncThunk(
  "applyCouponThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await applyCoupon(id, values);
      toastSuccess(data?.message)
      return data;
    } catch (error) {
      const errorMessage = error.response.data?.message;
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

export const removeCouponThunk = createAsyncThunk("removeCouponThunk",async({id},{rejectWithValue})=>{
  try {
    const {data} = await removeCoupon(id)
    toastSuccess(data?.message)
    return data
  } catch (error) {
      const errorMessage = error.response.data?.message
      if(errorMessage){
        toastError(errorMessage)
      }
      return rejectWithValue({status:error.response.status,message:errorMessage})
  }
})
