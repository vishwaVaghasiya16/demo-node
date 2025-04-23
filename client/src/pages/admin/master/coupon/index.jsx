import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useEffect, useState } from "react";
import CouponTableLoader from "./CouponTableLoader";
import SelectTag from "../../../../components/admin/selectTag/SelectTag";
import { itemLimitEnum } from "../../../../helpers/enum";
import * as yup from "yup";
import { useFormik } from "formik";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import InputField from "../../../../components/admin/inputField/InputField";
import SelectField from "../../../../components/admin/inputField/SelectField";
import { useDispatch, useSelector } from "react-redux";
import {
  createCouponThunk,
  deleteCouponThunk,
  getCouponByAdminThunk,
  updateCouponThunk,
} from "../../../../store/actions";
import { setSingleCouponDetails } from "../../../../store/coupon/slice";
import { getMomentDate } from "../../../../components/common/MomentFun";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import { formatDate } from "../../../../helpers/customFunctions";
import {
  ACTION_CONSTANTS,
  useHasPermission,
} from "../../../../data/actionConstants";

const ProductCoupon = () => {
  const dispatch = useDispatch();
  const {
    couponList,
    dataTableLoading,
    loading,
    singleCouponDetails,
    couponPaginationData,
  } = useSelector((store) => store.Coupon);
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const [isShowPriceModel, setIsShowPriceModel] = useState(false);
  const [isEdit, setIsEdit] = useState(
    Object.keys(singleCouponDetails).length > 0
  );
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    code: "",
    // isActive: "",
    limit: 10,
  });
  const [clickedMenuId, setClickedMenuId] = useState();

  const triggerStatusConfirmation = useConfirmationAlert({
    icon: "info",
    title: "Confirm Status Update",
    text: "Are you sure you want to update the status? This change cannot be undone.",
    confirmButtonText: "Update Status",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Status has been successfully updated.",
  });

  const triggerDeleteCouponConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Coupon",
    text: "Are you sure you want to delete the coupon?",
    confirmButtonText: "Delete Coupon",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Coupon has been successfully deleted.",
  });

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

  const showModal = () => {
    setIsShowPriceModel(true);
  };
  const closeModal = () => {
    setIsShowPriceModel(false);
    dispatch(setSingleCouponDetails({}));
    validation.resetForm();
  };

  const actionConstants = ACTION_CONSTANTS();
  const { permission, count } = useHasPermission({
    moduleObj: actionConstants.COUPON,
  });

  const initialValues = {
    code: "",
    discountType: "",
    discountValue: "",
    description: "",
    validAmount: "",
    endDate: "",
    isActive: true,
  };

  const validationSchema = yup.object({
    code: yup.string().required(),
    description: yup.string().required("Coupon description is required"),
    discountType: yup.string().required("Please select coupon discount type"),
    discountValue: yup.number().required("Coupon value is required"),
    validAmount: yup
      .number()
      .min(1, "Valid amount must be of in positive")
      .required("Valid amount is required"),
    endDate: yup
      .date()
      .min(new Date(), "Expiry date must be of future")
      .required("Expire date is required"),
    isActive: yup.boolean().default(true),
  });

  const validation = useFormik({
    name: "coupon validation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEdit) {
          const id = singleCouponDetails?._id;
          delete values.code;
          delete values.discountType;
          delete values.discountValue;
          delete values.validAmount;
          await dispatch(updateCouponThunk({ id, data: values }));
        } else {
          await dispatch(createCouponThunk(values));
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        dispatch(getCouponByAdminThunk());
        resetForm();
        closeModal();
      }
    },
  });

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getCouponByAdminThunk({ page, limit: searchQuery.limit }));
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleStatusChange = async (input) => {
    const { id, name, value } = input;
    triggerStatusConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateCouponThunk({ id, data: { [name]: value } })
        );
        if (updateCouponThunk.fulfilled.match(response)) {
          dispatch(
            getCouponByAdminThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateCouponThunk.rejected.match(response)) {
          dispatch(
            getCouponByAdminThunk({ page: active, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  const handleDeleteCoupon = async (id) => {
    triggerDeleteCouponConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(deleteCouponThunk(id));
        if (deleteCouponThunk.fulfilled.match(response)) {
          dispatch(
            getCouponByAdminThunk({ page: active, limit: searchQuery.limit })
          );
          return true;
        }
        if (deleteCouponThunk.rejected.match(response)) {
          dispatch(
            getCouponByAdminThunk({ page: active, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  const handleEditCouponData = (values) => {
    showModal();
    dispatch(setSingleCouponDetails(values));
  };

  useEffect(() => {
    const { isActive, code } = searchQuery;
    if ((!isActive || isActive === "") && code === "") {
      setActive(1);
      dispatch(getCouponByAdminThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (isActive !== "" || code !== "") {
          setActive(1);
          if (isActive === "true" || isActive === "false") {
            dispatch(getCouponByAdminThunk(searchQuery));
          } else {
            delete searchQuery.isActive;
            dispatch(getCouponByAdminThunk(searchQuery));
          }
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (Object.keys(singleCouponDetails).length > 0) setIsEdit(true);
    else setIsEdit(false);
  }, [singleCouponDetails]);

  useEffect(() => {
    if (Object.keys(singleCouponDetails).length > 0) {
      validation.setValues({
        code: singleCouponDetails.code,
        discountType: singleCouponDetails.discountType,
        discountValue: singleCouponDetails.discountValue,
        description: singleCouponDetails.description,
        validAmount: singleCouponDetails.validAmount,
        endDate: formatDate(singleCouponDetails.endDate),
        isActive: singleCouponDetails.isActive,
      });
    }
  }, [singleCouponDetails]);

  return (
    <div className={`py-20`}>
      <div>
        <BreadCrumb title="master" pageTitle="product coupon" />
      </div>
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
            <Col lg={6} xxl={5}>
              <Row className={`px-1`}>
                <Col xs={12} sm={6} className={`px-2 mb-3`}>
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
                <Col xs={12} sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`fs-14 text-capitalize w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={limit}
                      name="isActive"
                      onChange={(e) => {
                        handleSearch(e.target);
                      }}
                    >
                      <option value="">select status</option>
                      <option value={true}>active</option>
                      <option value={false}>not active</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} xxl={5} className="ms-auto">
              <Row className={`px-1 pe-0 justify-content-end`}>
                <Col sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`bg-white h-40 px-3 d-flex align-items-center border common-border-color br-5 overflow-hidden`}
                  >
                    <i className="ri-search-line search-icon responsive fs-16 text-color-primary text-opacity-75 fw-medium"></i>
                    <div className="search-box w-100">
                      <input
                        type="text"
                        name="code"
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
                    <Button
                      onClick={showModal}
                      className={`btn text-center admin-primary-btn d-block w-100 ms-auto fs-15 fw-medium`}
                    >
                      <i className="ri-add-circle-line fs-16"></i> add coupon
                    </Button>
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
            {couponList && couponList.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        code
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        type
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        discount
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        description
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        valid amount
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        expiry date
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
                    {count > 0 && (
                      <th
                        className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                      >
                        <span
                          className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                        >
                          actions
                        </span>
                      </th>
                    )}
                  </tr>
                </thead>
                {dataTableLoading ? (
                  <CouponTableLoader />
                ) : (
                  <tbody>
                    {couponList &&
                      couponList?.map((ele, index) => {
                        const id = ele?._id;
                        const code = ele?.code;
                        const type = ele?.discountType;
                        const value = ele?.discountValue;
                        const description = ele?.description;
                        const validAmount = ele?.validAmount;
                        const isActive = ele?.isActive;
                        const endDate = ele?.endDate;
                        return (
                          <tr key={id || index}>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-capitalize text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {code}
                              </span>
                            </td>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                              >
                                {type}
                              </span>
                            </td>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {value}
                              </span>
                            </td>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                              >
                                {description}
                              </span>
                            </td>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {validAmount}
                              </span>
                            </td>
                            <td
                              className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {getMomentDate(endDate, "DD MMM, YYYY")}
                              </span>
                            </td>
                            <td
                              className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                            >
                              <SelectTag
                                value={isActive}
                                type={isActive ? "success" : "danger"}
                                name="isActive"
                                id={id}
                                onChange={(e) => handleStatusChange(e.target)}
                                options={
                                  <>
                                    <option value={true}>Active</option>
                                    <option value={false}>Not Active</option>
                                  </>
                                }
                              />
                            </td>
                            {count > 0 && (
                              <td
                                className={`w-1 bg-white px-3 py-10 border-bottom common-border-color`}
                              >
                                <ToggleMenu
                                  onClick={() => setClickedMenuId(id)}
                                  isOpen={id == clickedMenuId}
                                  rootClass={"tbody"}
                                >
                                  {permission?.EDIT && (
                                    <p
                                      className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                      onClick={() => handleEditCouponData(ele)}
                                    >
                                      Edit
                                    </p>
                                  )}
                                  {permission?.DELETE && (
                                    <p
                                      className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                      onClick={() => handleDeleteCoupon(id)}
                                    >
                                      Delete
                                    </p>
                                  )}
                                </ToggleMenu>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </Table>
            ) : (
              <div className={`mx-auto`}>
                <DynamicNoData
                  icon="ivrqzesb"
                  title="Oops ! No Any Coupon Yet !"
                  subTitle="Currently no coupons available. Stay tuned for upcoming offers !"
                />
              </div>
            )}
          </div>
          {couponPaginationData?.totalItems > 0 && !dataTableLoading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={couponPaginationData?.totalItems}
                size={couponPaginationData?.totalPages}
                step={1}
                onClickHandler={(value) => activeHandler(value)}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>

      {/* =================================================== 
                            attribute model
          =================================================== */}

      <AdminModelWrapper
        show={isShowPriceModel}
        loading={loading}
        onHide={closeModal}
        title={isEdit ? "Edit Coupon" : "Add Coupon"}
        onSubmit={validation.handleSubmit}
      >
        <Modal.Body className={`pb-0`}>
          <Row>
            <Col xs={12} className={`mb-3`}>
              <InputField
                readOnly={isEdit}
                name="code"
                id="code"
                label="code *"
                placeholder="enter code"
                value={validation.values.code || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={validation.touched.code && validation.errors.code}
                errorMessage={validation.errors.code}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <SelectField
                disabled={isEdit}
                name="discountType"
                id="couponType"
                label="coupon type *"
                value={validation.values.discountType}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.discountType &&
                  validation.errors.discountType
                }
                errorMessage={validation.errors.discountType}
              >
                <option value="">Select type</option>

                {Object.keys(enumsData)?.length > 0 &&
                  Object.keys(enumsData?.discountTypeEnum)?.map((item, key) => {
                    return (
                      <option
                        key={key}
                        value={enumsData?.discountTypeEnum[item]}
                      >
                        {enumsData?.discountTypeEnum[item]}
                      </option>
                    );
                  })}
              </SelectField>
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                name="description"
                id="description"
                label="coupon description *"
                placeholder="enter description"
                value={validation.values.description || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.description &&
                  validation.errors.description
                }
                errorMessage={validation.errors.description}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                readOnly={isEdit}
                name="discountValue"
                id="couponValue"
                label="coupon value *"
                type="number"
                value={validation.values.discountValue || 0}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.discountValue &&
                  validation.errors.discountValue
                }
                errorMessage={validation.errors.discountValue}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                readOnly={isEdit}
                name="validAmount"
                id="validAmount"
                label="coupon validAmount *"
                placeholder="enter validAmount"
                type="number"
                value={validation.values.validAmount || 0}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.validAmount &&
                  validation.errors.validAmount
                }
                errorMessage={validation.errors.validAmount}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <SelectField
                name="isActive"
                id="isActive"
                label="status *"
                value={validation.values.isActive}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.isActive && validation.errors.isActive
                }
                errorMessage={validation.errors.isActive}
              >
                <option value={true}>active</option>
                <option value={false}>not active</option>
              </SelectField>
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                name="endDate"
                id="endDate"
                label="expiry date *"
                type="date"
                value={validation.values.endDate || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.endDate && validation.errors.endDate
                }
                errorMessage={validation.errors.endDate}
              />
            </Col>
          </Row>
        </Modal.Body>
      </AdminModelWrapper>
    </div>
  );
};

export default ProductCoupon;
