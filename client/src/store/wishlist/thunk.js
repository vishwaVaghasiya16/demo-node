import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlist,
  moveWishlistToCart,
  postWishlist,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";
import { setAuthBox } from "../auth/slice";
import { addItemToCart } from "../cart/slice";
import { getCartThunk } from "../actions";

export const getWishlistThunk = createAsyncThunk(
  "getWishlistThunk",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { Auth } = getState();
      if(Auth?.user?._id){
        const { data } = await getWishlist(
          Auth?.user?._id ? { user: Auth?.user?._id } : {}
        );
        return data;
      }
      return [];
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

export const postWishlistThunk = createAsyncThunk(
  "postWishlist",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const { user } = state.Auth;
      if (Object.keys(user).length > 0) {
        const { data } = await postWishlist(id);
        toastSuccess(data.message);
        data.id = id;
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

export const moveWishlistToCartThunk = createAsyncThunk(
  "moveWishlistToCart",
  async ({ value, id,productId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await moveWishlistToCart(id,productId);
      await dispatch(getCartThunk());
      data.value = value;
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
