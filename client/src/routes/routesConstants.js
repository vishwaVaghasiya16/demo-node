import { useSelector } from "react-redux";

const AUTH = {
  RESET_PASSWORD: "/reset-password",
};

const CLIENT = {
  INDEX: "/",
  RINGS: {
    INDEX: "/rings",
    DIAMOND_ENGAGEMENT_RING: "/diamond-engagement-ring",
  },
  CATEGORY: "/jewellery",
  ACCOUNT_DETAILS: {
    MY_ACCOUNT: "/account-details/my-account",
    ORDER_HISTORY: "/account-details/order-history",
    // GIFT_CARD_BALANCE: "/account-details/gift-card-balance",
    CONTACT_US: "/account-details/contact-us",
  },
  POLICY: {
    PRIVACY_POLICY: "/privacy-policy",
    RETURN_POLICY: "/return-policy",
    TERMS_AND_CONDITIONS: "/terns-conditions",
  },
  ORDER_DETAILS: "/order-details",
  SEARCH: "/serach",
  PRODUCT_DETAILS: "/product-details",
  CART: "/cart",
  CHECK_OUT: "/checkout",
  PAYMENT_RESPONSE: "/payment-response",
  ABOUT_US: "/about-us",
  FAQ: "/faq",
  WISHLIST: "/wishlist",
  BLOG: "/blog",
  BLOG_DETAILS: "/blog/details",
};

const ADMIN = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const admin = enumsData?.userRoleEnum?.ADMIN;
  const productManager = enumsData?.userRoleEnum?.PRODUCTMANAGER;
  const manager = enumsData?.userRoleEnum?.MANAGER;
  const seller = enumsData?.userRoleEnum?.SELLER;
  const contentEditor = enumsData?.userRoleEnum?.CONTENTEDITOR;
  const customerService = enumsData?.userRoleEnum?.CUSTOMERSERVICE;
  return {
    DASHBOARD: {
      path: "/admin/dashboard",
      role: [],
    },
    STAFF: { path: "/admin/staff", role: [admin, manager] },
    STAFF_ACCOUNT_SETTING: {
      path: "/admin/staff/account-setting",
      role: [
        admin,
        productManager,
        seller,
        contentEditor,
        customerService,
        manager,
      ],
    },
    STAFF_CHANGE_PASSWORD: {
      path: "/admin/staff/change-password",
      role: [
        admin,
        productManager,
        seller,
        contentEditor,
        customerService,
        manager,
      ],
    },
    STAFF_CONNECTIONS: {
      path: "/admin/staff/connections",
      role: [
        admin,
        productManager,
        seller,
        contentEditor,
        customerService,
        manager,
      ],
    },
    CATEGORY: { path: "/admin/master/category", role: [admin, productManager] },
    SUB_CATEGORY: {
      path: "/admin/master/sub-category",
      role: [admin, productManager],
    },
    FILTER: { path: "/admin/master/filter", role: [admin, productManager] },
    PRICE_RANGE: {
      path: "/admin/master/price-range",
      role: [],
    },
    PRODUCT_TAX: {
      path: "/admin/master/product-tax",
      role: [admin, manager, productManager],
    },
    PRODUCT_COUPON: {
      path: "/admin/master/product-coupon",
      role: [],
    },
    PRODUCT: { path: "/admin/master/product", role: [admin, productManager] },
    VARIANT: { path: "/admin/master/variant", role: [admin, productManager] },
    VIDEO_CALL: { path: "/admin/schedule/video-call", role: [admin] },
    CONTACT_US: {
      path: "/admin/pages/contact-us",
      role: [admin, seller, contentEditor, customerService],
    },
    CUSTOMER: {
      path: "/admin/apps/customers",
      role: [admin, seller, productManager, manager],
    },
    ORDERS: {
      path: "/admin/apps/orders",
      role: [admin, seller, productManager, manager],
    },
    PAYMENT: {
      path: "/admin/apps/payments-list",
      role: [admin, seller, productManager, manager],
    },
    REVIEWS: {
      path: "/admin/apps/product-reviews",
      role: [],
    },
    RETURN_REQUEST: {
      path: "/admin/apps/return-request",
      role: [admin, seller],
    },
    BLOG: { path: "/admin/pages/blog", role: [admin, manager] },
    BLOG_EDITOR: {
      path: "/admin/pages/blog/text-editor",
    },
    HOME: { path: "/admin/pages/home", role: [admin, manager] },
  };
};

export { AUTH, CLIENT, ADMIN };
