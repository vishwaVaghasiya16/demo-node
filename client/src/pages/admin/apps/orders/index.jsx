import { useEffect, useState } from "react";
import {
  getAllOrdersAdminThunk,
  updateOrderStatusThunk,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { Card, CardBody, CardHeader, Col, Row, Table } from "react-bootstrap";
import { OrderStatusColorEnum, itemLimitEnum } from "../../../../helpers/enum";
import { getMomentDate } from "../../../../components/common/MomentFun";
import Badge from "../../../../components/admin/badge/Badge";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import OrdersTableLoader from "./OrdersTableLoader";
import SelectTag from "../../../../components/admin/selectTag/SelectTag";

const OrdersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, ordersPaginationData, loading } = useSelector(
    (store) => store.Orders
  );
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    status: "",
    search: "",
    limit: 10,
  });
  const orderStatusColorEnum = OrderStatusColorEnum();
  const ADMIN = Admin();
  const [clickedMenuId, setClickedMenuId] = useState();
  const userRoleEnum = enumsData?.userRoleEnum;

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

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
        const response = await dispatch(updateOrderStatusThunk({ id, values }));
        if (updateOrderStatusThunk.fulfilled.match(response)) {
          dispatch(
            getAllOrdersAdminThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateOrderStatusThunk.rejected.match(response)) {
          dispatch(
            getAllOrdersAdminThunk({ page: active, limit: searchQuery.limit })
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
    const { status, search } = searchQuery;
    if (status === "" && search === "") {
      setActive(1);
      dispatch(getAllOrdersAdminThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (status !== "" || search !== "") {
          setActive(1);
          dispatch(getAllOrdersAdminThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getAllOrdersAdminThunk({ page, limit: searchQuery.limit }));
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="apps" pageTitle="orders" />
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
                      // value={status}
                      name="status"
                      onChange={(e) => handleSearch(e.target)}
                    >
                      <option value={""}>all orders</option>
                      {Object.keys(enumsData)?.length > 0 &&
                        Object.keys(enumsData?.orderStatusEnum)?.map(
                          (item, key) => {
                            return (
                              <option
                                key={key}
                                value={enumsData?.orderStatusEnum[item]}
                              >
                                {enumsData?.orderStatusEnum[item]}
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
            {orders && orders.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
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
                        date
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        paid
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
                        total
                      </span>
                    </th>
                    <th
                      className={`w-85px px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                    >
                      <span
                        className={`fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        actions
                      </span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <OrdersTableLoader />
                ) : (
                  <tbody>
                    {orders && orders.length > 0
                      ? orders.map((ele, index) => {
                          const id = ele?._id;
                          const orderId = ele?.orderId;
                          const orderDate = ele?.createdAt;
                          const customerName = ele?.user?.username;
                          const customerId = ele?.user?.customerId;
                          const url = ele?.user?.url;
                          const totalItems = ele?.items?.length;
                          const isPaid = ele?.isPaid;
                          const status = ele?.status;
                          const totalAmount = ele?.totalAmount;
                          return (
                            <tr key={id || index}>
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
                                  {getMomentDate(orderDate, "MMMM DD, YYYY")}
                                </span>
                              </td>
                              <td
                                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                              >
                                <Link
                                  to={`${ADMIN.CUSTOMER.path}/${customerId}`}
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
                                        className={`d-flex align-items-center gap-2 text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                      >
                                        {customerName}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td
                                className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                              >
                                <Badge
                                  text={isPaid ? "yes" : "no"}
                                  type={isPaid ? "success" : "warning"}
                                />
                              </td>
                              <td
                                className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                              >
                                <SelectTag
                                  disabled={!isPaid}
                                  role={[
                                    userRoleEnum?.ADMIN,
                                    // userRoleEnum?.MANAGER,
                                  ]}
                                  type={orderStatusColorEnum[status]}
                                  value={status}
                                  options={
                                    Object.keys(enumsData)?.length > 0 &&
                                    Object.keys(
                                      enumsData?.orderStatusEnum
                                    )?.map((item, key) => {
                                      return (
                                        <option
                                          key={key}
                                          value={
                                            enumsData?.orderStatusEnum[item]
                                          }
                                        >
                                          {enumsData?.orderStatusEnum[item]}
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
                                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                              >
                                <span
                                  className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                >
                                  {totalItems} items
                                </span>
                              </td>
                              <td
                                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                              >
                                <span
                                  className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                >
                                  {currencyHandler(Math.floor(totalAmount))}
                                </span>
                              </td>
                              <td
                                className={`w-fit bg-white px-3 py-10 border-bottom common-border-color`}
                              >
                                <ToggleMenu
                                  onClick={() => setClickedMenuId(id)}
                                  isOpen={id == clickedMenuId}
                                  rootClass={"tbody"}
                                >
                                  <p
                                    className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                    onClick={() =>
                                      navigate(
                                        `${ADMIN.ORDERS.path}/${orderId}`
                                      )
                                    }
                                  >
                                    View
                                  </p>
                                </ToggleMenu>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                )}
              </Table>
            ) : (
              <div className={`mx-auto`}>
                <DynamicNoData
                  icon="odavpkmb"
                  title="Oops ! No Any Orders Yet !"
                  subTitle="Keep an eye on upcoming orders !"
                />
              </div>
            )}
          </div>
          {ordersPaginationData?.totalItems > 0 && !loading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={ordersPaginationData?.totalItems}
                size={ordersPaginationData?.totalPages}
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

export default OrdersTable;
