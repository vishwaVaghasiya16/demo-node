import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSingleAttributeThunk,
  deleteSingleCostThunk,
  deleteSingleVariantFileThunk,
  deleteVariantSingleAttributeThunk,
  deleteVariantSingleCostThunk,
  getProductDetailsByIdThunk,
  getProductReviewsByAdminThunk,
  getProductReviewsByIdThunk,
  getProductReviewsThunk,
  postProductReviewThunk,
  postProductThunk,
  updateProductSingleAttributeThunk,
  updateProductSingleCostThunk,
  updateProductThunk,
  updateVariantSingleAttributeThunk,
  updateVariantSingleCostThunk,
} from "./thunk";
import {
  deleteSingleProductFileThunk,
  getVariantDetailsThunk,
  postVariantThunk,
  updateVariantThunk,
} from "../actions";

const initialState = {
  data: {},
  productDetails: {},
  loading: false,
  addUpdateLoading: false,
  updateLoading: false,
  deleteLoading: false,
  message: "",
  error: null,
  // product review ===========
  reviews: [],
  reviewLoading: false,
  reviewMessage: "",
  reviewError: null,
  reviewPaginationData: {},
  reviewPaginationLoading: false,
  dummyData: {},
  // default variant ==========
  defaultVariant: {},
  singleReviewDetails: {},
  recentlyProduct:
    JSON.parse(localStorage.getItem("jewelryRecentViewProducts")) || [],
};

