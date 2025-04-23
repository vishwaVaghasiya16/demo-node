import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  getBlogDetails,
  getBlogs,
  updateBlog,
} from "../../helpers/backend_helper";
import { toastError, toastSuccess } from "../../helpers/toastConfig";

export const getLatestBlogsThunk = createAsyncThunk(
  "getLatestBlogs",
  async ({ limit = 3 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await getBlogs({ limit });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

export const getAllBlogs = createAsyncThunk(
  "getAllBlogs",
  async ({ limit = 15 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await getBlogs({ limit });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

export const getImageBlog = createAsyncThunk(
  "getImageBlog",
  async ({ limit = 15 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await getBlogs({ limit, type: "image" });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

export const getVideoBlog = createAsyncThunk(
  "getVideoBlog",
  async ({ limit = 15 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await getBlogs({ limit, type: "video" });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

// export const getVideoBlog = createAsyncThunk(
//   "getVideoBlog",
//   async ({ limit = 15 }, { rejectWithValue }) => {
//     try {
//       const { data } = await getBlogs({ limit, type: "video" });
//       return data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message;
//       // Toast the error message
//       if (errorMessage) {
//         toastError(errorMessage);
//       }
//       // Reject with error message
//       return rejectWithValue({
//         status: error.response.status,
//         message: errorMessage,
//       });
//     }
//   }
// );

export const blogPaginationThunk = createAsyncThunk(
  "blogPagination",
  async ({ limit = 10, page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await getBlogs({ limit, page });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

export const getBlogDetailsThunk = createAsyncThunk(
  "getBlogDetailsThunk",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getBlogDetails(query);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      // Toast the error message
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

export const createBlogThunk = createAsyncThunk(
  "createBlog",
  async ({ values }, { rejectWithValue }) => {
    try {
      const { data } = await createBlog(values);
      toastSuccess(data?.message);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.description ||
        error.response?.data?.url ||
        error.response?.data?.html ||
        error.response?.data?.message;
      // Toast the error message
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

export const updateBlogThunk = createAsyncThunk(
  "updateBlog",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateBlog(id, values);
      toastSuccess(data?.message);
      data.id = id;
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.title ||
        error.response?.data?.description ||
        error.response?.data?.url ||
        error.response?.data?.html ||
        error.response?.data?.message;
      // Toast the error message
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

export const deleteBlogThunk = createAsyncThunk(
  "deleteBlogThunk",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteBlog(id);
      data.id = id;
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
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

export const imageBlogPagination = createAsyncThunk(
  "imageBlogPagination",
  async ({ limit = 15, page = 1 }, { rejectWithValue }) => {
    try {
      const {data} = await getBlogs({limit,page,type:"image"})
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message;
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

export const videoBlogPagination = createAsyncThunk(
  "videoBlogPagination",
  async ({ limit = 15, page = 1 }, { rejectWithValue }) => {
    try {
      const {data} = await getBlogs({limit,page,type:"video"})
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message;
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
