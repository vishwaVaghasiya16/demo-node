import { Col, Modal, Row } from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectField from "../../../../components/admin/inputField/SelectField";
import InputField from "../../../../components/admin/inputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  createMetalPriceThunk,
  getMetalPriceThunk,
  updateMetalPriceThunk,
} from "../../../../store/actions";
import { getMomentDate } from "../../../../components/common/MomentFun";
import useClickOutside from "../../../../components/admin/useClickOutside";
import { setSinglePriceData } from "../../../../store/price/slice";
import { formatDate } from "../../../../helpers/customFunctions";
import {
  ACTION_CONSTANTS,
  useHasPermission,
} from "../../../../data/actionConstants";

const PriceRange = () => {
  const dispatch = useDispatch();
  const [isShowPriceModel, setIsShowPriceModel] = useState(false);
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const { priceData, singlePriceData, loading } = useSelector(
    (store) => store?.Price
  );
  const showModal = () => {
    setIsShowPriceModel(true);
  };
  const closeModal = () => {
    setIsShowPriceModel(false);
    dispatch(setSinglePriceData({}));
  };
  const [clickedMenuId, setClickedMenuId] = useState();
  const [isEdit, setIsEdit] = useState(Object.keys(singlePriceData).length > 0);

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

  const actionConstants = ACTION_CONSTANTS();
  const { permission, count } = useHasPermission({
    moduleObj: actionConstants.PRICE_TABLE,
  });

  const initialValues = {
    metal: "",
    ratePerGram: "",
    discountType: "",
    discountValue: "",
    discountDescription: "",
    startAt: "",
    endAt: "",
  };

  const validationSchema = yup.object({
    metal: yup.string().required("Metal name is required"),
    ratePerGram: yup
      .number()
      .min(1, "enter valid number")
      .required("Rate per gram is required"),
    discountType: yup.string(),
    discountValue: yup.number().min(0, "enter valid number"),
    // .required("discount value is required"),
    discountDescription: yup.string(),
    // .required("discount description is required"),
    startAt: yup.string(),
    // .required("start date is required"),
    endAt: yup.string(),
    // .required("end date is required"),
  });

  const validation = useFormik({
    name: "price validation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEdit) {
          const id = singlePriceData?._id;
          delete values.metal;
          await dispatch(updateMetalPriceThunk({ id, values }));
        } else {
          await dispatch(createMetalPriceThunk(values));
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        dispatch(getMetalPriceThunk());
        resetForm();
        closeModal();
      }
    },
  });

  const handleEdit = (values) => {
    showModal();
    dispatch(setSinglePriceData(values));
  };

  useEffect(() => {
    dispatch(getMetalPriceThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(singlePriceData).length > 0) setIsEdit(true);
    else setIsEdit(false);
  }, [singlePriceData]);

  useEffect(() => {
    validation.setValues({
      metal: singlePriceData.metal,
      ratePerGram: singlePriceData.ratePerGram,
      discountType: singlePriceData.discountType,
      discountValue: singlePriceData.discountValue,
      discountDescription: singlePriceData.discountDescription,
      startAt: formatDate(singlePriceData.startAt),
      endAt: formatDate(singlePriceData.endAt),
    });
  }, [singlePriceData]);

  return (
    <div className={`pt-20`}>
      <div>
        <BreadCrumb title="master" pageTitle="price range" />
      </div>
      <div>
        <Row className={`px-1`}>
          {priceData?.length > 0
            ? priceData?.map((ele) => {
                const id = ele?._id;
                const metal = ele?.metal;
                const ratePerGram = ele?.ratePerGram;
                const discountType = ele?.discountType;
                const discountValue = ele?.discountValue;
                const startAt = ele?.startAt;
                const endAt = ele?.endAt;
                return (
                  <Col
                    xs={12}
                    md={6}
                    xl={4}
                    xxl={3}
                    key={id}
                    className="px-2 pb-3"
                  >
                    <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                      <p className="text-truncate p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          metal:-{" "}
                        </span>
                        {metal}
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          rate per gram:-{" "}
                        </span>
                        {ratePerGram}
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          cost discount type:-{" "}
                        </span>
                        {discountType}
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          cost discount val:-{" "}
                        </span>
                        {discountValue}
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          Dis. Start Date:-{" "}
                        </span>
                        {startAt
                          ? getMomentDate(startAt, "DD MMM, YYYY")
                          : "--"}
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          Dis. End Date:-{" "}
                        </span>
                        {endAt ? getMomentDate(endAt, "DD MMM, YYYY") : "--"}
                      </p>
                      {count > 0 && (
                        <ToggleMenu
                          onClick={() => setClickedMenuId(id)}
                          isOpen={id == clickedMenuId}
                          margin="ms-auto"
                          iconColor="text-color-primary"
                        >
                          {permission?.EDIT && (
                            <p
                              className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                              onClick={() => handleEdit(ele)}
                            >
                              Edit
                            </p>
                          )}
                        </ToggleMenu>
                      )}
                    </div>
                  </Col>
                );
              })
            : null}
          <Col xs={12} md={6} xl={4} xxl={3} className="px-2 pb-3">
            <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">metal:- </span>
              </p>
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">
                  rate per gram:-{" "}
                </span>
              </p>
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">
                  cost discount type:-{" "}
                </span>
              </p>
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">
                  cost discount val:-{" "}
                </span>
              </p>
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">
                  Dis. Start Date:-{" "}
                </span>
              </p>
              <p className="p-0 m-0 fw-medium">
                <span className="text-color-secondary fw-normal">
                  Dis. End Date:-{" "}
                </span>
              </p>
              <p
                className="bg-light bg-opacity-20 border border-color-blue cursor-pointer hover-bg-opacity-30 w-21 h-21 d-flex align-items-center justify-content-center rounded-circle p-0 m-0 ms-auto "
                onClick={showModal}
              >
                {/* <i className={`ri-more-2-line ${iconColor} fs-14 fw-bold`}></i> */}
                <i className={`ri-add-line fs-12 fw-bold mx-auto`}></i>
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* =================================================== 
                            attribute model
          =================================================== */}

      <AdminModelWrapper
        show={isShowPriceModel}
        loading={loading}
        onHide={closeModal}
        title={isEdit ? "Edit Price" : "Add Price"}
        onSubmit={validation.handleSubmit}
      >
        <Modal.Body className={`pb-0`}>
          <Row>
            <Col xs={12} className={`mb-3`}>
              <InputField
                name="metal"
                id="metal"
                label="metal name *"
                readOnly={isEdit}
                placeholder="enter metal"
                value={validation.values.metal || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={validation.touched.metal && validation.errors.metal}
                errorMessage={validation.errors.metal}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                name="ratePerGram"
                id="ratePerGram"
                label="rate per gram *"
                placeholder="enter metal"
                type="number"
                value={validation.values.ratePerGram || 0}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.ratePerGram &&
                  validation.errors.ratePerGram
                }
                errorMessage={validation.errors.ratePerGram}
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <SelectField
                name="discountType"
                id="discountType"
                label="discount type *"
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
                name="discountValue"
                id="discountValue"
                label="discount value *"
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
                name="discountDescription"
                id="discountDescription"
                label="discount description *"
                placeholder="enter description"
                value={validation.values.discountDescription || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.discountDescription &&
                  validation.errors.discountDescription
                }
                errorMessage={validation.errors.discountDescription}
              />
            </Col>
            <Col xs={12} md={6} className={`mb-3`}>
              <InputField
                name="startAt"
                id="startAt"
                label="start date"
                type="date"
                value={validation.values.startAt || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={
                  validation.touched.startAt && validation.errors.startAt
                }
                errorMessage={validation.errors.startAt}
              />
            </Col>
            <Col xs={12} md={6} className={`mb-3`}>
              <InputField
                name="endAt"
                id="endAt"
                label="end date"
                type="date"
                value={validation.values.endAt || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                onReset={validation.handleReset}
                isValid={validation.touched.endAt && validation.errors.endAt}
                errorMessage={validation.errors.endAt}
              />
            </Col>
          </Row>
        </Modal.Body>
      </AdminModelWrapper>
    </div>
  );
};

export default PriceRange;
