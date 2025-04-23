import { useSelector } from "react-redux";
import { ADMIN as Admin, CLIENT } from "../routes/routesConstants";

export const HeaderData = [
  {
    path: CLIENT.CATEGORY,
    name: "Rings",
    subRoutes: {
      title: "Shop by style(rings)",
      routes: [
        {
          path: CLIENT.RINGS.DIAMOND_ENGAGEMENT_RING,
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
        {
          path: "/diamond-engagement-ring",
          name: "diamond engagement ring",
        },
      ],
    },
  },
  {
    path: "/earrings",
    name: "Earrings",
  },
  {
    path: "/Bracelets-n-Bangles",
    name: "bracelets & bangles",
  },
  {
    path: "/solitaires",
    name: "Solitaires",
  },
  {
    path: "/mangalsutras",
    name: "Mangalsutras",
  },
  {
    path: "/necklaces",
    name: "Necklaces",
  },
  {
    path: "/more-jewelry",
    name: "More Jewelry",
  },
];

export const useUserInfoRoutes = () => {
  const { user } = useSelector((store) => store?.Auth);
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const ADMIN = Admin();
  const userInfoRoutesArray = [
    // {
    //   path: CLIENT.ACCOUNT_DETAILS.GIFT_CARD_BALANCE,
    //   name: "gift card balance",
    // },
    {
      path: CLIENT.ACCOUNT_DETAILS.CONTACT_US,
      name: "contact us",
    },
  ];

  return [
    ...(user?.role && user?.role !== enumsData?.userRoleEnum?.CUSTOMER
      ? [{ path: ADMIN.DASHBOARD.path, name: "admin panel" }]
      : []),
    ...(user?.role && user?.role === enumsData?.userRoleEnum?.CUSTOMER
      ? [
          {
            path: CLIENT.ACCOUNT_DETAILS.MY_ACCOUNT,
            name: "my account",
          },
          {
            path: CLIENT.ACCOUNT_DETAILS.ORDER_HISTORY,
            name: "order history",
          },
        ]
      : []),
    ...userInfoRoutesArray,
  ];
};
