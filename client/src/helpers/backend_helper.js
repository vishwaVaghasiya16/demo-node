import { APIHandler } from "./api_helper";
import * as url from "./url_helper";

const api = APIHandler;

// Get Backend Enums
export const backendEnums = () => {
  return api.get(url.BACKEND_ENUMS);
};

// Authentication Part
export const getCustomers = (query) => {
  return api.get(url.AUTH_API.GET_ALL_CUSTOMER, query);
};

export const getCustomersDetails = (query) => {
  return api.get(url.AUTH_API.GET_CUSTOMER_DETAILS, query);
};

export const updateUserRoleAndActive = (id, data) => {
  return api.patch(`${url.AUTH_API.UPDATE_ROLE_AND_ACTIVE}/${id}/role`, data);
};

export const signUpUser = (data) => {
  return api.post(url.AUTH_API.USER_REGISTER, data);
};

export const otpVerification = (data) => {
  return api.post(url.AUTH_API.OTP_VERIFICATION, data);
};

export const otpResend = (data) => {
  return api.post(url.AUTH_API.OTP_RESEND, data);
};

export const signInUser = (data) => {
  return api.post(url.AUTH_API.USER_LOGIN, data);
};

export const signInWithGoogle = (data) => {
  return api.post(url.AUTH_API.USER_GOOGLE_LOGIN, data);
};

export const verifyToken = (data) => {
  return api.post(url.AUTH_API.VERIFY_TOKEN, data);
};

export const forgetPassword = (data) => {
  return api.post(url.AUTH_API.USER_FORGET_PASSWORD, data);
};

export const resetPassword = (token, data) => {
  return api.patch(`${url.AUTH_API.USER_RESET_PASSWORD}?token=${token}`, data);
};

export const addStaff = (data) => {
  return api.post(`${url.AUTH_API.CREATE_STAFF}`, data);
};

export const getAllStaff = (query) => {
  return api.get(`${url.AUTH_API.GET_ALL_STAFF}`, query);
};

export const getStaffDetails = (query) => {
  return api.get(`${url.AUTH_API.GET_STAFF_DETAILS}`, query);
};

export const changeUserDetails = (id, data) => {
  return api.patch(`${url.AUTH_API.USER_CHANGE_DETAILS}/${id}`, data);
};

// home

export const getHomeData = () => {
  return api.get(url.HOME_API);
};

export const createHomeData = (data) => {
  return api.post(url.HOME_API, data);
};

export const updateHomeData = (id, data) => {
  return api.patch(`${url.HOME_API}/${id}`, data);
};

export const updateSingleHomeData = (id, subId, data) => {
  return api.patch(`${url.HOME_API}/${id}/doc/${subId}`, data);
};

export const deleteSingleData = (id, subId) => {
  return api.delete(`${url.HOME_API}/${id}/file/${subId}`);
};

// Product Api's
export const getProducts = (data) => {
  return api.get(url.PRODUCT_API.GET_PRODUCTS, data);
};

export const searchProduct = (data) => {
  return api.get(url.PRODUCT_API.GET_PRODUCTS, data);
};

export const postProduct = (data) => {
  return api.post(url.PRODUCT_API.PRODUCT, data);
};

export const getAllProductVariant = (slug) => {
  return api.get(url.PRODUCT_API.GET_ALL_PRODUCT_VARIANT_CUSTOMER, slug);
};

export const updateProduct = (id, value) => {
  return api.patch(url.PRODUCT_API.PRODUCT + `/${id}`, value);
};

export const getAllProductVariantByAdmin = (data) => {
  return api.get(url.PRODUCT_API.GET_ALL_PRODUCT_VARIANT_ADMIN, data);
};

export const deleteProductSingleFile = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.PRODUCT + `/${id}` + "/file" + `/${deleteId}`
  );
};

export const deleteVariantSingleFile = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.VARIANT + `/${id}` + "/file" + `/${deleteId}`
  );
};

export const deleteSingleAttribute = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.PRODUCT + `/${id}` + "/attribute" + `/${deleteId}`
  );
};

export const updateProductSingleAttribute = ({ id, editId, values }) => {
  return api.patch(
    url.PRODUCT_API.PRODUCT + `/${id}` + "/attribute" + `/${editId}`,
    values
  );
};

export const updateVariantSingleAttribute = ({ id, editId, values }) => {
  return api.patch(
    url.PRODUCT_API.VARIANT + `/${id}` + "/attribute" + `/${editId}`,
    values
  );
};

export const updateProductSingleCost = ({ id, editId, values }) => {
  return api.patch(
    url.PRODUCT_API.PRODUCT + `/${id}` + "/cost" + `/${editId}`,
    values
  );
};

