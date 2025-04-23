import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "../../../../components/admin/inputField/InputField";
import {
  createHomeDataThunk,
  deleteSingleDataThunk,
  getCategoryThunk,
  getHomeDataThunk,
  getSubCategoryThunk,
  updateHomeDataThunk,
  updateSingleHomeDataThunk,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import {
  addSpacesToCamelCase,
  isValidUrl,
} from "../../../../helpers/customFunctions";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import SelectField from "../../../../components/admin/inputField/SelectField";

const CollectionsSection = ({ sectionData, type }) => {
  const dispatch = useDispatch();
  const { createdHomeData, deleteLoading } = useSelector(
    (store) => store.CollectionsOverview
  );
  const { categoryData, subCategoryData } = useSelector(
    (store) => store.Categories
  );
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [mainId, setMainId] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const triggerDeleteConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Data",
    text: "Are you sure you want to delete the data?",
    confirmButtonText: "Delete Data",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Data has been successfully deleted.",
  });

  const handleDeleteData = async (ids) => {
    setDeleteId(ids.subId);
    triggerDeleteConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(deleteSingleDataThunk(ids));
        if (deleteSingleDataThunk.fulfilled.match(response)) {
          dispatch(getHomeDataThunk());
          return true;
        }
        if (deleteSingleDataThunk.rejected.match(response)) {
          dispatch(getHomeDataThunk());
          return false;
        }
      },
    });
  };

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEditUrl("");
    setEditId("");
    validation.resetForm();
  };

  const handleEditData = (values) => {
    setMainId(values.mainId);
    setEditId(values._id);
    setEditUrl(values.urls);
    validation.setValues({
      file: values.urls,
      category: values?.category?._id,
    });
    showModal();
  };

  const initialValues = {
    file: "",
    category: "",
  };

  const validationSchema = yup.object({
    file: yup.string().required("Please select the file"),
    category: yup.string().required("Please select the category"),
  });

  const validation = useFormik({
    name: "sliderValidation",
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const bodyFormData = new FormData();
        if (values.category) {
          bodyFormData.append("category", values.category);
        }
        setLoading(true);
        if (editId) {
          if (values.file instanceof File) {
            bodyFormData.append("file", values.file);
          }
          await dispatch(
            updateSingleHomeDataThunk({
              id: mainId,
              subId: editId,
              data: bodyFormData,
            })
          );
        } else {
          bodyFormData.append("file", values.file);
          bodyFormData.append("type", type);
          if (
            (sectionData && sectionData?._id) ||
            (createdHomeData?._id && createdHomeData?.type === type)
          ) {
            const id = sectionData?._id || createdHomeData?._id;
            await dispatch(updateHomeDataThunk({ id, data: bodyFormData }));
          } else {
            await dispatch(createHomeDataThunk(bodyFormData));
          }
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        dispatch(getHomeDataThunk());
        closeModal();
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!categoryData?.length > 0) {
      dispatch(getCategoryThunk());
    }
    if (!subCategoryData?.length > 0) {
      dispatch(getSubCategoryThunk());
    }
  }, [categoryData, subCategoryData, dispatch]);

  return (
    <div className={`banner-section bg-white p-3 pb-0 br-5`}>
      <div
        className={`top-header d-flex flex-wrap align-items-center justify-content-between`}
      >
        <div className={`mb-2`}>
          <span
            className={`text-capitalize text-color-primary fs-16 fw-medium lh-base`}
          >
            {addSpacesToCamelCase(type)} section
          </span>
        </div>
        <div className={`mb-3`}>
          <Button
            onClick={showModal}
            className={`text-center admin-primary-btn d-block ms-auto fs-15 fw-medium`}
          >
            <i className="ri-add-circle-line fs-16"></i> Add Data
          </Button>
        </div>
      </div>
      {sectionData && sectionData?.files?.length > 0 ? (
        <>
          <Row className={`px-1`}>
            {sectionData?.files?.map((ele) => {
              const id = ele?._id;
              const url = ele?.urls;
              const category = ele?.category?.title;
              return (
                <Col className={`mb-3 px-2`} key={id} md={6} xxl={4}>
                  <div className={`p-3 border common-border-color br-5`}>
                    <Form>
                      <div>
                        <div>
                          <p className="p-0 m-0 text-color-primary fw-medium fs-14 mb-1">
                            Upload Video
                          </p>
                          <div
                            className={`w-100 h-1_3-1 br-5 overflow-hidden h-2-1`}
                          >
                            <img
                              src={url}
                              className={`w-100 h-100 object-fit-cover`}
                              alt={`preview-image-${id}`}
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <SelectField
                            id="category"
                            label="category"
                            disabled={true}
                          >
                            <option value={category}>{category}</option>
                          </SelectField>
                        </div>
                      </div>
                      <Row className={`px-1 mt-3`}>
                        <Col xs={6} className={`px-2`}>
                          <Button
                            disabled={deleteLoading && deleteId === id}
                            onClick={() =>
                              handleDeleteData({
                                id: sectionData?._id || createdHomeData._id,
                                subId: id,
                              })
                            }
                            className={`border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100`}
                          >
                            {deleteLoading && deleteId === id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </Col>
                        <Col xs={6} className={`px-2`}>
                          <Button
                            onClick={() =>
                              handleEditData({
                                ...ele,
                                mainId: sectionData?._id,
                              })
                            }
                            className="d-block admin-primary-btn hover-bg-secondary w-100 fs-14"
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <div className={`mx-auto`}>
          <DynamicNoData
            icon="laqlvddb"
            title="Oops ! No Any Data Yet !"
            subTitle={`You will get ${addSpacesToCamelCase(
              type
            )?.toLowerCase()} section data here !`}
          />
        </div>
      )}
      {/* ============================ 
        banner slider model 
    ============================ */}
      <AdminModelWrapper
        show={modal}
        loading={loading}
        title={editId ? "Update Data" : "Add Data"}
        onSubmit={!validation.errors.file ? validation.handleSubmit : null}
        onHide={closeModal}
      >
        <Modal.Body>
          <div className="">
            <p className="p-0 m-0 text-color-primary fw-medium fs-14 mb-1">
              Upload Video
            </p>
            <div className="br-5 overflow-hidden border common-border-color">
              <MyFilePondComponent
                onlyImage={true}
                validation={validation}
                previewUrl={editUrl || ""}
              />
            </div>
            {validation.errors.file && (
              <p className="text-danger mt-1 mb-0 fs-12 fw-medium text-capitalize">
                {validation.errors.file}
              </p>
            )}
            <div className="mt-3">
              <SelectField
                name="category"
                id="category"
                label="category"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.category}
                isValid={
                  validation.touched.category && validation.errors.category
                }
                errorMessage={validation.errors.category}
              >
                <option value="">select category</option>
                {categoryData?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.title}
                    </option>
                  );
                })}
              </SelectField>
            </div>
          </div>
        </Modal.Body>
      </AdminModelWrapper>
    </div>
  );
};

CollectionsSection.propTypes = {
  sectionData: PropTypes.any,
  type: PropTypes.any,
};

export default CollectionsSection;
