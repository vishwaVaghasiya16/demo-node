import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteProductReview,
  deleteProductSingleFile,
  deleteSingleAttribute,
  deleteSingleCost,
  deleteVariantSingleAttribute,
  deleteVariantSingleCost,
  deleteVariantSingleFile,
  getProductDetailsById,
  getProductDetailsByKey,
  getProductReviewById,
  getProductReviews,
  postProduct,
  postProductReview,
  updateProduct,
  updateProductSingleAttribute,
  updateProductSingleCost,
  updateVariantSingleAttribute,
  updateVariantSingleCost,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getProductDetailsByIdThunk = createAsyncThunk(
  "getProductDetailsById",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await getProductDetailsById(value);
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

export const getProductDetailsByKeyThunk = createAsyncThunk(
  "getProductDetailsByKey",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getProductDetailsByKey(values);
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

export const getProductReviewsThunk = createAsyncThunk(
  "getProductReviewsThunk",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getProductReviews(query);
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

export const postProductThunk = createAsyncThunk(
  "postProductThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await postProduct(values);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      let errorMessage = "error";
      // Toast the error message
      const errorData = error.response.data;
      delete errorData.message;
      errorMessage =
        Object.values(errorData).find((value) => typeof value == "string") ||
        error.response.message ||
        error.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "updateProductThunk",
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const { data } = await updateProduct(id, value);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      let errorMessage = "error";
      // Toast the error message
      if (error.response?.data) {
        const errorData = error.response.data;
        delete errorData.message;
        errorMessage =
          Object.values(errorData).find((value) => typeof value == "string") ||
          error.response.data.message;
        toastError(errorMessage);
      }
      // Reject with error message
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const postProductReviewThunk = createAsyncThunk("postProductReviewThunk",async(values,{rejectWithValue})=>{
  try {
    const {data} = await postProductReview(values)
    return data
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
})

export const getProductReviewsByAdminThunk = createAsyncThunk(
  "getProductReviewsByAdminThunk",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getProductReviews(query);
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

export const getProductReviewsByIdThunk = createAsyncThunk(
  "getProductReviewsByIdThunk",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getProductReviewById(id);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (
        errorMessage &&
        errorMessage !==
          "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
      ) {
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

export const deleteProductReviewThunk = createAsyncThunk(
  "deleteProductReviewThunk",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteProductReview(id);
      toastSuccess(data.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
      if (
        errorMessage &&
        errorMessage !==
          "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
      ) {
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

export const deleteSingleProductFileThunk = createAsyncThunk(
  "deleteSingleProductImage",
  async ({ id, deleteId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteProductSingleFile(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteSingleVariantFileThunk = createAsyncThunk(
  "deleteSingleVariantImage",
  async ({ id, deleteId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteVariantSingleFile(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteSingleAttributeThunk = createAsyncThunk(
  "deleteSingleAttributeThunk",
  async ({ id, deleteId } = {}, { rejectWithValue }) => {
    try {
      const { data } = await deleteSingleAttribute(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteVariantSingleAttributeThunk = createAsyncThunk(
  "deleteVariantSingleAttributeThunk",
  async ({ id, deleteId } = {}, { rejectWithValue }) => {
    try {
      const { data } = await deleteVariantSingleAttribute(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteSingleCostThunk = createAsyncThunk(
  "deleteSingleCostThunk",
  async ({ id, deleteId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteSingleCost(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteVariantSingleCostThunk = createAsyncThunk(
  "deleteVariantSingleCostThunk",
  async ({ id, deleteId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteVariantSingleCost(id, deleteId);
      data.id = deleteId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProductSingleAttributeThunk = createAsyncThunk(
  "updateProductSingleAttributeThunk",
  async ({ id, editId, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateProductSingleAttribute({
        id,
        editId,
        values,
      });
      toastSuccess(data.message);
      data.id = editId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateVariantSingleAttributeThunk = createAsyncThunk(
  "updateVariantSingleAttributeThunk",
  async ({ id, editId, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateVariantSingleAttribute({
        id,
        editId,
        values,
      });
      toastSuccess(data.message);
      data.id = editId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProductSingleCostThunk = createAsyncThunk(
  "updateProductSingleCostThunk",
  async ({ id, editId, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateProductSingleCost({
        id,
        editId,
        values,
      });
      toastSuccess(data.message);
      data.id = editId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateVariantSingleCostThunk = createAsyncThunk(
  "updateVariantSingleCostThunk",
  async ({ id, editId, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateVariantSingleCost({
        id,
        editId,
        values,
      });
      toastSuccess(data.message);
      data.id = editId;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toastError(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);