export const updateVariantSingleCost = ({ id, editId, values }) => {
  return api.patch(
    url.PRODUCT_API.VARIANT + `/${id}` + "/cost" + `/${editId}`,
    values
  );
};

export const deleteSingleCost = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.PRODUCT + `/${id}` + "/cost" + `/${deleteId}`
  );
};

export const deleteVariantSingleAttribute = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.VARIANT + `/${id}` + "/attribute" + `/${deleteId}`
  );
};

export const deleteVariantSingleCost = (id, deleteId) => {
  return api.delete(
    url.PRODUCT_API.VARIANT + `/${id}` + "/cost" + `/${deleteId}`
  );
};

export const getProductStatusNPrice = (value) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_VARIANT_STATUS_N_PRICE, value);
};

export const getVariantDetails = (id, query) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_VARIANT_DETAILS + `/${id}`, query);
};

export const postVariant = (value) => {
  return api.post(url.PRODUCT_API.VARIANT, value);
};

export const updateVariant = (id, value) => {
  return api.patch(url.PRODUCT_API.VARIANT + `/${id}`, value);
};

// Contact Us Part
export const postContactUs = (data) => {
  return api.post(url.CONTACT_US, data);
};

export const getContactUs = (data) => {
  return api.get(url.CONTACT_US, data);
};

export const deleteContactUs = (id) => {
  return api.delete(`${url.CONTACT_US}/${id}`);
};

// video call part
export const createVideoCallSchedule = (data) => {
  return api.post(url.VIDEO_CALL, data);
};

export const getVideoCallSchedule = (data) => {
  return api.get(url.VIDEO_CALL, data);
};

export const updateVideoCallSchedule = (id, data) => {
  return api.patch(`${url.VIDEO_CALL}/${id}`, data);
};

// product details by id part
export const getProductDetailsById = (value) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_DETAILS, value);
};

// product details by id part
export const getProductDetails = (query) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_DETAILS, query);
};

export const getProductByAdmin = (query) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_By_ADMIN, query);
};

export const getProductVariantByAdmin = (query) => {
  return api.get(url.PRODUCT_API.GET_ALL_PRODUCT_VARIANT_ADMIN, query);
};

export const getProductDetailsByKey = (values) => {
  return api.get(url.PRODUCT_API.GET_PRODUCT_VARIANT_CUSTOMER, values);
};

export const getProductReviews = (values) => {
  return api.get(url.PRODUCT_API.PRODUCT_REVIEW, values);
};

export const postProductReview = (values) => {
  return api.post(url.PRODUCT_API.PRODUCT_REVIEW, values);
};

export const getProductReviewById = (id) => {
  return api.get(`${url.PRODUCT_API.PRODUCT_REVIEW}/${id}`);
};

export const deleteProductReview = (id) => {
  return api.delete(`${url.PRODUCT_API.PRODUCT_REVIEW}/${id}`);
};

// wishlist
export const getWishlist = (data) => {
  return api.get(url.WISHLIST, data);
};

export const postWishlist = (id) => {
  return api.post(url.WISHLIST + `/${id}`);
};

// cart
export const postAddToCart = (id) => {
  return api.post(url.CART_API.ADD_TO_CART + `/${id}`);
};

export const getCart = (data) => {
  return api.get(url.CART_API.CART, data);
};

export const updateCart = ({ id, editId, values }) => {
  return api.patch(
    url.CART_API.CART + `/${id}` + "/product" + `/${editId}`,
    values
  );
};

export const moveCartToWishlist = ({ id, removeId }) => {
  return api.post(
    url.CART_API.CART + `/${id}` + "/product" + `/${removeId}` + "/wishlist"
  );
};

export const deleteCartProduct = (id, productId) => {
  return api.post(url.CART_API.CART + `/${id}/remove/${productId}`);
};

export const moveWishlistToCart = (id, productId) => {
  return api.post(url.WISHLIST + `/${id}` + "/cart" + `/${productId}`);
};

// category
export const createCategory = (data) => {
  return api.post(url.CATEGORIES_API.CATEGORIES, data);
};

export const getCategory = (data) => {
  return api.get(url.CATEGORIES_API.CATEGORIES, data);
};

export const editCategory = (id, data) => {
  return api.patch(url.CATEGORIES_API.CATEGORIES + `/${id}`, data);
};

export const createSubCategory = (data) => {
  return api.post(url.CATEGORIES_API.SUB_CATEGORY, data);
};

export const getSubCategory = (query) => {
  return api.get(url.CATEGORIES_API.SUB_CATEGORY, query);
};

