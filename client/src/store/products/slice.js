import { createSlice } from "@reduxjs/toolkit";
import { productViewTypeEnum } from "../../helpers/enum";
import {
  getProductByAdminThunk,
  getProductsOnScrollThunk,
  getProductsThunk,
  searchProductPaginationThunk,
  searchProductThunk,
} from "./thunk";
import { getQueryStringValues } from "../../helpers/customFunctions";

const queryStringValues = getQueryStringValues();

const initialState = {
  loading: false,
  error: null,
  message: "",
  checkedFilter: {},
  selectedFilterData: [],
  productViewType: productViewTypeEnum.GRID,
  filterObject: queryStringValues || {},
  productsPaginationData: {},
  currentPage: 1,
  displayFilterOptions: [],
  sortByOptions: [
    {
      queryString: "",
      displayContent: "all products",
    },
    {
      queryString: "price_dec",
      displayContent: "price high to low",
    },
    {
      queryString: "price_asc",
      displayContent: "price low to high",
    },
    {
      queryString: "featured",
      displayContent: "featured",
    },
    {
      queryString: "discount",
      displayContent: "discount",
    },
  ],
  products: [],
  productList: [],
  productPaginationData: {},
  // search product inital values
  searchData: [],
  searchPagination: {},
  searchPaginationLoading: false,
};

const slice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDisplayFilterOptions: (state, action) => {
      state.displayFilterOptions = action.payload;
    },
    setSelectedFilterData: (state, action) => {
      state.currentPage = 1;
      state.searchPagination.page = 1;

      if (action.payload.queryString) {
        const index = state.selectedFilterData?.findIndex(
          (item) => item.filterType === action.payload.filterType
        );
        if (index !== -1) {
          state.selectedFilterData.splice(index, 1, action.payload);
        } else {
          state.selectedFilterData.push(action.payload);
        }

        // Handling filter object
        state.selectedFilterData?.forEach((ele) => {
          state.filterObject[ele.filterType] = ele.queryString;
        });
      } else {
        state.selectedFilterData = state.selectedFilterData.filter(
          (item) => item.filterType !== action.payload.filterType
        );

        // Handling filter object
        state.filterObject = Object.keys(state.filterObject)
          .filter((objKey) => objKey !== action.payload.filterType)
          .reduce((newObj, key) => {
            newObj[key] = state.filterObject[key];
            return newObj;
          }, {});
      }

      // Handling checked filter
      state.checkedFilter = state.selectedFilterData.reduce((acc, item) => {
        acc[item.queryString] = true;
        return acc;
      }, {});
    },
    setClearAllFilters: (state) => {
      state.currentPage = 1;
      state.selectedFilterData = [];
      state.checkedFilter = {};
      state.filterObject = {};
    },
    setProductViewType: (state, action) => {
      state.currentPage = 1;
      state.productViewType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductByAdminThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getProductByAdminThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.productList = action.payload.data;
      state.productPaginationData = action.payload.pagination;
    });
    builder.addCase(getProductByAdminThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // get products on scroll
    builder.addCase(getProductsOnScrollThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getProductsOnScrollThunk.fulfilled, (state, action) => {
      const newProducts = action.payload.data.filter(
        (newProduct) =>
          !state.products.some(
            (existingProduct) => existingProduct._id === newProduct._id
          )
      );
      state.products.push(...newProducts);
      state.loading = false;
      state.message = action?.payload?.message;
      state.productsPaginationData = action.payload.pagination;
      state.error = "";
    });
    builder.addCase(getProductsOnScrollThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // get products
    builder.addCase(getProductsThunk.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.message = action?.payload?.message;
      state.productsPaginationData = action.payload.pagination;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    // search data
    builder.addCase(searchProductThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(searchProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.searchData = action.payload.data;
      state.searchPagination = action.payload.pagination;
    });
    builder.addCase(searchProductThunk.rejected, (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    });
    // search data pagination
    builder.addCase(searchProductPaginationThunk.pending, (state) => {
      state.searchPaginationLoading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(searchProductPaginationThunk.fulfilled, (state, action) => {
      state.searchPaginationLoading = false;
      state.error = null;
      state.message = "";
      state.searchData.push(...action.payload.data);
      state.searchPagination = action.payload.pagination;
    });
    builder.addCase(searchProductPaginationThunk.rejected, (state) => {
      state.searchPaginationLoading = false;
      state.error = null;
      state.message = "";
    });
  },
});

export const {
  setProductViewType,
  setCheckedFilter,
  setSelectedFilterData,
  setClearAllFilters,
  setCurrentPage,
  setDisplayFilterOptions,
} = slice.actions;
export default slice.reducer;
