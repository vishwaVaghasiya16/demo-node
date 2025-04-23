import { Card, CardBody, CardHeader, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import { Link } from "react-router-dom";
import Badge from "../../../components/admin/badge/Badge";
import PaginationDiv from "../../../components/admin/pagination/PaginationDiv";
import { useEffect, useState } from "react";
import { getMomentDate } from "../../../components/common/MomentFun";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { OrderStatusColorEnum } from "../../../helpers/enum";

const RecentOrdersCard = () => {
  const { data } = useSelector((store) => store.Dashboard);
  const [active, setActive] = useState(1);
  const [limit] = useState(5);
  const ADMIN = Admin();
  const orderStatusColorEnum = OrderStatusColorEnum();
  const [recentOrdersArray, setRecentOrdersArray] = useState([]);

  const handleSearch = (input) => {
    const { value } = input;

    const searchedDataArray = data?.recentOrders?.filter((ele) => {
      return (
        ele.orderId.toLowerCase().includes(value.toLowerCase()) ||
        ele.user.email.toLowerCase().includes(value.toLowerCase()) ||
        ele.user.username.toLowerCase().includes(value.toLowerCase())
      );
    });
    setRecentOrdersArray([...searchedDataArray]);
  };

  const activeHandler = (page) => {
    setActive(page);
  };

  useEffect(() => {
    if (data && data?.recentOrders?.length > 0) {
      const array = data?.recentOrders;
      setRecentOrdersArray([...array]);
    }
  }, [data]);

  return (
    <Card
      className={`min-h-464 lg-h-0 bg-white border common-border-color br-5 p-3`}
    >
      <CardHeader
        className={`border-0 bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-2 p-0`}
      >
        <div className={`heading`}>
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            recent orders
          </span>
        </div>
        <Col
          xs={12}
          sm={5}
          md={4}
          xl={4}
          xxl={3}
          className={`ms-auto ps-sm-1 ps-md-3`}
        >
          <div
            className={`bg-white h-40 px-3 d-flex align-items-center border common-border-color br-5 overflow-hidden`}
          >
            <i className="ri-search-line search-icon responsive fs-16 text-color-primary text-opacity-75 fw-medium"></i>
            <div className="search-box w-100">
              <input
                type="text"
                name="search"
                className={`bg-transparent placeholder-secondary focus-border-none form-control border-none ps-2 responsive fs-14 placeholder-fs-14 text-black text-color-primary`}
                placeholder="Search..."
                onChange={(e) => {
                  handleSearch(e.target);
                }}
              />
            </div>
          </div>
        </Col>
        {/* <div className={`total-count`}>
          <span
            className={`text-capitalize text-color-secondary fw-normal fs-14 lh-base`}
          >
            Total{" "}
            {data?.totalProductReviews
              ? formatNumber(data?.totalProductReviews)
              : 0}{" "}
            reviews
          </span>
        </div> */}
      </CardHeader>
      <CardBody
        className={`${
          recentOrdersArray?.length > 0
            ? ""
            : "d-flex align-items-center justify-content-center"
        } p-0`}
      >
        <div
          className={`table-responsive overflow-scroll-design bg-white px-0 mt-3`}
        >
          {recentOrdersArray && recentOrdersArray?.length > 0 ? (
            <Table
              className={`align-middle mb-0 table border common-border-color `}
            >
              <thead>
                <tr>
                  <th
                    className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      date
                    </span>
                  </th>
                  <th
                    className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      order ID
                    </span>
                  </th>
                  <th
                    className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      customer name
                    </span>
                  </th>
                  <th
                    className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      customer email ID
                    </span>
                  </th>
                  <th
                    className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      items
                    </span>
                  </th>
                  <th
                    className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      price
                    </span>
                  </th>
                  <th
                    className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      status
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrdersArray
                  ?.slice(limit * (active - 1), limit * active)
                  ?.map((ele, index) => {
                    const id = ele?._id;
                    const orderedDate = ele?.createdAt;
                    const orderId = ele?.orderId;
                    const customerId = ele?.user?.customerId;
                    const username = ele?.user?.username;
                    const url = ele?.user?.url;
                    const email = ele?.user?.email;
                    const items = ele?.items?.length;
                    const price = ele?.totalAmount;
                    const status = ele?.status;
                    return (
                      <tr key={id || index}>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {getMomentDate(orderedDate, "MMMM DD, YYYY")}
                          </span>
                        </td>
                        <td
                          className={`w-18 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <Link to={`${ADMIN.ORDERS.path}/${orderId}`}>
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {orderId}
                            </span>
                          </Link>
                        </td>
                        <td
                          className={`w-18 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <Link to={`${ADMIN.CUSTOMER.path}/${customerId}`}>
                            <div className={`d-flex align-items-center gap-2`}>
                              <div
                                className={`wh-35 border common-border-color rounded-circle overflow-hidden`}
                              >
                                <img
                                  loading="lazy"
                                  src={url || defaultUserImg}
                                  alt={`user-${id}`}
                                  className={`w-100 h-100 object-fit-cover`}
                                />
                              </div>

                              <div>
                                <span
                                  className={`d-flex align-items-center gap-2 text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                >
                                  {username}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <Link to={`${ADMIN.CUSTOMER.path}/${customerId}`}>
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {email}
                            </span>
                          </Link>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {items}
                          </span>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {price}
                          </span>
                        </td>
                        <td
                          className={`bg-white px-3 py-10 border-bottom common-border-color`}
                        >
                          <Badge
                            text={status}
                            type={orderStatusColorEnum[status]}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            <div className={`mx-auto`}>
              <DynamicNoData
                icon="odavpkmb"
                title="Oops ! No Any Products Yet !"
                subTitle="Stay alert for incoming products soon !"
              />
            </div>
          )}
        </div>
      </CardBody>
      {recentOrdersArray?.length > 0 ? (
        <div className={`pt-3`}>
          <PaginationDiv
            active={active}
            limit={limit}
            totalItems={recentOrdersArray?.length}
            size={Math.ceil(recentOrdersArray?.length / limit)}
            step={1}
            icons={true}
            onClickHandler={(value) => activeHandler(value)}
          />
        </div>
      ) : null}
    </Card>
  );
};

export default RecentOrdersCard;
