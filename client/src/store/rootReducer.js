import { combineReducers } from "redux";
import EnumsSlice from "./enums/slice";
import Auth from "./auth/slice";
import CollectionsOverview from "./collectionsOverview/slice";
import Categories from "./categories/slice";
import Products from "./products/slice";
import ContactUs from "./contactUs/slice";
import Blogs from "./blogs/slice";
import ProductDetails from "./productDetails/slice";
import VideoCall from "./videoCall/slice";
import Cart from "./cart/slice";
import AboutUsSlice from "./aboutUs/slice";
import ProductVariant from "./productVariant/slice";
import Wishlist from "./wishlist/slice";
import Coupon from "./coupon/slice";
import Filters from "./filters/slice";
import Orders from "./orders/slice";
import Payment from "./payment/slice";
import Price from "./price/slice";
import Tax from "./tax/slice";
import Dashboard from "./dashboard/slice";

export const rootReducer = combineReducers({
  // Backend Enums
  EnumsSlice,

  // Authentication
  Auth,

  // Filters
  Filters,

  ContactUs,
  CollectionsOverview,
  Categories,
  Products,
  Blogs,
  ProductDetails,
  VideoCall,
  Cart,
  AboutUsSlice,
  ProductVariant,
  Wishlist,
  Coupon,
  Orders,
  Payment,
  Price,
  Tax,
  Dashboard,
});
