import { useSelector } from "react-redux";
import { ADMIN as Admin } from "../routes/routesConstants";

export const Dashboard = () => {
  const ADMIN = Admin();
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  return {
    cardDetails: [
      {
        name: enumsData?.paymentStatusEnum?.COMPLETED,
        iconImage: "/assets/admin/dashboard-earning.webp",
        iconBackground: "bg-color-dashboard-red",
        title: "total earnings",
        key: "totalEarning",
        redirect: ADMIN.PAYMENT.path,
        state: true,
      },
      {
        name: "order",
        iconImage: "/assets/admin/dashboard-order.webp",
        iconBackground: "bg-color-dashboard-green",
        title: "total orders",
        key: "totalOrders",
        redirect: ADMIN.ORDERS.path,
        state: false,
      },
      {
        name: "customer",
        iconImage: "/assets/admin/dashboard-customer.webp",
        iconBackground: "bg-color-dashboard-blue-1",
        title: "total customers",
        key: "totalCustomers",
        redirect: ADMIN.CUSTOMER.path,
        state: false,
      },
      {
        name: enumsData?.paymentStatusEnum?.REFUNDED,
        iconImage: "/assets/admin/dashboard-refund.webp",
        iconBackground: "bg-color-dashboard-blue-2",
        title: "total refunds",
        key: "refundOrders",
        redirect: ADMIN.PAYMENT.path,
        state: true,
      },
    ],
  };
};