const slice = createSlice({
  name: "ProductDetails",
  initialState,
  reducers: {
    setEmptyArray: (state) => {
      state.reviews = [];
    },
    setClearProductDetails: (state) => {
      state.productDetails = {};
    },
    setSingleReviewDetails: (state, action) => {
      state.singleReviewDetails = action.payload;
    },
    setRecentlyProduct: (state, action) => {
      let allRecord = state.recentlyProduct;
      const isSameProduct = allRecord?.some(
        (item) => item?._id == action.payload?._id
      );
      if (!isSameProduct) {
        if (allRecord?.length >= 10) {
          allRecord = [action.payload, ...allRecord.slice(0, -1)];
        } else {
          allRecord = [action.payload, ...allRecord];
        }
        state.recentlyProduct = allRecord;
        localStorage.setItem(
          "jewelryRecentViewProducts",
          JSON.stringify(allRecord)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetailsByIdThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getProductDetailsByIdThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.productDetails = action.payload.data && action.payload.data[0];
    });
    builder.addCase(getProductDetailsByIdThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // ======================================
    //             post product
    // ======================================

    builder.addCase(postProductThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(postProductThunk.fulfilled, (state) => {
      state.addUpdateLoading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(postProductThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.message = "";
      state.error = null;
    });

    // ======================================
    //             update product
    // ======================================

    builder.addCase(updateProductThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateProductThunk.fulfilled, (state) => {
      state.addUpdateLoading = false;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateProductThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.message = "";
      state.error = null;
    });

    // =======================================
    //          post product review
    // =======================================

    builder.addCase(postProductReviewThunk.pending, (state) => {
      state.reviewLoading = true;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(postProductReviewThunk.fulfilled, (state, action) => {
      state.reviewLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
      state.reviews.unshift(action.payload.data);
    });
    builder.addCase(postProductReviewThunk.rejected, (state) => {
      state.reviewLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
    });

    // =======================================
    //          product review
    // =======================================
    builder.addCase(getProductReviewsThunk.pending, (state) => {
      state.reviewPaginationLoading = true;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(getProductReviewsThunk.fulfilled, (state, action) => {
      state.reviewPaginationLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
      state.reviewPaginationData = action.payload.pagination;
      // state.reviews = action.payload.data;
      const newReviews = action.payload.data.filter(
        (newReview) =>
          !state.reviews.some(
            (existingReview) => existingReview._id === newReview._id
          )
      );
      state.reviews.push(...newReviews);
    });
    builder.addCase(getProductReviewsThunk.rejected, (state) => {
      state.reviewPaginationLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(getProductReviewsByAdminThunk.pending, (state) => {
      state.reviewLoading = true;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(
      getProductReviewsByAdminThunk.fulfilled,
      (state, action) => {
        state.reviewLoading = false;
        state.reviewMessage = "";
        state.reviewError = null;
        state.reviewPaginationData = action.payload.pagination;
        state.reviews = action.payload.data;
      }
    );
    builder.addCase(getProductReviewsByAdminThunk.rejected, (state) => {
      state.reviewLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(getProductReviewsByIdThunk.pending, (state) => {
      state.reviewLoading = true;
      state.reviewMessage = "";
      state.reviewError = null;
    });
    builder.addCase(getProductReviewsByIdThunk.fulfilled, (state, action) => {
      state.reviewLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
      state.singleReviewDetails = action.payload.data[0];
    });
    builder.addCase(getProductReviewsByIdThunk.rejected, (state) => {
      state.reviewLoading = false;
      state.reviewMessage = "";
      state.reviewError = null;
    });

    // ==============================
    //     get variant details
    // ==============================

    builder.addCase(getVariantDetailsThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getVariantDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.productDetails = action.payload.data[0];
    });
    builder.addCase(getVariantDetailsThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // ==============================
    //         post variant
    // ==============================

    builder.addCase(postVariantThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(postVariantThunk.fulfilled, (state) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
    });
    builder.addCase(postVariantThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
    });

    // ==============================
    //       update variant
    // ==============================

    builder.addCase(updateVariantThunk.pending, (state) => {
      state.addUpdateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(updateVariantThunk.fulfilled, (state) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
    });
    builder.addCase(updateVariantThunk.rejected, (state) => {
      state.addUpdateLoading = false;
      state.error = null;
      state.message = "";
    });

    // ==============================
    //     delete product single file
    // ==============================

    builder.addCase(deleteSingleProductFileThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteSingleProductFileThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.error = false;
      state.message = "";
      // if (state.products?.length > 0 && Array.isArray(state.products[0].files)) {
      //   state.products[0].files = state.products[0].files.filter(
      //     (item) => item._id !== action.payload.id
      //   );
      // }
      const deletedData = state.productDetails.files?.filter(
        (item) => item?._id !== action.payload.id
      );
      state.productDetails.files = deletedData;
    });
    builder.addCase(deleteSingleProductFileThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = false;
      state.message = "";
    });

    // ==============================
    //   delete variant single file
    // ==============================

    builder.addCase(deleteSingleVariantFileThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteSingleVariantFileThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.error = false;
      state.message = "";
      const deletedData = state.productDetails.files?.filter(
        (item) => item?._id !== action.payload.id
      );
      state.productDetails = { ...state.productDetails, files: deletedData };
    });
    builder.addCase(deleteSingleVariantFileThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = false;
      state.message = "";
    });

    // =====================================
    //       delete single attribute
    // =====================================

    builder.addCase(deleteSingleAttributeThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteSingleAttributeThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
      const newAttribute = state.productDetails?.attributes?.filter(
        (item) => item._id !== action.payload.id
      );
      state.productDetails = {
        ...state.productDetails,
        attributes: newAttribute,
      };
    });
    builder.addCase(deleteSingleAttributeThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===================================
    //        delete single cost
    // ===================================

    builder.addCase(deleteSingleCostThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteSingleCostThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
      const newCost =
        state.productDetails?.cost?.filter(
          (item) => item._id !== action.payload.id
        ) || [];
      state.productDetails.cost = newCost;
    });
    builder.addCase(deleteSingleCostThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===================================
    //        delete variant single cost
    // ===================================

    builder.addCase(deleteVariantSingleCostThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(deleteVariantSingleCostThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
      const newCost =
        state.productDetails?.cost?.filter(
          (item) => item._id !== action.payload.id
        ) || [];
      state.productDetails.cost = newCost;
    });
    builder.addCase(deleteVariantSingleCostThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===========================================
    //       delete single variant attribute
    // ===========================================

    builder.addCase(deleteVariantSingleAttributeThunk.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(
      deleteVariantSingleAttributeThunk.fulfilled,
      (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.message = "";
        const newAttribute = state.productDetails?.attributes?.filter(
          (item) => item._id !== action.payload.id
        );
        state.productDetails = {
          ...state.productDetails,
          attributes: newAttribute,
        };
      }
    );
    builder.addCase(deleteVariantSingleAttributeThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===========================================
    //      update product single attribute
    // ===========================================

    builder.addCase(updateProductSingleAttributeThunk.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(
      updateProductSingleAttributeThunk.fulfilled,
      (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = "";
        state.productDetails["attributes"] = action.payload.data.attributes;
        // state.productDetails["attributes"] =
        //   state?.productDetails?.attributes?.map((item) => {
        //     if (item._id) {
        //       return action.payload.data;
        //     }
        //     return item;
        //   });
      }
    );
    builder.addCase(updateProductSingleAttributeThunk.rejected, (state) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===========================================
    //      update variant single attribute
    // ===========================================

    builder.addCase(updateVariantSingleAttributeThunk.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(
      updateVariantSingleAttributeThunk.fulfilled,
      (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = "";
        state.productDetails["attributes"] = action.payload.data.attributes;
      }
    );
    builder.addCase(updateVariantSingleAttributeThunk.rejected, (state) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===========================================
    //      update product single cost
    // ===========================================

    builder.addCase(updateProductSingleCostThunk.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(updateProductSingleCostThunk.fulfilled, (state, action) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
      state.productDetails["cost"] = action.payload.data.cost;
    });
    builder.addCase(updateProductSingleCostThunk.rejected, (state) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
    });

    // ===========================================
    //      update variant single attribute
    // ===========================================

    builder.addCase(updateVariantSingleCostThunk.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(updateVariantSingleCostThunk.fulfilled, (state, action) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
      state.productDetails["cost"] = action.payload.data.cost;
    });
    builder.addCase(updateVariantSingleCostThunk.rejected, (state) => {
      state.updateLoading = false;
      state.error = null;
      state.message = "";
    });
  },
});

export const {
  setEmptyArray,
  setClearProductDetails,
  setSingleReviewDetails,
  setRecentlyProduct,
} = slice.actions;
export default slice.reducer;
