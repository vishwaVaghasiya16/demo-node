// import Home from "../pages/web/Home";

import ContactUs from "../pages/web/accountDetails/contactUs";
import MyAccount from "../pages/web/accountDetails/myAccount";
import AboutUs from "../pages/web/aboutUs";
import ShowProducts from "../pages/web/products/ShowProducts";
import { CLIENT } from "./routesConstants";
import ProductDetails from "../pages/web/productDetails";
import Cart from "../pages/web/cart";
import CheckOut from "../pages/web/cart/checkOut";
import LandingPage from "../pages/web/home";
import Wishlist from "../pages/web/wishlist";
import Blogs from "../pages/web/blogs";
import Faq from "../pages/web/faq";
import Privacy from "../pages/web/policy/Privacy";
import Return from "../pages/web/policy/Return";
import TermsAndConditions from "../pages/web/policy/TermsAndConditions";
import { authRequirementEnum } from "../helpers/enum";
import BlogDetails from "../pages/web/blogs/BlogDetails";
import PaymentResponse from "../pages/web/cart/paymentResponse";
import CollectionsOverview from "../pages/web/collectionsOverview";
import OrderHistory from "../pages/web/accountDetails/orderHistory";
import OrderDetails from "../pages/web/accountDetails/orderHistory/OrderDetails";
import SearchProduct from "../pages/web/products/SearchProduct";

const PARAMS_SLUG = "/:slug";
const PARAMS_ID = "/:id";
const PARAMS_CATEGORY_SLUG = "/:categoryslug";
const PARAMS_SUBCATEGORY_SLUG = "/:subcategoryslug";
const RAZORPAY_ID = "/:razorpayid";

const authRequired = authRequirementEnum.AUTH_REQUIRED;
const authNotRequired = authRequirementEnum.AUTH_NOT_REQUIRED;

export const WebRoutes = [
  {
    authRequirement: authNotRequired,
    path: CLIENT.INDEX,
    component: <LandingPage />,
  },
  {
    authRequirement: authNotRequired,
    path: CLIENT.CATEGORY,
    component: <CollectionsOverview />,
  },
  /* My Account Pages */
  {
    authRequirement: authRequired,
    path: CLIENT.ACCOUNT_DETAILS.MY_ACCOUNT,
    component: <MyAccount />,
  },
  {
    authRequirement: authRequired,
    path: CLIENT.ACCOUNT_DETAILS.CONTACT_US,
    component: <ContactUs />,
  },
  {
    authRequirement: authRequired,
    path: CLIENT.ACCOUNT_DETAILS.ORDER_HISTORY,
    component: <OrderHistory />,
  },
  {
    authRequired: authNotRequired,
    path: CLIENT.ORDER_DETAILS + PARAMS_ID,
    component: <OrderDetails />,
  },
  {
    authRequirement: authNotRequired,
    path: CLIENT.PRODUCT_DETAILS + PARAMS_SLUG,
    component: <ProductDetails />,
  },
  /* Show Product Page */
  {
    authRequirement: authNotRequired,
    // path: CLIENT.CATEGORY + PARAMS_SLUG,
    path: `${CLIENT.CATEGORY}${PARAMS_CATEGORY_SLUG}${PARAMS_SUBCATEGORY_SLUG}?`,
    component: <ShowProducts />,
  },
  // search product
  {
    authRequired: authNotRequired,
    path: CLIENT.SEARCH + PARAMS_SLUG,
    component: <SearchProduct />,
  },
  // Cart page
  {
    authRequirement: authRequired,
    path: CLIENT.CART,
    component: <Cart />,
  },
  // Checkout page
  {
    authRequirement: authRequired,
    path: CLIENT.CHECK_OUT,
    component: <CheckOut />,
  },
  // Payment response page
  {
    authRequirement: authRequired,
    path: CLIENT.PAYMENT_RESPONSE + RAZORPAY_ID,
    component: <PaymentResponse />,
  },
  // Other page
  {
    authRequirement: authNotRequired,
    path: CLIENT.ABOUT_US,
    component: <AboutUs />,
  },
  {
    authRequirement: authNotRequired,
    path: CLIENT.FAQ,
    component: <Faq />,
  },
  // Policy page
  {
    authRequirement: authNotRequired,
    path: CLIENT.POLICY.PRIVACY_POLICY,
    component: <Privacy />,
  },
  {
    authRequirement: authNotRequired,
    path: CLIENT.POLICY.RETURN_POLICY,
    component: <Return />,
  },
  {
    authRequirement: authNotRequired,
    path: CLIENT.POLICY.TERMS_AND_CONDITIONS,
    component: <TermsAndConditions />,
  },
  // wishlist
  {
    authRequirement: authRequired,
    path: CLIENT.WISHLIST,
    component: <Wishlist />,
  },
  // blog
  {
    authRequirement: authNotRequired,
    path: CLIENT.BLOG,
    component: <Blogs />,
  },
  {
    authRequired: authNotRequired,
    path: CLIENT.BLOG_DETAILS + PARAMS_SLUG,
    component: <BlogDetails />,
  },
];
