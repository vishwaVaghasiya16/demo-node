import { useSelector } from "react-redux";

export const currency = `₹`;

export const productViewTypeEnum = {
  GRID: "grid",
  LIST: "list",
};

export const iconsEnumKey = {
  FACEBOOK: "facebook",
  LINKEDIN: "linkedIn",
  TWITTER: "twitter-x",
  INSTAGRAM: "instagram",
};

export const iconsEnum = {
  [iconsEnumKey.FACEBOOK]: "ri-facebook-fill",
  [iconsEnumKey.LINKEDIN]: "ri-linkedin-box-fill",
  [iconsEnumKey.TWITTER]: "ri-twitter-x-fill",
  [iconsEnumKey.INSTAGRAM]: "ri-instagram-line",
};

export const authRequirementEnum = {
  AUTH_REQUIRED: "required",
  AUTH_NOT_REQUIRED: "not-required",
};

// Appointment Schedule Styling
export const AppointmentStatusEnum = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  return {
    [enumsData?.appointmentStatusEnum?.COMPLETED]: "success",
    [enumsData?.appointmentStatusEnum?.CONFIRM]: "info",
    [enumsData?.appointmentStatusEnum?.PENDING]: "warning",
    [enumsData?.appointmentStatusEnum?.CANCEL]: "danger",
  };
};

// Auth Role Styling
export const AuthRoleColorEnum = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  return {
    [enumsData?.userRoleEnum?.ADMIN]: "success",
    [enumsData?.userRoleEnum?.MANAGER]: "success",
    [enumsData?.userRoleEnum?.PRODUCTMANAGER]: "info",
    [enumsData?.userRoleEnum?.SELLER]: "warning",
    [enumsData?.userRoleEnum?.CONTENTEDITOR]: "info",
    [enumsData?.userRoleEnum?.CUSTOMERSERVICE]: "info",
  };
};

// Order Status Styling
export const OrderStatusColorEnum = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  return {
    [enumsData?.orderStatusEnum?.DELIVERED]: "success",
    [enumsData?.orderStatusEnum?.RETURNED]: "success",
    [enumsData?.orderStatusEnum?.REFUNDED]: "success",
    [enumsData?.orderStatusEnum?.PENDING]: "warning",
    [enumsData?.orderStatusEnum?.PENDING]: "warning",
    [enumsData?.orderStatusEnum?.PICKED]: "info",
    [enumsData?.orderStatusEnum?.PLACED]: "info",
    [enumsData?.orderStatusEnum?.PROCESSING]: "info",
    [enumsData?.orderStatusEnum?.SHIPPING]: "info",
    [enumsData?.orderStatusEnum?.CANCEL]: "danger",
  };
};

// Return Order Request Styling
export const ReturnOrderStatusEnum = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  return {
    [enumsData?.returnOrderStatusEnum?.REQUESTED]: "warning",
    [enumsData?.returnOrderStatusEnum?.PROCESSING]: "info",
    [enumsData?.returnOrderStatusEnum?.COMPLETED]: "success",
    [enumsData?.returnOrderStatusEnum?.REJECTED]: "danger",
  };
};

// Payment Status Styling
export const PaymentStatusColorEnum = () => {
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  return {
    [enumsData?.paymentStatusEnum?.COMPLETED]: "success",
    [enumsData?.paymentStatusEnum?.REFUNDED]: "info",
    [enumsData?.paymentStatusEnum?.PENDING]: "warning",
    [enumsData?.paymentStatusEnum?.TIMEOUT]: "danger",
    [enumsData?.paymentStatusEnum?.CANCELLED]: "danger",
    [enumsData?.paymentStatusEnum?.FAILED]: "danger",
  };
};

export const filterOptionsViewMoreLength = 2;

export const tableLoaderDataLength = 6;

export const customPaginationLimit = 10;

export const itemLimitEnum = [10, 25, 50, 100, 150, 200];

export const currencyEnum = "INR";

export const expireDateValue = 7;
