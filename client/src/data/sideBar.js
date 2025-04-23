import { useSelector } from "react-redux";
import { ADMIN as Admin } from "../routes/routesConstants";

export const useSideBarNavItemsData = () => {
  const { user } = useSelector((store) => store.Auth);
  const ADMIN = Admin();
  return [
    {
      id: "main",
      title: "main",
      navList: [
        {
          role: ADMIN.DASHBOARD.role,
          parentId: "main",
          id: "dashboard",
          label: "dashboard",
          path: ADMIN.DASHBOARD.path,
          icon: "ri-home-4-line",
        },
      ],
    },
    {
      id: "master",
      title: "master",
      navList: [
        {
          role: ADMIN.PRICE_RANGE.role,
          parentId: "master",
          id: "price-range",
          label: "price range",
          icon: "ri-price-tag-3-line",
          path: ADMIN.PRICE_RANGE.path,
        },
        {
          role: ADMIN.PRODUCT_TAX.role,
          parentId: "master",
          id: "product tax",
          label: "product tax",
          icon: "ri-draft-line",
          path: ADMIN.PRODUCT_TAX.path,
        },
        {
          role: ADMIN.PRODUCT_COUPON.role,
          parentId: "master",
          id: "product coupon",
          label: "product coupon",
          icon: "ri-coupon-line",
          path: ADMIN.PRODUCT_COUPON.path,
        },
        {
          parentId: "master",
          id: "category",
          label: "category",
          icon: "ri-survey-line",
          subItems: [
            {
              role: ADMIN.CATEGORY.role,
              parentId: "category",
              id: "main-category",
              label: "category",
              path: ADMIN.CATEGORY.path,
            },
            {
              role: ADMIN.SUB_CATEGORY.role,
              parentId: "category",
              id: "sub-category",
              label: "sub category",
              path: ADMIN.SUB_CATEGORY.path,
            },
          ],
        },
        {
          role: ADMIN.PRODUCT.role,
          parentId: "master",
          id: "product",
          label: "product",
          icon: "ri-box-3-line",
          path: ADMIN.PRODUCT.path,
        },
        {
          role: ADMIN.FILTER.role,
          parentId: "master",
          id: "filter",
          label: "filter",
          icon: "ri-equalizer-line",
          path: ADMIN.FILTER.path,
        },
      ],
    },
    {
      id: "admin-panel",
      title: "admin panel",
      navList: [
        {
          role: ADMIN.STAFF.role,
          parentId: "admin-panel",
          id: "staff",
          label: "staff",
          path: ADMIN.STAFF.path,
          icon: "ri-user-line",
        },
      ],
    },
    {
      id: "schedule",
      title: "schedule",
      navList: [
        {
          role: ADMIN.VIDEO_CALL.role,
          parentId: "schedule",
          id: "video-call",
          label: "video call",
          path: ADMIN.VIDEO_CALL.path,
          icon: "ri-video-on-line",
        },
      ],
    },
    {
      id: "apps",
      title: "apps",
      navList: [
        {
          role: ADMIN.CUSTOMER.role,
          parentId: "apps",
          id: "customer",
          label: "customer",
          icon: "ri-user-line",
          path: ADMIN.CUSTOMER.path,
        },
        {
          role: ADMIN.ORDERS.role,
          parentId: "apps",
          id: "orders",
          label: "orders",
          icon: "ri-shopping-cart-line",
          path: ADMIN.ORDERS.path,
        },
        {
          role: ADMIN.PAYMENT.role,
          parentId: "apps",
          id: "payments",
          label: "payments",
          icon: "ri-wallet-3-line",
          path: ADMIN.PAYMENT.path,
        },
        {
          role: ADMIN.REVIEWS.role,
          parentId: "apps",
          id: "reviews",
          label: "reviews",
          icon: "ri-star-line",
          path: ADMIN.REVIEWS.path,
        },
        {
          role: ADMIN.RETURN_REQUEST.role,
          parentId: "apps",
          id: "return request",
          label: "return request",
          icon: "ri-refund-line",
          path: ADMIN.RETURN_REQUEST.path,
        },
      ],
    },
    {
      id: "pages",
      title: "pages",
      navList: [
        {
          parentId: "pages",
          id: "inner-pages",
          label: "pages",
          icon: "ri-booklet-line",
          subItems: [
            {
              role: ADMIN.CONTACT_US.role,
              parentId: "inner-pages",
              id: "contact-us",
              label: "contact us",
              path: ADMIN.CONTACT_US.path,
            },
            {
              role: ADMIN.BLOG.role,
              parentId: "inner-pages",
              id: "blog",
              label: "blog",
              path: ADMIN.BLOG.path,
            },
            {
              role: ADMIN.HOME.role,
              parentId: "inner-pages",
              id: "home",
              label: "home",
              path: ADMIN.HOME.path,
            },
          ],
        },
      ],
    },
  ].filter((section) => {
    const hasRole = section.navList.some((item) => {
      return (
        item.role?.length === 0 ||
        (item.role?.length > 0 && item.role.includes(user?.role))
      );
    });

    const hasRoleInSubItems = section.navList.some(
      (item) =>
        item.subItems?.length > 0 &&
        item.subItems.some((subItem) => {
          return (
            subItem.role?.length === 0 ||
            (subItem.role?.length > 0 && subItem.role.includes(user?.role))
          );
        })
    );

    return hasRole || hasRoleInSubItems;
  });
};
