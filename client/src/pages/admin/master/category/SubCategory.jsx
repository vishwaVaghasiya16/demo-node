import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import useClickOutside from "../../../../components/admin/useClickOutside";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import SelectField from "../../../../components/admin/inputField/SelectField";
import {
  editSubCategoryThunk,
  getCategoryThunk,
  getSubCategoryThunk,
  postSubCategoryThunk,
} from "../../../../store/actions";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import { setIsSubCategoryEdit } from "../../../../store/categories/slice";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import SubCategoryLoader from "./SubCategoryLoader";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";

const SubCategory = () => {
  const {
    categoryData,
    subCategoryData,
    isSubCategoryEdit,
    loading,
    dataLoading,
  } = useSelector((store) => store.Categories);
  const [addCategoryModel, setAddCategoryModel] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [editUrl, setEditUrl] = useState("");
  const [clickedMenuId, setClickedMenuId] = useState();
  const [searchQuery, setSearchQuery] = useState({
    title: "",
  });
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    type: "",
    image: "",
    category: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    type: yup.string().required("type is required"),
    image: yup.mixed().required("Image is required"),
    category: yup.string().required("Category is required"),
  });

  const validation = useFormik({
    name: "categoryValidation",
    validationSchema,
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      if (isSubCategoryEdit) {
        const bodyFormData = new FormData();
        bodyFormData.append("title", values.title);
        bodyFormData.append("image", values.image);
        const response = await dispatch(
          editSubCategoryThunk({ id: selectedId, value: bodyFormData })
        );
        if (editSubCategoryThunk.fulfilled.match(response)) {
          setAddCategoryModel(false);
          setIsSubCategoryEdit(false);
          resetForm();
        }
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append("type", values.type);
        bodyFormData.append("title", values.title);
        bodyFormData.append("image", values.image);
        bodyFormData.append("category", values.category);
        const response = await dispatch(
          postSubCategoryThunk({ value: bodyFormData })
        );
        if (postSubCategoryThunk.fulfilled.match(response)) {
          setAddCategoryModel(false);
          resetForm();
        }
      }
    },
  });

  const handleAddSubCategoryModel = () => {
    dispatch(setIsSubCategoryEdit(false));
    setAddCategoryModel(!addCategoryModel);
    validation.resetForm();
    setEditUrl("");
  };

  useClickOutside([".menu-popup-parent", ".menu-popup"], () =>
    setClickedMenuId(null)
  );

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleEdit = (value) => {
    dispatch(setIsSubCategoryEdit(true));
    validation.setValues({
      category: value.category._id,
      title: value.title,
      type: value.type,
      image: value.url,
    });
    setEditUrl(value.url);
    setAddCategoryModel(true);
    setSelectedId(value._id);
  };

  useEffect(() => {
    const { title } = searchQuery;
    if (title === "") {
      dispatch(getSubCategoryThunk());
    } else {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getSubCategoryThunk(searchQuery));
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (!categoryData?.length > 0) {
      dispatch(getCategoryThunk());
    }
  }, [categoryData, dispatch]);

  return (
    <div className={`pt-20`}>
      <BreadCrumb title="master" pageTitle="sub category" />
      <div>
        <div className={`bg-white border common-border-color br-5 p-3`}>
          <Row className="px-1 align-items-center gap-3">
            <Col xs={12} sm={5} xl={4} xxl={3} className={`px-2`}>
              <div
                className={`bg-white h-40 px-3 d-flex align-items-center border common-border-color br-5 overflow-hidden`}
              >
                <i className="ri-search-line search-icon responsive fs-16 text-color-primary text-opacity-75 fw-medium"></i>
                <div className="search-box w-100">
                  <input
                    type="text"
                    name="title"
                    className={`bg-transparent placeholder-secondary focus-border-none form-control border-none ps-2 responsive fs-14 placeholder-fs-14 text-black text-color-primary`}
                    placeholder="Search..."
                    onChange={(e) => {
                      handleSearch(e.target);
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} className={`col-sm-auto ms-auto px-2`}>
              <Button
                className="d-block w-100 text-truncate admin-primary-btn d-block ms-auto fs-16"
                onClick={handleAddSubCategoryModel}
              >
                <i className="ri-add-circle-line fs-16"></i> add sub category
              </Button>
            </Col>
          </Row>
        </div>

        {/* ============================ 
                    category model 
            ============================ */}

        <AdminModelWrapper
          loading={loading}
          show={addCategoryModel}
          onHide={handleAddSubCategoryModel}
          title={isSubCategoryEdit ? "edit sub category" : "add sub category"}
          onSubmit={validation.handleSubmit}
        >
          <Modal.Body>
            <div className="">
              <p className="p-0 m-0 text-color-primary fw-medium fs-14 mb-1">
                Upload Image
              </p>
              <div className="br-5 overflow-hidden border common-border-color">
                {/* <FilePond
                  onaddfile={(error, file) => {
                    handleSubCategoryImage(file.file);
                  }}
                  onremovefile={() => {
                    validation.setFieldValue("image", "");
                  }}
                  acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                  maxFiles={5}
                  name="backgroundImage"
                  className="filepond filepond-input-multiple"
                /> */}
                <MyFilePondComponent
                  onlyImage={true}
                  validation={validation}
                  previewUrl={editUrl || ""}
                  name="image"
                />
              </div>
              {validation.touched.image && validation.errors.image && (
                <p className="text-danger p-0 m-0 mt-1 fs-12 fw-medium">
                  Please choose file
                </p>
              )}
              <div className="mt-3">
                <SelectField
                  disabled={isSubCategoryEdit ? true : false}
                  name="category"
                  id="category"
                  label="category name"
                  value={validation.values.category}
                  onChange={validation.handleChange}
                  onReset={validation.handleReset}
                  onBlur={validation.handleBlur}
                  isValid={
                    validation.touched.category && validation.errors.category
                  }
                  errorMessage={validation.errors.category}
                >
                  <option value="">Select Category</option>
                  {categoryData?.map((item, index) => {
                    return (
                      <option value={item._id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </SelectField>
              </div>

              {
                <Row className="mt-3">
                  <Col xs={6}>
                    <InputField
                      placeholder={"Sub category Title"}
                      label="title"
                      name="title"
                      id="title"
                      value={validation.values.title}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type="text"
                      isValid={
                        validation.touched.title && validation.errors.title
                      }
                      errorMessage={validation.errors.title}
                    />
                  </Col>
                  <Col xs={6}>
                    <InputField
                      placeholder={"Sub category Type"}
                      readOnly={isSubCategoryEdit ? true : false}
                      label="type"
                      name="type"
                      id="type"
                      value={validation.values.type}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type="text"
                      isValid={
                        validation.touched.type && validation.errors.type
                      }
                      errorMessage={validation.errors.type}
                    />
                  </Col>
                </Row>
              }
            </div>
          </Modal.Body>
        </AdminModelWrapper>

        {/* ============================ 
                  show all category
            ============================ */}

        {subCategoryData && subCategoryData?.length > 0 ? (
          <Row className="mt-3 category-card px-1">
            {dataLoading ? (
              <SubCategoryLoader />
            ) : (
              subCategoryData?.map((item, index) => {
                const id = item._id;
                const title = item.title;
                const type = item.type;
                const category = item?.category?.title;
                const image = item?.url;
                return (
                  <Col xs={12} sm={4} xl={3} key={index} className="mb-3 px-2">
                    <div className="p-3 bg-white br-5 d-flex flex-column gap-3 border common-border-color">
                      <div className="card-img br-5 overflow-hidden">
                        <img
                          className="w-100 common-border h-100 object-fit-cover"
                          src={image}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <div>
                          <p className="text-color-secondary fw-medium fs-14 p-0 m-0 mb-2 text-nowrap text-overflow-ellipsis">
                            <span className="text-color-primary">Id:</span> {id}{" "}
                          </p>
                          <p className="text-color-secondary fw-medium fs-14 p-0 m-0 mb-2 text-capitalize text-overflow-ellipsis">
                            <span className="text-color-primary">
                              Category:
                            </span>{" "}
                            {category}{" "}
                          </p>
                          <p className="text-color-secondary fw-medium fs-14 p-0 m-0 mb-2 text-capitalize text-overflow-ellipsis">
                            <span className="text-color-primary">Title:</span>{" "}
                            {title}{" "}
                          </p>
                          <p className="text-color-secondary fw-medium fs-14 p-0 m-0 mb-2 text-capitalize text-overflow-ellipsis">
                            <span className="text-color-primary">Type:</span>{" "}
                            {type}{" "}
                          </p>
                        </div>
                        <ToggleMenu
                          onClick={() =>
                            setClickedMenuId((pre) => (pre == id ? false : id))
                          }
                          isOpen={id == clickedMenuId}
                          margin="ms-auto"
                          iconColor="text-color-primary"
                        >
                          <p
                            className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </p>
                          {/* <hr className="p-0 m-0 hr-light" /> */}
                        </ToggleMenu>
                      </div>
                    </div>
                  </Col>
                );
              })
            )}
          </Row>
        ) : (
          <div className={`mx-auto`}>
            <DynamicNoData
              icon="unukghxb"
              title="Oops ! No Any Sub Category Yet !"
              subTitle="Keep an eye on upcoming sub category !"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
