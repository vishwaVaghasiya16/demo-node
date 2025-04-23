import { ADMIN as Admin } from "./routesConstants";
import Dashboard from "../pages/admin/dashboard";
import Category from "../pages/admin/master/category/Category";
import SubCategory from "../pages/admin/master/category/SubCategory";
import ProductsTable from "../pages/admin/master/products";
import ProductDetailsForm from "../pages/admin/master/products/ProductDetailsForm";
import Staff from "../pages/admin/staff";
import ProductVariantsTable from "../pages/admin/master/products/variants";
import VideCallScheduleTable from "../pages/admin/schedule/videocall";
import ContactUs from "../pages/admin/pages/contactus";
import OrdersTable from "../pages/admin/apps/orders";
import VariantDetailsForm from "../pages/admin/master/products/variants/VariantDetailsForm";
import Blog from "../pages/admin/pages/blog";
import BlogEditor from "../pages/admin/pages/blog/BlogEditor";
import PaymentTable from "../pages/admin/apps/payment";
import VideoBlog from "../pages/admin/pages/blog/VideoBlog";
import OrderDetails from "../pages/admin/apps/orders/OrderDetails";
import CustomersTable from "../pages/admin/apps/customer";
import CustomerDetails from "../pages/admin/apps/customer/CustomerDetails";
import AddStaffForm from "../pages/admin/staff/AddStaffForm";
import MyProfile from "../pages/admin/staff/staffprofile/MyProfile";
import StaffChangePassword from "../pages/admin/staff/staffprofile/StaffChangePassword";
import StaffConnections from "../pages/admin/staff/staffprofile/StaffConnections";
import PriceRange from "../pages/admin/master/price";
import ProductTax from "../pages/admin/master/tax";
import ProductCoupon from "../pages/admin/master/coupon";
import ProductReviewsTable from "../pages/admin/apps/reviews";
import RefundsDataTable from "../pages/admin/apps/returnRequest";
import ReviewDetailsPage from "../pages/admin/apps/reviews/ReviewDetailsPage";
import Home from "../pages/admin/pages/home";
import FilterMaster from "../pages/admin/master/filter";

export const PARAMS_SLUG = "/:slug";
export const UPDATE = "/update";
export const CREATE = "/create";
export const VARIANT = "/variant";
export const ORDERID = "/:orderid";
export const CUSTOMERID = "/:customerid";
export const EMPLOYEEID = "/:employeeid";
export const REVIEWID = "/:reviewid";

