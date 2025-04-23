import { CLIENT } from "../routes/routesConstants";
import { useSelector } from "react-redux";

const FooterData = () => {
  const { categoryData } = useSelector((store) => store?.Categories);
  // const categoryData = () => {
  //   return [...categoryData, { title: "Collections", path: CLIENT.CATEGORY }];
  // };
  return [
    {
      title: "Jewellery",
      routes: [
        ...categoryData,
        { title: "Collections", path: CLIENT.CATEGORY },
      ],
      // routes: [
      // { title: "About Us", path: CLIENT.ABOUT_US },
      // { title: "Core Values", path: "/core-values" },
      // { title: "Careers", path: "/careers" },
      // { title: "Press Releases", path: "/press-release" },
      // { title: "Blog", path: CLIENT.BLOG },
      // { title: "Sitemap", path: "/sitemap" },
      // ],
    },
    {
      title: "Order",
      routes: [
        {
          title: "Track Your Order",
          path: CLIENT.ACCOUNT_DETAILS.ORDER_HISTORY,
        },
        // { title: "Easy Returns", path: CLIENT.INDEX },
        // { title: "Shipping Different Way", path: CLIENT.INDEX },
        // { title: "Lifetime Warranty", path: CLIENT.INDEX },
      ],
    },
    {
      title: "Customer Service",
      routes: [
        { title: "FAQs", path: CLIENT.FAQ },
        { title: "Privacy Policy", path: CLIENT.POLICY.PRIVACY_POLICY },
        { title: "Return Policy", path: CLIENT.POLICY.RETURN_POLICY },
        {
          title: "terms & conditions",
          path: CLIENT.POLICY.TERMS_AND_CONDITIONS,
        },
        // { title: "Promo Code & Offers", path: CLIENT.INDEX },
      ],
    },
    {
      title: "CaratLane Advantage",
      routes: [
        { title: "Blog", path: CLIENT.BLOG },
        { title: "About Us", path: CLIENT.ABOUT_US },
        // { title: "Live Chat", path: CLIENT.INDEX },
        // { title: "Book Appointment", path: CLIENT.INDEX },
        // { title: "Stores", path: CLIENT.INDEX },
        { title: "Contact Us", path: CLIENT.ACCOUNT_DETAILS.CONTACT_US },
      ],
    },
  ];
};

export { FooterData as footerData };
