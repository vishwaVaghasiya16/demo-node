import { Col, Row, Table } from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { useEffect, useState } from "react";
// import { getCustomersThunk } from "../../../../store/actions";
import { Link, useParams } from "react-router-dom";
import {
  OrderStatusColorEnum,
  customPaginationLimit,
} from "../../../../helpers/enum";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import {
  getMomentDate,
  getMomentTime,
} from "../../../../components/common/MomentFun";
import Badge from "../../../../components/admin/badge/Badge";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { formatPhoneNumber } from "../../../../helpers/customFunctions";
import { getCustomersDetailsThunk } from "../../../../store/actions";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import CustomerOrdersTableLoader from "./CustomerOrdersTableLoader";
import { capitalize } from "lodash";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const { singleCustomerDetails, loading } = useSelector((store) => store.Auth);
  const { customerid } = useParams();
  const ADMIN = Admin();
  const orderStatusColorEnum = OrderStatusColorEnum();
  const [active, setActive] = useState(1);

  const activeHandler = (page) => {
    setActive(page);
  };

  useEffect(() => {
    dispatch(getCustomersDetailsThunk({ customerId: customerid }));
  }, [customerid, dispatch]);

  return (
    <>
      {Object.keys(singleCustomerDetails).length > 0 ? (
        <div className={`py-20`}>
          <BreadCrumb
            title="apps"
            pageTitle="customers"
            subPageTitle="customer details"
          />
          <Row>
            <Col xl={4} xxl={3}>
              <div
                className={`bg-white border common-border-color mb-3 mb-xl-0 p-3 br-5`}
              >
                <div
                  className={`user-details border-bottom common-border-color pb-3`}
                >
                  <div
                    className={`border common-border-color wh-150 rounded-circle overflow-hidden mx-auto`}
                  >
                    <img
                      src={singleCustomerDetails?.user?.url || defaultUserImg}
                      className="object-fit-cover h-100 w-100"
                      alt="profile-image"
                    />
                  </div>
                  <h4
                    className={`mt-2 mb-1 fs-16 lh-base fw-medium text-color-primary text-capitalize text-center`}
                  >
                    {singleCustomerDetails?.user?.username}
                  </h4>
                  <span
                    className={`text-center text-truncate d-block fs-14 lh-base fw-normal text-color-secondary`}
                  >
                    {singleCustomerDetails?.user?.email}
                  </span>
                </div>
                <div className={`user-extra-details pt-3`}>
                  <div className={`mb-3`}>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      customer ID
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      #{singleCustomerDetails?.user?.customerId}
                    </span>
                  </div>
                  <div className={`mb-3`}>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      phone
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      {singleCustomerDetails?.user?.phone
                        ? formatPhoneNumber(singleCustomerDetails?.user?.phone)
                        : "--"}
                    </span>
                  </div>
                  <div className={`mb-3`}>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      registered
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      {singleCustomerDetails?.user?.joiningDate
                        ? getMomentDate(
                            singleCustomerDetails?.user?.joiningDate,
                            "DD MMM, YYYY"
                          )
                        : singleCustomerDetails?.user?.createdAt
                        ? getMomentDate(
                            singleCustomerDetails?.user?.createdAt,
                            "DD MMM, YYYY"
                          )
                        : "--"}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      last order
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      {singleCustomerDetails?.orders?.length > 0
                        ? getMomentDate(
                            singleCustomerDetails?.orders[0]?.createdAt,
                            "DD MMM, YYYY"
                          )
                        : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={8} xxl={9}>
              <div className={`br-5 bg-white border common-border-color p-3`}>
                {singleCustomerDetails?.orders?.length > 0 ? (
                  <div>
                    {/* ======================
                  Table Design Start 
                ======================*/}
                    <div
                      className={`table-responsive border-bottom-0 border common-border-color overflow-scroll-design bg-white px-0`}
                    >
                      <Table className={`align-middle mb-0`}>
                        <thead>
                          <tr>
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
                                order date
                              </span>
                            </th>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                order time
                              </span>
                            </th>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                items
                              </span>
                            </th>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                price
                              </span>
                            </th>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                status
                              </span>
                            </th>
                          </tr>
                        </thead>
                        {loading ? (
                          <CustomerOrdersTableLoader />
                        ) : (
                          <tbody>
                            {singleCustomerDetails?.orders
                              ?.slice(
                                customPaginationLimit * (active - 1),
                                customPaginationLimit * active
                              )
                              ?.map((ele, index) => {
                                const id = ele?._id;
                                const orderId = ele?.orderId;
                                const createdAt = ele?.createdAt;
                                const items = ele?.items?.length;
                                const totalAmount = ele?.totalAmount;
                                const status = ele?.status;
                                return (
                                  <tr key={id || index}>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <Link
                                        to={`${ADMIN.ORDERS.path}/${orderId}`}
                                      >
                                        <span
                                          className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                        >
                                          #{orderId}
                                        </span>
                                      </Link>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {getMomentDate(
                                          createdAt,
                                          "DD MMM, YYYY"
                                        )}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {getMomentTime(createdAt)}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {items}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {currencyHandler(totalAmount)}
                                      </span>
                                    </td>
                                    <td
                                      className={`w-10 bg-white px-3 py-10 border-bottom common-border-color`}
                                    >
                                      <Badge
                                        text={status}
                                        type={
                                          orderStatusColorEnum[status] || ""
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        )}
                      </Table>
                    </div>
                    {singleCustomerDetails?.orders?.length > 0 && !loading ? (
                      <div className={`pt-3`}>
                        <PaginationDiv
                          active={active}
                          limit={customPaginationLimit}
                          totalItems={singleCustomerDetails?.orders?.length}
                          size={Math.ceil(
                            singleCustomerDetails?.orders?.length /
                              customPaginationLimit
                          )}
                          step={1}
                          icons={true}
                          onClickHandler={(value) => activeHandler(value)}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className={`mx-auto`}>
                    <DynamicNoData
                      icon="bgebyztw"
                      title="Oops ! No Any Orders Yet !"
                      subTitle="You will get all the orders of customer here !"
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div className={`mx-auto mt-3`}>
          <DynamicNoData
            icon="bgebyztw"
            title="No Customer Details Found"
            subTitle={`We couldn't find any customer details matching the ID: ${capitalize(
              customerid
            )} Please check the ID and try again.`}
          />
        </div>
      )}
    </>
  );
};

export default CustomerDetails;
