import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import BreadCrumb from "../../../components/admin/breadCrumb/BreadCrumb";
import { AuthRoleColorEnum, itemLimitEnum } from "../../../helpers/enum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStaffsThunk,
  getStaffDetailsThunk,
  updateUserRoleAndActiveThunk,
} from "../../../store/actions";
import PaginationDiv from "../../../components/admin/pagination/PaginationDiv";
import useConfirmationAlert from "../../../components/common/sweetAlerts/ConfirmationAlert";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import StaffTableLoader from "./StaffTableLoader";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import { formatPhoneNumber } from "../../../helpers/customFunctions";
import SelectTag from "../../../components/admin/selectTag/SelectTag";
import { Link, useNavigate } from "react-router-dom";
import { CREATE } from "../../../routes/AdminRoutes";
import { ADMIN as Admin } from "../../../routes/routesConstants";

const Staff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allStaffs, userPaginationData, loading } = useSelector(
    (store) => store.Auth
  );
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const { user } = useSelector((store) => store.Auth);
  const [searchQuery, setSearchQuery] = useState({
    role: "",
    search: "",
    limit: 10,
  });
  const [active, setActive] = useState(1);
  const authRoleColorEnum = AuthRoleColorEnum();
  const ADMIN = Admin();

  const triggerRoleConfirmation = useConfirmationAlert({
    icon: "info",
    title: "Confirm Role Update",
    text: "Are you sure you want to update this staff role? This change cannot be undone.",
    confirmButtonText: "Update Role",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Staff role has been successfully updated.",
  });

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

  const handleRoleChanges = ({ id, values }) => {
    triggerRoleConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateUserRoleAndActiveThunk({ id, values })
        );
        if (updateUserRoleAndActiveThunk.fulfilled.match(response)) {
          dispatch(
            getAllStaffsThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          return true;
        }
        if (updateUserRoleAndActiveThunk.rejected.match(response)) {
          dispatch(
            getAllStaffsThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          return false;
        }
      },
    });
  };

  const handleIsActive = ({ values, id }) => {
    triggerUserActiveStatus({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateUserRoleAndActiveThunk({ id, values })
        );
        if (updateUserRoleAndActiveThunk.fulfilled.match(response)) {
          dispatch(
            getAllStaffsThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateUserRoleAndActiveThunk.rejected.match(response)) {
          dispatch(
            getAllStaffsThunk({ page: active, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  const handleNavigate = (empId) => {
    if (empId) {
      navigate(`${ADMIN.STAFF_ACCOUNT_SETTING.path}/${empId}`);
      dispatch(getStaffDetailsThunk({ staff: empId }));
    }
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { role, search } = searchQuery;
    if (role === "" && search === "") {
      setActive(1);
      dispatch(getAllStaffsThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (role !== "" || search !== "") {
          setActive(1);
          dispatch(getAllStaffsThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getAllStaffsThunk({ page, limit: searchQuery.limit }));
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="admin panel" pageTitle="staff" />
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
            <Col md={6} xxl={5}>
              <Row className={`px-1`}>
                <Col xs={12} md={6} className={`px-2 mb-3`}>
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
                {/* <Col xs={12} sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`text-capitalize fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={roleSelected}
                      name="role"
                      onChange={(e) => handleSearch(e.target)}
                    >
                      <option value={""}>all staff</option>
                      {Object?.keys(enumsData)?.length > 0 &&
                        Object?.keys(enumsData?.userRoleEnum)?.map(
                          (ele, index) => {
                            return (
                              ele !== "CUSTOMER" && (
                                <option
                                  key={index}
                                  value={enumsData?.userRoleEnum[ele]}
                                >
                                  {enumsData?.userRoleEnum[ele]}
                                </option>
                              )
                            );
                          }
                        )}
                    </select>
                  </div>
                </Col> */}
              </Row>
            </Col>
            <Col md={6} xxl={5} className="ms-auto">
              <Row className={`px-1 pe-0 justify-content-end`}>
                <Col sm={6} className={`px-2 mb-3`}>
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
                <Col className={`col-lg-auto px-2 mb-3`}>
                  <div className={`admin-primary-btn-div pe-1`}>
                    <Link
                      to={!loading && `${ADMIN.STAFF.path}${CREATE}`}
                      className={`text-center admin-primary-btn d-block ms-auto fs-15 fw-medium`}
                    >
                      <i className="ri-add-circle-line fs-16"></i> add staff
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ======================
              Table Design Start 
           ======================*/}
          <div
            className={`table-responsive overflow-scroll-design bg-white px-0`}
          >
            {allStaffs && allStaffs.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        EMP ID
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        name
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        email
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
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        role
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
                  <StaffTableLoader />
                ) : (
                  <tbody>
                    {allStaffs.map((ele, index) => {
                      const id = ele?._id;
                      const empId = ele?.empId;
                      const username = ele?.username;
                      const email = ele?.email;
                      const phone = ele?.phone;
                      const role = ele?.role;
                      const isActive = ele?.isActive;
                      const url = ele?.url;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Button
                              className={`btn p-0 m-0 bg-transparent border-0 `}
                              onClick={() => handleNavigate(empId)}
                            >
                              {/* <span
                                className={`text-truncate fs-14 lh-base ${
                                  empId
                                    ? user?.role ===
                                      enumsData?.userRoleEnum?.ADMIN
                                      ? "fw-medium"
                                      : role !== enumsData?.userRoleEnum?.ADMIN
                                      ? "fw-medium"
                                      : "fw-bold"
                                    : "fw-bold"
                                } text-color-secondary`}
                              > */}
                              <span
                                className={`text-truncate fs-14 lh-base ${
                                  empId ? "fw-medium" : "fw-bold"
                                } text-color-secondary`}
                              >
                                {empId ? empId : "--"}
                              </span>
                            </Button>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Button
                              className={`btn p-0 m-0 bg-transparent border-0 `}
                              onClick={() => handleNavigate(empId)}
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
                            className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <SelectTag
                              disabled={
                                empId && user?.email !== email ? false : true
                              }
                              value={role}
                              type={authRoleColorEnum[role]}
                              onChange={(e) =>
                                handleRoleChanges({
                                  values: {
                                    role: e.target.value,
                                    isActive,
                                  },
                                  id,
                                })
                              }
                              options={
                                Object.keys(enumsData)?.length > 0 &&
                                Object.keys(enumsData?.userRoleEnum)?.map(
                                  (item, key) => {
                                    return (
                                      item !== "CUSTOMER" && (
                                        <option
                                          key={key}
                                          value={enumsData?.userRoleEnum[item]}
                                        >
                                          {enumsData?.userRoleEnum[item]}
                                        </option>
                                      )
                                    );
                                  }
                                )
                              }
                            />
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

export default Staff;
