const API = "/api";
const ADMIN = "/admin";
const VERSION = "";
const AUTH = "/auth";
const PRODUCT = "/product";
const CUSTOMER = "/customer";
const VARIANTS = "/variants";
const CART = "/cart";
const CATEGORIES = "/categories";
const SUB_CATEGORIES = "/sub-categories";
const CATEGORY = "/category";
const BLOGS = "/blogs";
const ABOUT_US = "/about-us";
const ORDERS = "/orders";
const RETURN_ORDER = "/return-order";
const PAYMENT = "/payments";
const PRICE = "/price";
const COUPON = "/coupon";
const HOME = "/home";
const REFUND = "/refund";
const TAX = "/tax";
const FILTER = "/filter";
const DASHBOARD = "/dashboard";

export const BACKEND_ENUMS = API + VERSION + "/enums";

export const HOME_API = API + VERSION + HOME;

export const AUTH_API = {
  USER_REGISTER: API + VERSION + AUTH + "/register",
  OTP_VERIFICATION: API + VERSION + AUTH + "/verifyOtp",
  OTP_RESEND: API + VERSION + AUTH + "/resendOtp",
  USER_LOGIN: API + VERSION + AUTH + "/login",
  USER_GOOGLE_LOGIN: API + VERSION + AUTH + "/google" + "/login",
  USER_FORGET_PASSWORD: API + VERSION + AUTH + "/forgot-password",
  USER_RESET_PASSWORD: API + VERSION + AUTH + "/resetPassword",
  USER_CHANGE_DETAILS: API + VERSION + AUTH,
  VERIFY_TOKEN: API + VERSION + AUTH + "/verifyToken",
  CREATE_STAFF: API + VERSION + AUTH + "/addStaff",
  GET_ALL_STAFF: API + VERSION + AUTH + "/staff",
  GET_STAFF_DETAILS: API + VERSION + AUTH + "/staff-details",
  GET_ALL_CUSTOMER: API + VERSION + AUTH + CUSTOMER,
  GET_CUSTOMER_DETAILS: API + VERSION + AUTH + "/details",
  UPDATE_ROLE_AND_ACTIVE: API + VERSION + AUTH,
  // GET_ALL_USER_BY_ADMIN: API + VERSION + AUTH + ADMIN,
  //   GET_SINGLE_USER: API + VERSION + AUTH,
  //   UPDATE_USER_PROFILE: API + VERSION + AUTH,
  //   DELETE_USER_PROFILE: API + VERSION + AUTH,
};

export const CONTACT_US = API + VERSION + "/contact-us";

export const PRODUCT_API = {
  GET_PRODUCTS: API + VERSION + PRODUCT + CATEGORY,
  GET_PRODUCT_DETAILS: API + VERSION + PRODUCT + "/details",
  GET_PRODUCT_By_ADMIN: API + VERSION + PRODUCT + ADMIN,
  PRODUCT_REVIEW: API + VERSION + "/product-reviews",
  GET_ALL_PRODUCT_VARIANT_CUSTOMER: API + VERSION + VARIANTS + "/get",
  GET_ALL_PRODUCT_VARIANT_ADMIN: API + VERSION + VARIANTS + ADMIN,
  GET_PRODUCT_VARIANT_STATUS_N_PRICE:
    API + VERSION + VARIANTS + "/status-price",
  GET_PRODUCT_VARIANT_DETAILS: API + VERSION + VARIANTS + "/details",
  PRODUCT: API + VERSION + PRODUCT,
  VARIANT: API + VERSION + VARIANTS,
};

export const VIDEO_CALL = API + VERSION + "/videocall";

export const WISHLIST = API + VERSION + "/wishlist";

export const CART_API = {
  ADD_TO_CART: API + VERSION + CART + "/add",
  CART: API + VERSION + CART,
};

export const CATEGORIES_API = {
  CATEGORIES: API + VERSION + CATEGORIES,
  SUB_CATEGORY: API + VERSION + SUB_CATEGORIES,
};

export const COUPON_API = {
  COMMON_COUPON_API: API + VERSION + COUPON,
  GET_COUPON: API + VERSION + COUPON + "/get",
  GET_COUPON_ADMIN: API + VERSION + COUPON + ADMIN,
};

export const BLOG = {
  GET_BLOGS: API + VERSION + BLOGS + "/get",
  BLOGS: API + VERSION + BLOGS,
  GET_BLOG_DETAILS: API + VERSION + BLOGS + "/details",
};

export const ABOUT_US_API = {
  GET_ABOUT_US_DETAILS: API + VERSION + ABOUT_US,
};

export const ORDER_API = API + VERSION + ORDERS;

export const RETURN_ORDER_API = API + VERSION + RETURN_ORDER;

export const PAYMENT_ORDER_API = API + VERSION + PAYMENT + ORDERS;

export const REFUND_API = API + VERSION + PAYMENT + REFUND;

export const PAYMENT_API = API + VERSION + PAYMENT;

export const PRICE_API = API + VERSION + PRICE;

export const TAX_API = API + VERSION + TAX;

export const FILTER_API = API + VERSION + FILTER;

export const DASHBOARD_API = API + VERSION + DASHBOARD;