export const deleteSubCategory = (id) => {
  return api.delete(url.CATEGORIES_API + `/${id}`);
};

export const editSubCategory = (id, value) => {
  return api.patch(url.CATEGORIES_API.SUB_CATEGORY + `/${id}`, value);
};

// coupon
export const getCoupon = () => {
  return api.get(url.COUPON_API.GET_COUPON);
};

export const getCouponByAdmin = (query) => {
  return api.get(url.COUPON_API.GET_COUPON_ADMIN, query);
};

export const createCoupon = (data) => {
  return api.post(url.COUPON_API.COMMON_COUPON_API, data);
};

export const deleteCoupon = (id) => {
  return api.delete(`${url.COUPON_API.COMMON_COUPON_API}/${id}`);
};

export const updateCoupon = (id, data) => {
  return api.patch(`${url.COUPON_API.COMMON_COUPON_API}/${id}`, data);
};

export const applyCoupon = (id, values) => {
  return api.post(`${url.CART_API.CART + `/${id}` + "/coupon"}`, values);
};

export const removeCoupon = (id) => {
  return api.post(`${url.CART_API.CART + `/${id}` + "/remove-coupon"}`);
};

// blog
export const getBlogs = (data) => {
  return api.get(url.BLOG.GET_BLOGS, data);
};

export const createBlog = (data) => {
  return api.post(url.BLOG.BLOGS, data);
};

export const updateBlog = (id, data) => {
  return api.patch(url.BLOG.BLOGS + `/${id}`, data);
};

export const deleteBlog = (id) => {
  return api.delete(url.BLOG.BLOGS + `/${id}`);
};

export const getBlogDetails = (data) => {
  return api.get(url.BLOG.GET_BLOG_DETAILS, data);
};

// about us
export const getAboutUsData = (data) => {
  return api.get(url.ABOUT_US_API.GET_ABOUT_US_DETAILS, data);
};

// order
export const getAllOrders = (data) => {
  return api.get(url.ORDER_API, data);
};

export const getOrder = (data) => {
  return api.get(url.ORDER_API, data);
};

export const getAllPaymentOrders = (data) => {
  return api.get(url.PAYMENT_ORDER_API, data);
};

export const refundPayment = (paymentId) => {
  return api.patch(url.REFUND_API, paymentId);
};

export const addAddress = (id, data) => {
  return api.post(`${url.ORDER_API}/${id}`, data);
};

export const updateOrderStatus = (id, data) => {
  return api.patch(`${url.ORDER_API}/${id}`, data);
};

export const returnOrderRequest = (data) => {
  return api.post(`${url.RETURN_ORDER_API}`, data);
};

export const getReturnRequest = (data) => {
  return api.get(url.RETURN_ORDER_API, data);
};

export const updateReturnRequest = (id, data) => {
  return api.patch(`${url.RETURN_ORDER_API}/${id}`, data);
};

// payment
export const createOrderPayment = (data) => {
  return api.post(url.PAYMENT_ORDER_API, data);
};

export const getAllOrdersPayment = (data) => {
  return api.get(url.PAYMENT_ORDER_API, data);
};

// payment
export const razorpayPaymentCapture = (data) => {
  return api.post(url.PAYMENT_API, data);
};

// price
export const createMetalPrice = (data) => {
  return api.post(url.PRICE_API, data);
};

export const getMetalPrice = (query) => {
  return api.get(url.PRICE_API, query);
};

export const updateMetalPrice = (id, data) => {
  return api.patch(`${url.PRICE_API}/${id}`, data);
};

// tax
export const createTax = (data) => {
  return api.post(url.TAX_API, data);
};

export const getTax = (query) => {
  return api.get(url.TAX_API, query);
};

export const updateTax = (id, data) => {
  return api.patch(`${url.TAX_API}/${id}`, data);
};

// tax
export const createFilter = (data) => {
  return api.post(url.FILTER_API, data);
};

export const getFilter = (query) => {
  return api.get(url.FILTER_API, query);
};

export const deleteFilter = (id) => {
  return api.delete(`${url.FILTER_API}/${id}`);
};

export const deleteSingleFilter = (mainId, id) => {
  return api.delete(`${url.FILTER_API}/${mainId}/filter/${id}`);
};

export const updateFilter = (id, data) => {
  return api.patch(`${url.FILTER_API}/${id}`, data);
};

export const updateSingleFilter = (mainId, id, data) => {
  return api.patch(`${url.FILTER_API}/${mainId}/filter/${id}`, data);
};

// dashboard
export const getDashboard = () => {
  return api.get(url.DASHBOARD_API);
};