export const AdminRoutes = () => {
  const ADMIN = Admin();
  return [
    {
      role: ADMIN.DASHBOARD.role,
      path: ADMIN.DASHBOARD.path,
      component: <Dashboard />,
    },
    {
      role: ADMIN.STAFF.role,
      path: ADMIN.STAFF.path,
      component: <Staff />,
    },
    {
      role: ADMIN.STAFF.role,
      path: ADMIN.STAFF.path + CREATE,
      component: <AddStaffForm />,
    },
    {
      role: ADMIN.STAFF_ACCOUNT_SETTING.role,
      path: ADMIN.STAFF_ACCOUNT_SETTING.path + EMPLOYEEID,
      component: <MyProfile />,
    },
    {
      role: ADMIN.STAFF_ACCOUNT_SETTING.role,
      path: ADMIN.STAFF_ACCOUNT_SETTING.path + EMPLOYEEID,
      component: <MyProfile />,
    },
    {
      role: ADMIN.STAFF_CHANGE_PASSWORD.role,
      path: ADMIN.STAFF_CHANGE_PASSWORD.path + EMPLOYEEID,
      component: <StaffChangePassword />,
    },
    {
      role: ADMIN.STAFF_CONNECTIONS.role,
      path: ADMIN.STAFF_CONNECTIONS.path + EMPLOYEEID,
      component: <StaffConnections />,
    },
    {
      role: ADMIN.PRICE_RANGE.role,
      path: ADMIN.PRICE_RANGE.path,
      component: <PriceRange />,
    },
    {
      role: ADMIN.PRODUCT_TAX.role,
      path: ADMIN.PRODUCT_TAX.path,
      component: <ProductTax />,
    },
    {
      role: ADMIN.PRODUCT_COUPON.role,
      path: ADMIN.PRODUCT_COUPON.path,
      component: <ProductCoupon />,
    },
    {
      role: ADMIN.CATEGORY.role,
      path: ADMIN.CATEGORY.path,
      component: <Category />,
    },
    {
      role: ADMIN.SUB_CATEGORY.role,
      path: ADMIN.SUB_CATEGORY.path,
      component: <SubCategory />,
    },
    {
      role: ADMIN.FILTER.role,
      path: ADMIN.FILTER.path,
      component: <FilterMaster />,
    },
    {
      role: ADMIN.PRODUCT.role,
      path: ADMIN.PRODUCT.path,
      component: <ProductsTable />,
    },
    {
      role: ADMIN.PRODUCT.role,
      path: ADMIN.PRODUCT.path + UPDATE + PARAMS_SLUG,
      component: <ProductDetailsForm />,
    },
    {
      role: ADMIN.PRODUCT.role,
      path: ADMIN.PRODUCT.path + CREATE,
      component: <ProductDetailsForm />,
    },
    {
      role: ADMIN.PRODUCT.role,
      path: ADMIN.PRODUCT.path + PARAMS_SLUG + VARIANT,
      component: <ProductVariantsTable />,
    },
    {
      role: ADMIN.VARIANT.role,
      path: ADMIN.VARIANT.path + UPDATE + PARAMS_SLUG,
      component: <VariantDetailsForm />,
    },
    {
      role: ADMIN.VARIANT.role,
      path: ADMIN.VARIANT.path + PARAMS_SLUG + CREATE,
      component: <VariantDetailsForm />,
    },
    {
      role: ADMIN.VIDEO_CALL.role,
      path: ADMIN.VIDEO_CALL.path,
      component: <VideCallScheduleTable />,
    },
    {
      role: ADMIN.CONTACT_US.role,
      path: ADMIN.CONTACT_US.path,
      component: <ContactUs />,
    },
    {
      role: ADMIN.CUSTOMER.role,
      path: ADMIN.CUSTOMER.path,
      component: <CustomersTable />,
    },
    {
      role: ADMIN.CUSTOMER.role,
      path: ADMIN.CUSTOMER.path + CUSTOMERID,
      component: <CustomerDetails />,
    },
    {
      role: ADMIN.ORDERS.role,
      path: ADMIN.ORDERS.path,
      component: <OrdersTable />,
    },
    {
      role: ADMIN.ORDERS.role,
      path: ADMIN.ORDERS.path + ORDERID,
      component: <OrderDetails />,
    },
    {
      role: ADMIN.PAYMENT.role,
      path: ADMIN.PAYMENT.path,
      component: <PaymentTable />,
    },
    {
      role: ADMIN.REVIEWS.role,
      path: ADMIN.REVIEWS.path,
      component: <ProductReviewsTable />,
    },
    {
      role: ADMIN.REVIEWS.role,
      path: ADMIN.REVIEWS.path + REVIEWID,
      component: <ReviewDetailsPage />,
    },
    {
      role: ADMIN.RETURN_REQUEST.role,
      path: ADMIN.RETURN_REQUEST.path,
      component: <RefundsDataTable />,
    },
    {
      role: ADMIN.BLOG.role,
      path: ADMIN.BLOG.path,
      component: <Blog />,
    },
    {
      role: ADMIN.BLOG.role,
      path: ADMIN.BLOG.path,
      component: <Blog />,
    },
    {
      role: ADMIN.BLOG.role,
      path: ADMIN.BLOG_EDITOR.path + PARAMS_SLUG,
      component: <BlogEditor />,
    },
    {
      role: ADMIN.HOME.role,
      path: ADMIN.HOME.path,
      component: <Home />,
    },
  ];
};
