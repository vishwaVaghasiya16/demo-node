import { useSelector } from "react-redux";

const ACTION_CONSTANTS = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const orderStatusEnum = enumsData?.orderStatusEnum;
  const userRoleEnum = enumsData?.userRoleEnum;
  const admin = userRoleEnum?.ADMIN;
  const productManager = userRoleEnum?.PRODUCTMANAGER;
  const manager = userRoleEnum?.MANAGER;
  const seller = userRoleEnum?.SELLER;
  const contentEditor = userRoleEnum?.CONTENTEDITOR;
  const customerService = userRoleEnum?.CUSTOMERSERVICE;
  return {
    PRICE_TABLE: {
      EDIT: { role: [admin] },
    },
    COUPON: {
      EDIT: { role: [admin] },
      DELETE: { role: [admin, manager] },
    },
    ORDER_STATUS: {
      PENDING: { title: orderStatusEnum?.PENDING, role: [admin] },
      PROCESSING: { title: orderStatusEnum?.PROCESSING, role: [admin] },
      CANCEL: { title: orderStatusEnum?.CANCEL, role: [admin] },
      PICKED: { title: orderStatusEnum?.PICKED, role: [admin] },
      SHIPPING: { title: orderStatusEnum?.SHIPPING, role: [admin] },
      DELIVERED: { title: orderStatusEnum?.DELIVERED, role: [admin] },
      RETURNED: { title: orderStatusEnum?.RETURNED, role: [admin] },
      REFUNDED: { title: orderStatusEnum?.REFUNDED, role: [admin] },
    },
    DASHBOARD:{
      SALES_OVERVIEW:{role:[manager]}
    }
  };
};

const useHasPermission = ({ moduleObj = {} }) => {
  const { user } = useSelector((store) => store.Auth);

  if (!user?.role) return { permission: {}, count: 0 };
  const permissions = Object.fromEntries(
    Object?.entries(moduleObj)?.filter(([key, value]) =>
      value?.role?.length > 0 ? value?.role?.includes(user?.role) : value
    )
  );

  return {
    permission: permissions,
    count: Object.keys(permissions)?.length || 0,
  };
};

export { ACTION_CONSTANTS, useHasPermission };
