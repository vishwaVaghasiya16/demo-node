import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersPaymentThunk,
  refundPaymentThunk,
} from "../../../../store/actions";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import {
  PaymentStatusColorEnum,
  itemLimitEnum,
} from "../../../../helpers/enum";
import { getMomentDate } from "../../../../components/common/MomentFun";
import Badge from "../../../../components/admin/badge/Badge";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import PaymentTableLoader from "./PaymentTableLoader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import { isWithinDays } from "../../../../helpers/customFunctions";

const PaymentTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentList, paymentsPaginationData, loading, refundPaymentLoading } =
    useSelector((store) => store.Payment);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const [isPaymentId, setIsPaymentId] = useState(1);
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    status: location?.state?.status || "",
    search: "",
    limit: 10,
  });
  const paymentStatusColorEnum = PaymentStatusColorEnum();
  const ADMIN = Admin();
  const triggerRefundPayment = useConfirmationAlert({
    icon: "info",
    title: "Confirm Refund Payment",
    text: "Are you sure you want to refund the payment?",
    confirmButtonText: "Refund",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Payment has been successfully refunded.",
  });

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleRefundPayment = (values) => {
    setIsPaymentId(values.paymentId);
    triggerRefundPayment({
      dispatchFunction: async () => {
        const response = await dispatch(refundPaymentThunk(values));
        if (refundPaymentThunk.fulfilled.match(response)) {
          dispatch(
            getAllOrdersPaymentThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          setIsPaymentId("");
          return true;
        }
        if (refundPaymentThunk.rejected.match(response)) {
          dispatch(
            getAllOrdersPaymentThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          setIsPaymentId("");
          return false;
        }
      },
    });
  };

  useEffect(() => {
    const { status, search } = searchQuery;
    if (status === "" && search === "") {
      setActive(1);
      if (location?.state?.status) {
        dispatch(
          getAllOrdersPaymentThunk({
            ...searchQuery,
            status: location?.state?.status,
          })
        );
      } else {
        dispatch(getAllOrdersPaymentThunk({ limit: searchQuery.limit }));
      }
    } else {
      if (search === "") {
        setActive(1);
        dispatch(
          getAllOrdersPaymentThunk({
            limit: searchQuery.limit,
            status: searchQuery.status,
          })
        );
      }
      const delayDebounceFn = setTimeout(() => {
        if (search !== "") {
          setActive(1);
          dispatch(getAllOrdersPaymentThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch, navigate, location?.state?.status]);

  useEffect(() => {
    window.history.replaceState({}, null);
  }, []);

  // useEffect(() => {
  //   if (location?.state?.status) {
  //     setSearchQuery({ ...searchQuery, status: location?.state?.status });
  //   }
  // }, [location?.state?.status]);

  // useEffect(() => {
  //   if (location?.state?.status) {
  //     // setSearchQuery({ ...searchQuery, status: location?.state?.status });
  //     dispatch(
  //       getAllOrdersPaymentThunk({
  //         ...searchQuery,
  //         status: location?.state?.status,
  //       })
  //     );
  //   }
  // }, [location, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getAllOrdersPaymentThunk({ page, ...searchQuery }));
  };
  return (
    <div className={`py-20`}>
      <BreadCrumb title="apps" pageTitle="payments" />
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
              orders table
            </span>
          </div>
        </CardHeader> */}
        <CardBody className={`p-0`}>
          <Row
            className={`bg-white align-items-center filter-options p-3 pb-0 border-bottom common-border-color`}
          >
            <Col sm={8} md={7} xl={6} xxl={5} className={`mb-3`}>
              <Row className={`px-1`}>
                <Col xs={12} sm={6} className={`mb-3 mb-sm-0 px-2`}>
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
                <Col xs={12} sm={6} className={`px-2`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`text-capitalize fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      value={location?.state?.status || searchQuery.status}
                      name="status"
                      onChange={(e) => {
                        navigate(location.pathname, { state: null });
                        handleSearch(e.target);
                      }}
                    >
                      <option value={""}>all payments</option>
                      {Object.keys(enumsData)?.length > 0 &&
                        Object.keys(enumsData?.paymentStatusEnum)?.map(
                          (item, key) => {
                            return (
                              <option
                                key={key}
                                value={enumsData?.paymentStatusEnum[item]}
                              >
                                {enumsData?.paymentStatusEnum[item]}
                              </option>
                            );
                          }
                        )}
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              sm={4}
              md={4}
              xl={3}
              className={`ms-auto mb-3 ps-sm-1 ps-md-3`}
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
          </Row>

          {/* ======================
            Table Design Start 
         ======================*/}
          <div
            className={`table-responsive overflow-scroll-design bg-white px-0`}
          >
            {paymentList && paymentList.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
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
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer email ID
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        order id
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        payment id
                      </span>
                    </th>
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
                        status
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        total
                      </span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <PaymentTableLoader />
                ) : (
                  <tbody>
                    {paymentList.map((ele, index) => {
                      const id = ele?._id;
                      const orderId = ele?.orderId?.orderId;
                      const orderDate = ele?.createdAt;
                      const customerName = ele?.customer?.username;
                      const customerId = ele?.customer?.customerId;
                      const url = ele?.customer?.url;
                      const email = ele?.customer?.email;
                      const totalAmount = ele?.amount;
                      const status = ele?.status;
                      const paymentId = ele?.paymentId;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Link to={`${ADMIN.CUSTOMER.path}/${customerId}`}>
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
                                    {customerName}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
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
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
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
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {paymentId || "--"}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {getMomentDate(orderDate, "DD MMM, YYYY")}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Badge
                              text={status}
                              type={paymentStatusColorEnum[status]}
                            />
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <div
                              className={`d-flex align-items-center justify-content-between`}
                            >
                              <div>
                                <span
                                  className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                >
                                  {currencyHandler(Math.floor(totalAmount))}
                                </span>
                              </div>
                              {status ===
                                enumsData?.paymentStatusEnum?.COMPLETED &&
                                isWithinDays(orderDate) && (
                                  <Button
                                    onClick={() =>
                                      handleRefundPayment({
                                        paymentId,
                                        amount: totalAmount,
                                      })
                                    }
                                    className={`${
                                      refundPaymentLoading &&
                                      paymentId === isPaymentId
                                        ? "spin"
                                        : ""
                                    } p-0 m-0 border-0 bg-transparent`}
                                  >
                                    <i className="spinner cursor-pointer fs-5 fw-normal text-color-secondary ri-loop-left-line"></i>
                                  </Button>
                                )}
                            </div>
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
                  icon="iawrhwdo"
                  title="Oops ! No Any Data Yet !"
                  subTitle="Keep an eye on upcoming payments !"
                />
              </div>
            )}
          </div>
          {paymentsPaginationData?.totalItems > 0 && !loading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={Number(searchQuery.limit)}
                totalItems={paymentsPaginationData?.totalItems}
                size={paymentsPaginationData?.totalPages}
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

export default PaymentTable;
