import { createSlice } from "@reduxjs/toolkit";
import {
  applyCouponThunk,
  deleteCartItemThunk,
  getCartThunk,
  moveCartToWishlistThunk,
  postAddToCartThunk,
  removeCouponThunk,
  updateCartItemThunk,
} from "./thunk";

const initialState = {
  cart: [],
  loading: false,
  deleteLoading: false,
  message: "",
  error: null,
  // coupon inital state
  couponLoading:"",
  couponMessage:"",
  couponError:null
};

const slice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItemToCart: (state, value) => {
      state.cart.push(value);
    },
    clearCart:(state,value)=>{
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCartThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.cart = action.payload.data; 
    });
    builder.addCase(getCartThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });
    // delete cart product
    builder.addCase(deleteCartItemThunk.pending, (state) => {
      state.deleteLoading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(deleteCartItemThunk.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.message = "";
      state.error = null;
      const updatedCart = state.cart[0].items?.filter((item) => {
        if (item?.product?._id) {
          return item.product._id !== action.payload.id;
        } else {
          return item.variant._id !== action.payload.id;
        }
      });
      state.cart[0] = {...action.payload.data}
      state.cart[0].items = updatedCart
    });
    builder.addCase(deleteCartItemThunk.rejected, (state) => {
      state.deleteLoading = false;
      state.message = "";
      state.error = null;
    });
    // Add to cart
    builder.addCase(postAddToCartThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(postAddToCartThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      state.cart = action.payload.data;
        //   const findData = state?.cart[0]?.items?.findIndex(
        //     (item) => item._id == action.payload?.data[0]?.items[0]?._id
        //   );
        //   if (findData !== -1) {
        //     state.cart[0].items[findData] = action.payload.data[0].items[0];
        //   } else {
        //     state.cart[0].items.push(action.payload?.data[0]?.items[0]);
        //   }
    });
    builder.addCase(postAddToCartThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // update cart

    builder.addCase(updateCartItemThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(updateCartItemThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      const updatedData = state.cart[0].items.map((item) => {
        if (item?.product?._id == action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        } else if (item?.variant?._id == action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      // state.cart[0].items = updatedData;
      state.cart[0] = {...action.payload.data,items:updatedData}
      // state.cart[0].subTotal = action.payload.data.subTotal
      // state.cart[0].totalCost = action.payload.data.totalCost
    });
    builder.addCase(updateCartItemThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // move cart to wishlist

    builder.addCase(moveCartToWishlistThunk.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.error = null;
    });
    builder.addCase(moveCartToWishlistThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = null;
      const updatedCart =  state.cart[0].items?.filter((item) => {
        if (item?.product?._id) {
          return item.product._id !== action.payload.id;
        } else {
          return item.variant._id !== action.payload.id;
        }
      });
      state.cart[0] = {...action.payload.data};
      state.cart[0].items = updatedCart;
    });
    builder.addCase(moveCartToWishlistThunk.rejected, (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    });

    // apply coupon on cart api 

    builder.addCase(applyCouponThunk.pending,(state)=>{
      state.couponLoading = true;
      state.couponError = null;
      state.couponMessage = ""
    })
    builder.addCase(applyCouponThunk.fulfilled,(state,action)=>{
      state.couponLoading = false;
      state.couponError = null;
      state.couponMessage = "";
      state.cart[0] = {...action.payload.data,items:state.cart[0]?.items}
    })
    builder.addCase(applyCouponThunk.rejected,(state)=>{
      state.couponLoading = false;
      state.couponError = null;
      state.couponMessage = "";
    })

    // remove coupon on cart api 

    builder.addCase(removeCouponThunk.pending,(state)=>{
      state.couponLoading = true;
      state.couponError = null;
      state.couponMessage = ""
    })
    builder.addCase(removeCouponThunk.fulfilled,(state,action)=>{
      state.couponLoading = false;
      state.couponError = null;
      state.couponMessage = "";
      state.cart[0] = {...action.payload.data,items:state.cart[0]?.items}
    })
    builder.addCase(removeCouponThunk.rejected,(state)=>{
      state.couponLoading = false;
      state.couponError = null;
      state.couponMessage = "";
    })
  },
});

export const { addItemToCart, clearCart } = slice.actions;
export default slice.reducer;
