import { createSlice } from "@reduxjs/toolkit";
import {
  blogPaginationThunk,
  createBlogThunk,
  deleteBlogThunk,
  getAllBlogs,
  getBlogDetailsThunk,
  getImageBlog,
  getLatestBlogsThunk,
  getVideoBlog,
  imageBlogPagination,
  updateBlogThunk,
  videoBlogPagination,
} from "./thunk";

const initialState = {
  videoBlog: [],
  imageBlog: [],
  data: [],
  latestBlogs: [],
  blogDetails: {},
  pagination: {},
  videoPagination: {},
  // latest blog
  latestBlogsLoading: false,
  latestBlogsError: null,
  latestBlogsMessage: "",
  // data
  loading: false,
  addUpdateLoading: false,
  error: null,
  message: "",
  // video
  videoBlogLoading: false,
  videoBlogError: null,
  videoBlogMessage: "",
  // pagination
  paginationLoading: false,
  paginationError: null,
  paginationMessage: "",
  // other
  otherLoading: false,
  otherMessage: "",
  otherError: null,
};

const slice = createSlice({
  name: "Blogs",
  initialState,
  reducers: {
    clearBlogDetails: (state) => {
      state.blogDetails = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLatestBlogsThunk.pending, (state) => {
      state.latestBlogsLoading = true;
      state.latestBlogsError = null;
      state.latestBlogsMessage = "";
    });
    builder.addCase(getLatestBlogsThunk.fulfilled, (state, action) => {
      state.latestBlog1sLoading = false;
      state.latestBlogsError = null;
      state.latestBlogsMessage = "";
      state.latestBlogs = action.payload.data;
    });
    builder.addCase(getLatestBlogsThunk.rejected, (state) => {
      state.latestBlogsLoading = false;
      state.latestBlogsError = null;
      state.latestBlogsMessage = "";
    });

    // get all blogs

    builder.addCase(getAllBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getAllBlogs.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    });

    // blog pagination

    builder.addCase(blogPaginationThunk.pending, (state) => {
      state.paginationLoading = true;
      state.paginationError = null;
      state.paginationMessage = "";
    });
    builder.addCase(blogPaginationThunk.fulfilled, (state, action) => {
      state.paginationLoading = false;
      state.paginationMessage = "";
      state.paginationError = null;
      state.pagination = action.payload.pagination;
      state.data = [...state.data, ...action.payload.data];
    });
    builder.addCase(blogPaginationThunk.rejected, (state) => {
      state.paginationLoading = false;
      (state.paginationError = null), (state.paginationMessage = "");
    });

    // image blog pagination

    builder.addCase(imageBlogPagination.pending, (state) => {
      state.paginationLoading = true;
      state.paginationError = null;
      state.paginationMessage = "";
    });
    builder.addCase(imageBlogPagination.fulfilled, (state, action) => {
      state.paginationLoading = false;
      state.paginationError = null;
      state.paginationMessage = "";
      state.imageBlog = [...state.imageBlog, ...action.payload.data];
      state.pagination = action.payload.pagination;
    });
    builder.addCase(imageBlogPagination.rejected, (state) => {
      state.paginationLoading = false;
      state.paginationError = null;
      state.paginationMessage = "";
    });

    // video blog pagination

    builder.addCase(videoBlogPagination.pending, (state) => {
      state.otherLoading = true;
      state.otherError = null;
      state.otherMessage = "";
    });
    builder.addCase(videoBlogPagination.fulfilled, (state, action) => {
      state.otherLoading = false;
      state.otherError = null;
      state.otherMessage = "";
      state.videoBlog = [...state.videoBlog, ...action.payload.data];
      state.videoPagination = action.payload.pagination;
    });
    builder.addCase(videoBlogPagination.rejected, (state) => {
      state.otherLoading = false;
      state.otherError = null;
      state.otherMessage = "";
    });

    // get blog details

    builder.addCase(getBlogDetailsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(getBlogDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.blogDetails = action.payload.data[0];
    });
    builder.addCase(getBlogDetailsThunk.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    });

    // create blog

    builder.addCase(createBlogThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(createBlogThunk.fulfilled, (state, action) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createBlogThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
    });

    // update blog

    builder.addCase(updateBlogThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.otherError = null;
      state.otherMessage = "";
    });
    builder.addCase(updateBlogThunk.fulfilled, (state, action) => {
      state.addUpdateLoading = false;
      state.otherError = null;
      state.otherMessage = "";
      const index = state.data.findIndex(
        (item) => item._id == action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload.data;
      }
    });
    builder.addCase(updateBlogThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.otherError = null;
      state.otherMessage = "";
    });

    // delete blog

    builder.addCase(deleteBlogThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteBlogThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.data = state.data?.filter(
        (item) => item?._id !== action.payload.id
      );
    });
    builder.addCase(deleteBlogThunk.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    });

    // get image blog

    builder.addCase(getImageBlog.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getImageBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.imageBlog = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getImageBlog.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // get video blog

    builder.addCase(getVideoBlog.pending, (state) => {
      state.videoBlogLoading = true;
      state.videoBlogMessage = "";
      state.videoBlogError = null;
    });
    builder.addCase(getVideoBlog.fulfilled, (state, action) => {
      state.videoBlogLoading = false;
      state.videoBlogMessage = "";
      state.videoBlogError = null;
      state.videoBlog = action.payload.data;
      state.videoPagination = action.payload.pagination;
    });
    builder.addCase(getVideoBlog.rejected, (state) => {
      state.videoBlogLoading = false;
      state.videoBlogMessage = "";
      state.videoBlogError = null;
    });
  },
});

export const { clearBlogDetails } = slice.actions;
export default slice.reducer;
