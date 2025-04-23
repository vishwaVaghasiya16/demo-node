import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomersThunk,
  // getCustomersThunk,
  updateUserRoleAndActiveThunk,
} from "../../../../store/actions";
import { itemLimitEnum } from "../../../../helpers/enum";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import CustomerTableLoader from "./CustomerOrdersTableLoader";
import { getMomentDate } from "../../../../components/common/MomentFun";
import { Link } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { formatPhoneNumber } from "../../../../helpers/customFunctions";

const CustomersTable = () => {
  const dispatch = useDispatch();
  const { allCustomers, userPaginationData, loading } = useSelector(
    (store) => store.Auth
  );
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    limit: 10,
  });
  const [active, setActive] = useState(1);
  const ADMIN = Admin();

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  const triggerUserActiveStatus = useConfirmationAlert({
    icon: "info",
    title: "Confirm Staff Status",
    text: "Are you sure you want to update this user's status? This change cannot be undone.",
    confirmButtonText: "Update Status",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Staff status has been successfully updated.",
  });

  useEffect(() => {
    const { search } = searchQuery;
    if (search === "") {
      setActive(1);
      dispatch(getCustomersThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (search !== "") {
          setActive(1);
          dispatch(getCustomersThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getCustomersThunk({ page, limit: searchQuery.limit }));
  };

  const handleIsActive = ({ values, id }) => {
    triggerUserActiveStatus({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateUserRoleAndActiveThunk({ id, values })
        );
        if (updateUserRoleAndActiveThunk.fulfilled.match(response)) {
          dispatch(
            getCustomersThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateUserRoleAndActiveThunk.rejected.match(response)) {
          dispatch(
            getCustomersThunk({ page: active, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="apps" pageTitle="customers" />
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
            <Col sm={8} md={7} xl={6} xxl={5} className={`mb-3`}>
              <Row className={`px-1`}>
                <Col xs={12} sm={6} className={`px-2`}>
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
            {allCustomers && allCustomers.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer ID
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`w-18 text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
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
                        registered
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
                        phone
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        action
                      </span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <CustomerTableLoader />
                ) : (
                  <tbody>
                    {allCustomers.map((ele, index) => {
                      const id = ele?._id;
                      const registered = ele?.createdAt;
                      const customerId = ele?.customerId;
                      const customerName = ele?.username;
                      const url = ele?.url;
                      const email = ele?.email;
                      const phone = ele?.phone;
                      const isActive = ele?.isActive;
                      const role = ele?.role;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`w-18 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Link to={`${ADMIN.CUSTOMER.path}/${customerId}`}>
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {customerId}
                              </span>
                            </Link>
                          </td>
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
                                    className={`d-flex align-items-center gap-2 text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
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
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {getMomentDate(registered, "DD MMM, YYYY")}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {email}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`${
                                phone ? "fw-medium" : "fw-bold"
                              } fs-14 text-truncate lh-base text-color-secondary`}
                            >
                              {phone ? formatPhoneNumber(phone) : "--"}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom common-border-color`}
                          >
                            <div className="form-check form-switch">
                              <Form.Control
                                onChange={(e) =>
                                  handleIsActive({
                                    values: {
                                      role,
                                      isActive: e.target.checked,
                                    },
                                    id,
                                  })
                                }
                                checked={isActive}
                                type="checkbox"
                                className="cursor-pointer border common-border-color form-check-input"
                              />
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
                  icon="bgebyztw"
                  title="Oops ! No Any Staff Yet !"
                  subTitle="Stay tuned for updates on our dedicated team members !"
                />
              </div>
            )}
          </div>
          {userPaginationData?.totalItems > 0 && !loading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={userPaginationData?.totalItems}
                size={userPaginationData?.totalPages}
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

export default CustomersTable;
