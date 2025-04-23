import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import { CREATE } from "../../../routes/AdminRoutes";
import { setClearProductDetails } from "../../../store/productDetails/slice";
import DetailsCards from "./DetailsCards";
import { useEffect } from "react";
import { getDashboardThunk } from "../../../store/actions";
import { Col, Row } from "react-bootstrap";
import ReviewsCard from "./ReviewsCard";
import BestSellingProductCard from "./BestSellingProductCard";
import RecentOrdersCard from "./RecentOrdersCard";
import SalesOverviewCard from "./SalesOverviewCard";
import OrderSummaryCard from "./OrderSummaryCard";
import {
  ACTION_CONSTANTS,
  useHasPermission,
} from "../../../data/actionConstants";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const ADMIN = Admin();
  const actionConstants = ACTION_CONSTANTS();
  const { permission } = useHasPermission({
    moduleObj: actionConstants.DASHBOARD,
  });

  const getTimeOfDay = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };
  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    // if (data && Object.keys(data).length === 0) {
    // }
    dispatch(getDashboardThunk());
  }, [dispatch]);

  return (
    <div className={`py-20`}>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 ">
        <div className="flex-grow-1">
          <h4 className="responsive fs-16 mb-1 text-capitalize text-color-primary">
            Good {timeOfDay}, {user?.username || "user"}!
          </h4>
          <p className="responsive fs-14 text-muted mb-0 text-color-secondary">
            Here&apos;s what&apos;s happening.
          </p>
        </div>
        <div>
          <Link
            onClick={() => dispatch(setClearProductDetails())}
            to={`${ADMIN.PRODUCT.path}${CREATE}`}
            className={`text-truncate text-center admin-primary-btn d-block ms-auto fs-15 fw-medium`}
          >
            <i className="ri-add-circle-line fs-16"></i> add product
          </Link>
        </div>
      </div>
      <div className="details-cards">
        <DetailsCards />
      </div>
      <Row className={`px-1`}>
        <Col xl={7} xxl={8} className={`mt-3 px-2`}>
          <SalesOverviewCard />
        </Col>
        <Col xl={5} xxl={4} className={`mt-3 px-2`}>
          <OrderSummaryCard />
        </Col>
      </Row>
      <Row className={`px-1`}>
        <Col xl={5} xxl={4} className={`top-reviews-list px-2 mt-3`}>
          <ReviewsCard />
        </Col>
        <Col xl={7} xxl={8} className={`best-selling-product-table px-2 mt-3`}>
          <BestSellingProductCard />
        </Col>
      </Row>
      <div className={`recent-orders-table mt-3`}>
        <RecentOrdersCard />
      </div>
    </div>
  );
};

export default Dashboard;
