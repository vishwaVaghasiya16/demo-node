import { useFormik } from "formik";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import InputField from "../../../../components/admin/inputField/InputField";
import * as yup from "yup";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import useClickOutside from "../../../../components/admin/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategoryThunk,
  getCategoryThunk,
  postCategoryThunk,
} from "../../../../store/actions";
import { setIsCategoryEdit } from "../../../../store/categories/slice";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import CategoryLoader from "./CategoryLoader";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";

const Category = () => {
  const { categoryData, isCategoryEdit, loading, dataLoading } = useSelector(
    (store) => store.Categories
  );
  const [addCategoryModel, setAddCategoryModel] = useState(false);
  const [clickedMenuId, setClickedMenuId] = useState();
  const [selectedId, setSelectedId] = useState();
  const [editUrl, setEditUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    title: "",
  });
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    // type: "",
    image: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    // type: yup.string().required("type is required"),
    image: yup.mixed().required("Image is required"),
  });

  const validation = useFormik({
    name: "categoryValidation",
    validationSchema,
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      if (isCategoryEdit) {
        const bodyFormData = new FormData();
        bodyFormData.append("title", values.title);
        bodyFormData.append("image", values.image);
        const response = await dispatch(
          editCategoryThunk({ id: selectedId, value: bodyFormData })
        );
        if (editCategoryThunk.fulfilled.match(response)) {
          dispatch(setIsCategoryEdit(false));
          setAddCategoryModel(false);
          resetForm();
        }
      } else {
        const bodyFormData = new FormData();
        // bodyFormData.append("type", values.type);
        bodyFormData.append("title", values.title);
        bodyFormData.append("image", values.image);
        const response = await dispatch(
          postCategoryThunk({ value: bodyFormData })
        );
        if (postCategoryThunk.fulfilled.match(response)) {
          setAddCategoryModel(false);
          resetForm();
        }
      }
    },
  });

  const handleAddCategoryModel = () => {
    dispatch(setIsCategoryEdit(false));
    setAddCategoryModel(!addCategoryModel);
    validation.resetForm();
    setEditUrl("");
  };

  useClickOutside([".menu-popup-parent", ".menu-popup"], () =>
    setClickedMenuId(null)
  );

  const handleEdit = async (value) => {
    dispatch(setIsCategoryEdit(true));
    setEditUrl(value.url);
    validation.setValues({
      title: value.title,
      image: value.url,
    });
    setAddCategoryModel(true);
    setSelectedId(value._id);
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { title } = searchQuery;
    if (title === "") {
      dispatch(getCategoryThunk());
    } else {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getCategoryThunk(searchQuery));
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [dispatch, searchQuery]);

  return (
    <div className={`pt-20`}>
      <BreadCrumb title="master" pageTitle="category" />
      <div>
        <div className={`p-3 bg-white border common-border-color br-5 mb-3`}>
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
                onClick={handleAddCategoryModel}
              >
                <i className="ri-add-circle-line fs-16"></i> add category
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
          title={isCategoryEdit ? "edit category" : "Add category"}
          onSubmit={validation.handleSubmit}
          onHide={handleAddCategoryModel}
        >
          <Modal.Body>
            <div className="">
              <p className="p-0 m-0 text-color-primary fw-medium fs-14 mb-1">
                Upload Image
              </p>
              <div className="br-5 overflow-hidden border common-border-color">
                <MyFilePondComponent
                  onlyImage={true}
                  validation={validation}
                  previewUrl={editUrl || ""}
                  name="image"
                />
                {/* <FilePond
                  onaddfile={(error, file) => {
                    handleCategoryImage(file.file);
                  }}
                  onremovefile={() => {
                    validation.setFieldValue("image", "");
                  }}
                  acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                  maxFiles={1}
                  name="backgroundImage"
                  // className="filepond filepond-input-multiple"
                /> */}
              </div>
              {validation.touched.image && validation.errors.image && (
                <p className="text-danger p-0 m-0">Please choose file</p>
              )}
              <Row className="mt-3">
                <InputField
                  placeholder={"category name"}
                  label="category name"
                  name="title"
                  id="title"
                  value={validation.values.title}
                  onChange={validation.handleChange}
                  onReset={validation.handleReset}
                  onBlur={validation.handleBlur}
                  type="text"
                  isValid={validation.touched.title && validation.errors.title}
                  errorMessage={validation.errors.title}
                />
              </Row>
            </div>
          </Modal.Body>
          {/* <Modal.Footer className="common-border-color">
              <Button
                className={`border-0 bg-color-dusty-red fs-14 px-4 py-2`}
                onClick={handleAddCategoryModel}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="admin-primary-btn fs-14"
                // onClick={handleAddCategoryModel}
              >
                {isCategoryEdit ? "Edit" : "Add"} category
              </Button>
            </Modal.Footer> */}
        </AdminModelWrapper>

        {/* ============================ 
              show all category
        ============================ */}
        {categoryData && categoryData?.length > 0 ? (
          <Row className="mt-3 category-card px-1">
            {dataLoading ? (
              <CategoryLoader />
            ) : (
              categoryData?.map((item, index) => {
                const id = item._id;
                const title = item.title;
                const image = item.url;
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
                            <span className="text-color-primary">Title:</span>{" "}
                            {title}{" "}
                          </p>
                          {/* <p className="text-white fw-medium fs-14 p-0 m-0 mb-2 text-capitalize text-overflow-ellipsis">
                            <span className="text-color-secondary">Type:</span>{" "}
                            {type}{" "}
                          </p> */}
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
              title="Oops ! No Any Category Yet !"
              subTitle="Keep an eye on upcoming category !"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
