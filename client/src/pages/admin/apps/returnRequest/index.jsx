import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReturnRequestThunk,
  updateReturnRequestThunk,
} from "../../../../store/actions";
import { Button, Card, CardBody, Col, Row, Table } from "react-bootstrap";
import ReturnRequestTableLoader from "./ReturnRequestTableLoader";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import { getMomentDate } from "../../../../components/common/MomentFun";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN as admin } from "../../../../routes/routesConstants";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import { itemLimitEnum, ReturnOrderStatusEnum } from "../../../../helpers/enum";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import SelectTag from "../../../../components/admin/selectTag/SelectTag";

const RefundsDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { returnRequest, returnOrderLoading, returnRequestPaginationData } =
    useSelector((store) => store.Orders);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const userRoleEnum = enumsData?.userRoleEnum;
  const ADMIN = admin();
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    limit: 10,
  });
  const [active, setActive] = useState(1);
  const returnOrderStatusColorEnum = ReturnOrderStatusEnum();

  const triggerRoleConfirmation = useConfirmationAlert({
    icon: "info",
    title: "Confirm Status Update",
    text: "Are you sure you want to update the status? This change cannot be undone.",
    confirmButtonText: "Update Status",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Status has been successfully updated.",
  });

  const handleStatusChanges = ({ values, id }) => {
    triggerRoleConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateReturnRequestThunk({ id, values })
        );
        if (updateReturnRequestThunk.fulfilled.match(response)) {
          dispatch(
            getReturnRequestThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateReturnRequestThunk.rejected.match(response)) {
          dispatch(
            getReturnRequestThunk({ page: active, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { search } = searchQuery;
    if (search === "") {
      setActive(1);
      dispatch(getReturnRequestThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (search !== "") {
          setActive(1);
          dispatch(getReturnRequestThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getReturnRequestThunk({ page, limit: searchQuery.limit }));
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="apps" pageTitle="Return request" />
      <Card
        className={`border common-border-color bg-transparent common-box-shadow br-5 overflow-hidden`}
      >
        {/* <CardHeader
          className={`p-3 border-bottom common-border-color bg-white`}
        >
          <div className={`table-title`}>
            <span
              className={`text-capitalize text-color-primary fs-16 fw-semibold lh-base`}
            >
              staff table
            </span>
          </div>
        </CardHeader> */}
        <CardBody className={`p-0`}>
          <Row
            className={`bg-white align-items-center filter-options p-3 pb-0 border-bottom common-border-color`}
          >
            <Col sm={6} xxl={5}>
              <Row className={`px-1`}>
                <Col xs={12} md={7} xxl={6} className={`px-2 mb-3`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={limit}
                      name="limit"
                      onChange={(e) => {
                        setActive(1);
                        handleSearch(e.target);
                      }}
                    >
                      {itemLimitEnum?.map((item, key) => {
                        return (
                          <option key={key} value={item}>
                            Show {item} item
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm={6} md={4} xxl={3} className="ms-auto mb-3 ps-sm-1 ps-md-4">
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
          </Row>
          {/* ======================
              Table Design Start 
           ======================*/}
          <div
            className={`table-responsive overflow-scroll-design bg-white px-0`}
          >
            {returnRequest && returnRequest.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-start border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        Order id
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer name
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer email
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        reason
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        date
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        items
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        status
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-top common-border-color border-end`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        total
                      </span>
                    </th>
                  </tr>
                </thead>
                {returnOrderLoading ? (
                  <ReturnRequestTableLoader />
                ) : (
                  <tbody>
                    {returnRequest.map((ele, index) => {
                      const id = ele._id;
                      const url = ele?.user?.url;
                      const username = ele?.user?.username;
                      const email = ele?.user?.email;
                      const orderId = ele?.orderId?.orderId;
                      const date = ele?.createdAt;
                      const reason = ele?.reason;
                      const status = ele?.status;
                      const items = ele?.orderId?.items?.length;
                      const total = ele?.orderId?.totalAmount;
                      const customerId = ele?.user?.customerId;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-top border-end common-border-color`}
                          >
                            <Link to={`${ADMIN.ORDERS.path}/${orderId}`}>
                              <span
                                className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                              >
                                {orderId}
                              </span>
                            </Link>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Button
                              className={`btn p-0 m-0 bg-transparent border-0 `}
                              onClick={() =>
                                navigate(`${ADMIN.CUSTOMER.path}/${customerId}`)
                              }
                            >
                              <div
                                className={`d-flex align-items-center gap-2`}
                              >
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
                                    className={`d-flex align-items-center gap-2 text-truncate fs-14 lh-base fw-medium text-color-primary text-capitalize`}
                                  >
                                    {username}
                                  </span>
                                </div>
                              </div>
                            </Button>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-top border-end common-border-color`}
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
                            className={`bg-white px-3 py-10 border-top border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {reason}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-top border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {getMomentDate(date, "DD MMM, YYYY")}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-top border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {items}
                            </span>
                          </td>
                          <td
                            className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <SelectTag
                              role={[userRoleEnum?.ADMIN, userRoleEnum?.SELLER]}
                              type={returnOrderStatusColorEnum[status]}
                              value={status}
                              options={
                                Object.keys(enumsData)?.length > 0 &&
                                Object.keys(
                                  enumsData?.returnOrderStatusEnum
                                )?.map((item, key) => {
                                  return (
                                    <option
                                      key={key}
                                      value={
                                        enumsData?.returnOrderStatusEnum[item]
                                      }
                                    >
                                      {enumsData?.returnOrderStatusEnum[item]}
                                    </option>
                                  );
                                })
                              }
                              onChange={(e) => {
                                handleStatusChanges({
                                  values: {
                                    status: e.target.value,
                                  },
                                  id,
                                });
                              }}
                            />
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-top common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {currencyHandler(total)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
            ) : (
              <div className={`mx-auto`}>
                <DynamicNoData
                  icon="bgebyztw"
                  title="Oops ! No Any Staff Yet !"
                  subTitle="Stay tuned for updates on our dedicated team members !"
                />
              </div>
            )}
          </div>
          {returnRequestPaginationData?.totalItems > 0 &&
          !returnOrderLoading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={returnRequestPaginationData?.totalItems}
                size={returnRequestPaginationData?.totalPages}
                step={1}
                onClickHandler={(value) => activeHandler(value)}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default RefundsDataTable;
