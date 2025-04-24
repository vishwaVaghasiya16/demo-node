import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteSingleAttributeThunk,
  deleteSingleCostThunk,
  deleteSingleProductFileThunk,
  getCategoryThunk,
  getMetalPriceThunk,
  getProductDetailsByIdThunk,
  getSubCategoryThunk,
  postProductThunk,
  updateProductSingleAttributeThunk,
  updateProductSingleCostThunk,
  updateProductThunk,
} from "../../../../store/actions";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import TextAreaField from "../../../../components/admin/inputField/TextAreaField";
import * as yup from "yup";
import { useFormik } from "formik";
import SelectField from "../../../../components/admin/inputField/SelectField";
import { ADMIN } from "../../../../routes/routesConstants";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import Previewer from "../../../../components/admin/Previewer";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import TagField from "../../../../components/admin/inputField/TagField";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";

const ProductDetailsForm = () => {
  const { slug } = useParams();
  const nav = useNavigate();
  const isProductEditMode = location.pathname.includes("create");
  const admin = ADMIN();

  const [addMoreType, setAddMoreType] = useState();
  const [allAttributes, setAllAttributes] = useState([]);
  const [allCombineAttributes, setAllCombineAttributes] = useState([]);
  const [allCost, setAllCost] = useState([]);
  // const [selectedCategoryType, setSelectedCategoryType] = useState("category");
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [isShowAttModel, setIsShowAttModel] = useState(false);
  const [isShowCostModel, setIsShowCostModel] = useState(false);
  const [attMenuId, setAttMenuId] = useState();
  const [costMenuId, setCostMenuId] = useState();
  const [isAttEdit, setIsAttEdit] = useState({ isEdit: false });
  const [isCostEdit, setIsCostEdit] = useState({ isEdit: false });
  const [clickedMenuId, setClickedMenuId] = useState();
  const [deleteId, setDeleteId] = useState();
  const dispatch = useDispatch();
  const {
    productDetails,
    loading,
    updateLoading,
    deleteLoading,
    addUpdateLoading,
  } = useSelector((store) => store.ProductDetails);
  // const { loading } = useSelector((store) => store.Products);
  const { categoryData, subCategoryData } = useSelector(
    (store) => store.Categories
  );
  const { priceData } = useSelector((store) => store?.Price);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const genderData = enumsData?.genderEnum;

  const triggerConfirmationAlert = useConfirmationAlert({
    icon: "question",
    title: "Confirm Delete Blog",
    text: "Are you sure you want to Delete the Blog?",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",
    successText: "Status has been successfully updated.",
  });

  // =======================================
  //      value from product details
  // =======================================

  const id = productDetails?._id;
  const files = productDetails?.files || [];
  const sku = productDetails?.sku || "";
  const category = productDetails?.category || "";
  const subCategory = productDetails?.subCategory || "";
  const title = productDetails?.title || "";
  const description = productDetails?.description || "";
  const manufacturerName = productDetails?.manufacturerName || "";
  const shopFor = productDetails?.shopFor || "";
  const label = productDetails?.label || "";
  const tag = productDetails?.tag || [];
  const metalColor = productDetails?.metalColor || "";
  const purity = productDetails?.purity || "";
  const hasVariant = productDetails?.hasVariant;
  const isDraft = productDetails?.isDraft;
  const isRing = productDetails?.isRing || false;
  const isFeatured = productDetails?.isFeatured;
  const weight = productDetails?.weight || "";
  const length = productDetails?.length || "";
  const width = productDetails?.width || "";
  const height = productDetails?.height || "";
  const size = Number(productDetails?.size) || 0;
  const range = productDetails?.range || "";
  const price = productDetails?.price || 0;
  const availability = productDetails?.availability;
  const discountDescription = productDetails?.discountDescription;
  const attributes = productDetails?.attributes || [];
  const cost = productDetails?.cost || [];
  const quantity = productDetails?.quantity || 0;
  const discountType = productDetails?.discountType;
  const discountValue = productDetails?.discountValue;
  const categoryType = subCategory ? "subCategory" : "category";
  const stateDiamondAttributesFilter =
    allAttributes?.filter((item) => item.attTitle == "diamond") || [];
  const diamondAttributesFilter =
    productDetails?.attributes?.filter((item) => item?.attTitle == "diamond") ||
    [];
  const filteredDiamondAtt =
    [...stateDiamondAttributesFilter, ...diamondAttributesFilter][0]?.attName ||
    "";

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setAttMenuId(null), setCostMenuId(null);
  });

  // =======================================
  //         formik initial values
  // =======================================

  const initialValues = {
    sku: "",
    // category: "",
    // subCategory: "",
    title: "",
    description: "",
    manufacturerName: "",
    shopFor: "",
    // label: "",
    // tag: [],
    metalColor: "",
    purity: "",
    hasVariant: "",
    isDraft: "",
    isRing: false,
    isFeatured: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    size: 0,
    range: "",
    // price: 0,
    availability: "",
    discountDescription: "",
    categoryType: "category",
    discountType: "",
    discountValue: 0,
    // quantity: 0,
    cost: [],
    attributes: [],
    files: [],
  };

  const attributeInitialValue = {
    attTitle: "",
    attName: "",
    settingType: "",
    attWeight: "",
    number: "",
  };

  const costInitialValues = {
    metal: "",
    costWeight: 0,
    costType: "",
    // costDiscount: 0,
    // costDiscountType: "",
    // costName: "",
    // amount: 0,
  };

  // =======================================
  //              yup schemas
  // =======================================

  const validationSchema = yup.object({
    sku: yup.string().required("sku is required"),
    title: yup.string().required("title is required"),
    manufacturerName: yup.string().required("manufacture name is required"),
    // category: yup.string().required("Category is required"),
    description: yup
      .string()
      .min(100, "min 100 latters are required")
      .required("description is required"),
    shopFor: yup.string().required("shopFor is required"),
    metalColor: yup.string().required("metal color is required"),
    purity: yup.string().required("purity is required"),
    hasVariant: yup.string().required("hasVariant is required"),
    isDraft: yup.string().required("is draft required"),
    isFeatured: yup.string().required("is featured required"),
    weight: yup.string().required("weight is required"),
    length: yup.string().required("length is required"),
    width: yup.string().required("width is required"),
    height: yup.string().required("height is required"),
    size: yup.number().min(0, "min 1 size required"),
    // .required("size is required"),
    range: yup.string().when("size", {
      is: (val) => val > 0,
      then: (schema) => schema.required("range is required"),
      otherwise: (schema) => schema,
    }),
    price: yup.number().min(0, "Enter valid price"),
    availability: yup.string().required("availability is required"),
    categoryType: yup.string(),
    category: yup.string().when("categoryType", {
      is: "category",
      then: (schema) => schema.required("category is required"),
      otherwise: (schema) => schema,
    }),
    subCategory: yup.string().when("categoryType", {
      is: "subCategory",
      then: (schema) => schema.required("subCategory is required"),
      otherwise: (schema) => schema,
    }),
    quantity: yup
      .number()
      .min(1, "enter valid number")
      .required("quantity is required"),
    discountType: yup.string(),
    discountValue: yup
      .number()
      .min(0, "enter valid value")
      .when("discountType", {
        is: (val) => val,
        then: (schema) =>
          schema
            .min(0, "Enter valid value")
            .required("discount type is required"),
        otherwise: (schema) => schema,
      }),
    tag: yup
      .array()
      .min(2, "Add at least 2 tags")
      .required("Tags are required"),
    // discountType: yup.string().when("discountValue", {
    //   is: (val) => val && val.length > 0,
    //   then: yup.string().required("discount type is required"),
    //   otherwise: yup.string(),
    // }),
  });

  const attrValidationSchema = yup.object({
    attTitle: yup.string().required("att title is required"),
    attName: yup.string().required("att name is required"),
    settingType: yup.string().required("setting type is required"),
    attWeight: yup.string().required("att weight is requried"),
    number: yup
      .number()
      .min(1, "min 1 number requried")
      .required("enter number of attribute"),
  });

  const costValidationSchema = yup.object({
    metal: yup.string().required("metal is required required"),
    costWeight: yup
      .number()
      .min(0.01, "enter valid number")
      .required("cost weight is required"),
    costType: yup.string().required("cost type is required"),
    // costDiscount: yup
    //   .number()
    //   .min(0, "enter valid number")
    //   .required("cost discount is required"),
    // costDiscountType: yup.string().required("cost discount type is required"),
    // costName: yup.string().required("cost name is required"),
    amount: yup.number().min(0, "enter valid number"),
  });

  // =======================================
  //            yup validations
  // =======================================

  const validation = useFormik({
    name: "details validation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formValues = { ...values };

      // delete which field are in array and add separately

      delete formValues?.cost;
      delete formValues?.attributes;
      delete formValues?.files;
      delete formValues?.tag;
      if (formValues?.categoryType == "category") {
        delete formValues?.subCategory;
      } else {
        delete formValues?.category;
      }
      delete formValues?.categoryType;
      if (!isProductEditMode) {
        delete formValues?.category;
        delete formValues?.subCategory;
        delete formValues?.sku;
        delete formValues?.title
      }

      const bodyFormData = new FormData();
      Object.keys(formValues)?.map(
        (item) =>
          formValues[item] !== "" &&
          formValues[item] !== undefined &&
          bodyFormData.append(`${item}`, formValues[item])
      );

      // field which type array
      // values?.tag?.map((item) => item && bodyFormData.append("tag", item));
      if (values.tag?.length > 0) {
        const tagType = Array.isArray(values.tag) ? values.tag : [values.tag];
        tagType.forEach((tag, index) => {
          bodyFormData.append(`tag[${index}]`, tag?.toLowerCase());
          // bodyFormData.append(`tag[${index}]`, tag);
        });
      }
      // else bodyFormData.append("tag[]",[]);
      // allAttributes?.map(
      //   (item) => item && bodyFormData.append("attributes", item)
      // );
      allAttributes.forEach((attr, index) => {
        Object.keys(attr).forEach((key) => {
          bodyFormData.append(`attributes[${index}][${key}]`, attr[key]);
        });
      });
      allCost.forEach((attr, index) => {
        Object.keys(attr).forEach((key) => {
          bodyFormData.append(`cost[${index}][${key}]`, attr[key]);
        });
      });
      selectedProductImages?.map(
        (item) => item && bodyFormData.append("files", item?.file)
      );

      if (!isProductEditMode) {
        const response = await dispatch(
          updateProductThunk({ id, value: bodyFormData })
        );
        if (updateProductThunk.fulfilled.match(response)) {
          nav(admin.PRODUCT.path);
          // resetForm();
        }
      } else {
        const response = await dispatch(postProductThunk(bodyFormData));
        if (postProductThunk.fulfilled.match(response)) {
          nav(admin.PRODUCT.path);
          // resetForm();
        }
      }
    },
  });

  const attValidation = useFormik({
    name: "att validation",
    initialValues: attributeInitialValue,
    validationSchema: attrValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isAttEdit?.isEdit) {
        if (
          handleFindId({
            id: isAttEdit.values._id,
            type: [...validation.values.attributes, ...allAttributes],
            index: isAttEdit.index,
          })
        ) {
          const response = await dispatch(
            updateProductSingleAttributeThunk({
              id: productDetails._id,
              editId: isAttEdit.values._id,
              values: values,
            })
          );
          if (updateProductSingleAttributeThunk.fulfilled.match(response)) {
            setIsAttEdit(null);
            handleAttModel();
          }
        } else {
          const combineAtt = [
            ...validation.values.attributes,
            ...allAttributes,
          ];
          combineAtt[isAttEdit.index] = values;
          setAllAttributes(combineAtt?.filter((item) => !item._id));
          handleAttModel();
        }
      } else {
        setAllAttributes((pre) => [...pre, values]);
        setAddMoreType("");
        resetForm();
        handleAttModel();
      }
    },
  });

  const costValidation = useFormik({
    name: "costValidation",
    initialValues: costInitialValues,
    validationSchema: costValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // setAllCost((pre) => [...pre, values]);
      // setAddMoreType("");
      // resetForm();
      // handleCostModel();
      if (isCostEdit?.isEdit) {
        if (
          handleFindId({
            id: isCostEdit.values._id,
            type: [...validation.values.cost, ...allCost],
            index: isCostEdit.index,
          })
        ) {
          const response = await dispatch(
            updateProductSingleCostThunk({
              id: productDetails._id,
              editId: isCostEdit.values._id,
              values: values,
            })
          );
          if (updateProductSingleCostThunk.fulfilled.match(response)) {
            setIsCostEdit(null);
            handleCostModel();
          }
        } else {
          const combineAtt = [...validation.values.cost, ...allCost];
          combineAtt[isCostEdit.index] = values;
          setAllCost(combineAtt?.filter((item) => !item._id));
          handleCostModel();
        }
      } else {
        setAllCost((pre) => [...pre, values]);
        resetForm();
        handleCostModel();
      }
    },
  });

  // =======================================
  //       handle delete single file
  // =======================================

  const handleDeleteFile = async ({ deleteId }) => {
    if (deleteId) setDeleteId(deleteId);
    triggerConfirmationAlert({
      dispatchFunction: async () => {
        const response = await dispatch(
          deleteSingleProductFileThunk({ id, deleteId })
        );
        if (deleteSingleProductFileThunk.fulfilled.match(response)) {
          setDeleteId(null);
          return true;
        }
        return false;
      },
    });
  };

  const handleDeleteFileByIndex = ({ index }) => {
    triggerConfirmationAlert({
      dispatchFunction: async () => {
        setSelectedProductImages((pre) => pre?.filter((_, i) => i !== index));
        return true;
      },
    });
    // setSelectedProductImages((pre) => pre?.filter((_, i) => i !== index));
  };

  // =================================================
  //     handle delete & edit single attribute
  // =================================================

  const handleDeleteAttribute = async ({ id, deleteId, index }) => {
    if (deleteId) setDeleteId(deleteId);
    setAttMenuId(null);
    triggerConfirmationAlert({
      dispatchFunction: async () => {
        if (
          handleFindId({
            id: deleteId,
            type: [...validation.values.attributes, ...allAttributes],
            index,
          })
        ) {
          const response = await dispatch(
            deleteSingleAttributeThunk({ id, deleteId })
          );
          if (deleteSingleAttributeThunk.fulfilled.match(response)) {
            setDeleteId(null);
            return true;
          }
          return false;
        } else {
          if (
            index >= 0 &&
            index <= [...validation.values.attributes, ...allAttributes]?.length
          ) {
            const newAttributes = [
              ...validation.values.attributes,
              ...allAttributes,
            ]?.filter((_, i) => i !== index);
            setAllAttributes(newAttributes?.filter((item) => !item?._id));
            return true;
          }
          return false;
        }
      },
    });
  };

  const handleEditAttribute = async ({ id, editId, values, index }) => {
    attValidation.setFieldValue("attTitle", values.attTitle);
    attValidation.setFieldValue("attName", values.attName);
    attValidation.setFieldValue("settingType", values.settingType);
    attValidation.setFieldValue("attWeight", values.attWeight);
    attValidation.setFieldValue("number", values.number);
    setAttMenuId(null);
    setIsAttEdit({ values, isEdit: true, index });
    handleAttModel();
  };

  // =======================================
  //       handle delete & edit single cost
  // =======================================

  const handleDeleteCost = async ({ id, deleteId, index }) => {
    if (deleteId) setDeleteId(deleteId);
    setCostMenuId(null);
    triggerConfirmationAlert({
      dispatchFunction: async () => {
        if (
          handleFindId({
            id: deleteId,
            type: [...validation.values.cost, ...allCost],
          })
        ) {
          const response = await dispatch(
            deleteSingleCostThunk({ id, deleteId })
          );
          if (deleteSingleCostThunk.fulfilled.match(response)) {
            setDeleteId(null);
            return true;
          }
          return false;
        } else {
          if (index >= 0 && index <= allCost?.length) {
            setAllCost((pre) => pre?.splice(index, 1));
            return true;
          }
          return false;
        }
      },
    });
  };

  const handleEditCost = async ({ id, values, index }) => {
    costValidation.setFieldValue("metal", values.metal);
    costValidation.setFieldValue("costWeight", values.costWeight);
    costValidation.setFieldValue("costType", values.costType);
    setCostMenuId(null);
    setIsCostEdit({ values, isEdit: true, index });
    handleCostModel();
  };

  // const selectCategory = (value) => {
  //   validation.setFieldValue("category", value);
  //   if (value == "") {
  //     setFilteredSubCategory(subCategoryData);
  //   } else {
  //     const filterSubCategory = subCategoryData?.filter(
  //       (item) => item?.category._id == value
  //     );
  //     setFilteredSubCategory(filterSubCategory);
  //   }
  // };

  // const selectSubCategory = (value) => {
  //   validation.setFieldValue("category", value);
  //   if (value == "") {
  //     setFilteredCategory(categoryData);
  //   } else {
  //     const filter = subCategoryData?.filter((item) => item._id == value);
  //     const filterCategory = categoryData?.filter(
  //       (item) => item._id == filter[0].category._id
  //     );
  //     setFilteredCategory(filterCategory);
  //   }
  // };

  // =================================
  //      find is id available
  // =================================

  const handleFindId = ({ id, type }) => {
    if (!id) {
      return false;
    }
    return type?.filter((item) => item._id == id)?.length > 0 ? true : false;
  };

  // =================================
  //     handle model functions
  // =================================

  const handleAttModel = () => {
    setIsShowAttModel((pre) => !pre);
  };

  const handleCostModel = () => {
    setIsShowCostModel((pre) => !pre);
  };

  useEffect(() => {
    if (!priceData?.length > 0) {
      dispatch(getMetalPriceThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isProductEditMode) {
      dispatch(getProductDetailsByIdThunk({ slug }));
    }
  }, [slug, dispatch, isProductEditMode]);

  useEffect(() => {
    if (!categoryData?.length > 0) {
      dispatch(getCategoryThunk());
    }
    if (!subCategoryData?.length > 0) {
      dispatch(getSubCategoryThunk());
    }
  }, []);
  useEffect(() => {
    validation.setValues({
      sku,
      category,
      subCategory,
      title,
      description,
      manufacturerName,
      shopFor,
      label,
      tag,
      metalColor,
      purity,
      hasVariant,
      isDraft,
      isRing,
      isFeatured,
      weight,
      length,
      width,
      height,
      size,
      range,
      price,
      availability,
      discountDescription,
      quantity,
      files,
      cost,
      attributes,
      discountType,
      discountValue,
      categoryType,
    });
    // setAllAttributes(attributes);
    // setAllCost(cost);
  }, [productDetails]);

  // useEffect(() => {
  //   validation.resetForm();
  //   attValidation.resetForm();
  //   costValidation.resetForm();
  // }, [location.pathname]);

  return (
    <div className="py-20">
      <BreadCrumb
        title="master"
        pageTitle="product"
        subPageTitle={isProductEditMode ? "add product" : "edit product"}
      />
      {!loading ? (
        <form onSubmit={validation.handleSubmit} className="">
          {/* <FilePond></FilePond> */}
          <div className="d-flex flex-column flex-xl-row justify-content-center gap-3 gap-xl-0">
            {/* {validation?.values?.files?.length > 0 && (
            <Col
              xl={4}
              className="border common-border-color p-3 bg-white br-5 "
            >
              <div className="d-grid grid-cols-2 gap-3">
                {validation?.values?.files?.map((item, index) => {
                  const image = item.urls;
                  return (
                    <div key={index}>
                      <div>
                        <div className="bg-color-titan-white w-100 aspect-1-1_1 br-5 overflow-hidden">
                          <img
                            src={image || ""}
                            className="w-100 h-100 object-fit-cover"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          )} */}
            <Col xl={12} className="">
              <div className="bg-white p-20 br-5">
                {/* =================================================== 
                                product image handling
                =================================================== */}
                <Row className="">
                  {validation.values.files?.map((item, index) => {
                    const extension = item?.urls.match(
                      /\.([0-9a-z]+)(?:[\?#]|$)/i
                    );
                    return (
                      <Col xs={6} md={4} xl={3} key={index} className="mb-3">
                        <div
                          className={`aspect-1_5-1 bg-color-titan-white br-5 overflow-hidden file-hover-parent w-100 ${
                            deleteLoading && deleteId == item?._id
                              ? "opacity-loading"
                              : ""
                          }`}
                        >
                          {extension[0] == ".mp4" ? (
                            <video
                              src={item?.urls}
                              autoPlay
                              muted
                              className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                              alt=""
                            />
                          ) : (
                            // <video
                            //   // autoPlay
                            //   // muted
                            //   // loop
                            //   className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                            // >
                            //   <source src={item?.urls} type="video/mp4"></source>
                            // </video>
                            <img
                              src={item?.urls}
                              className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                              alt=""
                            />
                          )}
                          <div
                            className="file-delete-option"
                            onClick={() =>
                              handleDeleteFile({ deleteId: item?._id })
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                  {selectedProductImages?.map((item, index) => {
                    return (
                      <Col
                        xs={6}
                        md={4}
                        xl={3}
                        key={index}
                        className="mb-3
                      "
                      >
                        <div className="aspect-1_5-1 bg-color-titan-white br-5 overflow-hidden file-hover-parent w-100">
                          {item?.type == "image" ? (
                            <img
                              src={item?.url}
                              className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                              alt=""
                            />
                          ) : (
                            <video
                              autoPlay
                              muted
                              src={item?.url}
                              className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                              alt=""
                            />
                          )}

                          <div
                            className="file-delete-option"
                            onClick={() => handleDeleteFileByIndex({ index })}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                  <Col sm={6} md={4} xl={3} className={`pb-20`}>
                    {/* <FilePond
                    allowMultiple
                    name="productImages"
                    acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                    onaddfile={(error, file) => {
                      setSelectedProductImages((pre) => [...pre, file.file]);
                    }}
                    onremovefile={() => {
                      validation.setFieldValue("image", "");
                    }}
                  ></FilePond> */}
                    <Previewer
                      className="aspect-1_5-1 w-100"
                      onFileSelect={(values) => {
                        setSelectedProductImages((pre) => [...pre, ...values]);
                      }}
                      valuesOnly
                      accept=".jpg, .jpeg, .png, .webp, .mp4"
                    />
                  </Col>
                </Row>

                {/* =================================================== 
                      first row for message, title, sku etc...
                =================================================== */}

                <Row>
                  <Col lg={6}>
                    <Row className="position-relative">
                      <Col md={6}>
                        {/* <Col md={isProductEditMode ? 3 : 4}> */}
                        <Col className="mb-3">
                          <InputField
                            name="title"
                            id="title"
                            label="Product Name"
                            value={validation.values.title || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            readOnly={!isProductEditMode ? true : false}
                            isValid={
                              validation.touched.title &&
                              validation.errors.title
                            }
                            errorMessage={validation.errors.title}
                          />
                        </Col>
                      </Col>
                      <Col
                        xs={12}
                        sm={isProductEditMode ? 4 : 6}
                        md={6}
                        // md={isProductEditMode ? 3 : 4}
                        className="mb-3"
                      >
                        <InputField
                          label="sku"
                          name="sku"
                          id="sku"
                          value={validation.values.sku}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.sku && validation.errors.sku
                          }
                          errorMessage={validation.errors.sku}
                          readOnly={!isProductEditMode ? true : false}
                        />
                      </Col>
                      <Col sm={isProductEditMode ? 8 : 6} md={12}>
                        <Row xs={12}>
                          {/* =================================================== 
                      choose category || sub category select tag 
                =================================================== */}

                          {isProductEditMode && (
                            <Col
                              className="mb-3"
                              xs={12}
                              sm={isProductEditMode ? 6 : 12}
                            >
                              <SelectField
                                label="category type"
                                // onChange={(e) =>
                                //   setSelectedCategoryType(e.target.value)
                                // }
                                name="categoryType"
                                id="categoryType"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                isValid={
                                  validation.touched.categoryType &&
                                  validation.errors.categoryType
                                }
                                errorMessage={validation.errors.categoryType}
                                value={validation.values.categoryType}
                              >
                                <option value="category">Category</option>
                                <option value="subCategory">
                                  Sub Category
                                </option>
                              </SelectField>
                            </Col>
                          )}

                          {/* =================================================== 
                                        categories
                        =================================================== */}
                          {isProductEditMode &&
                            validation.values.categoryType == "category" && (
                              <Col className="mb-3" xs={12} sm={6}>
                                <SelectField
                                  name="category"
                                  id="category"
                                  label="category ID"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.category}
                                  isValid={
                                    validation.touched.category &&
                                    validation.errors.category
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
                              </Col>
                            )}

                          {!isProductEditMode && (
                            <Col className="mb-3">
                              <InputField
                                label={
                                  validation.values.subCategory
                                    ? "sub Category"
                                    : "category ID"
                                }
                                value={
                                  validation.values.category ||
                                  validation.values.subCategory
                                }
                                readOnly
                              ></InputField>
                            </Col>
                          )}

                          {/* <Col>
                    {isProductEditMode ? (
                      selectedCategoryType == "category" && (
                        <SelectField
                          label="category ID"
                          onChange={(e) => selectCategory(e.target.value)}
                        >
                          <option value="">select category</option>
                          {filtersCategory?.map((item, index) => {
                            return (
                              <option value={item._id} key={index}>
                                {item.title}
                              </option>
                            );
                          })}
                        </SelectField>
                      )
                    ) : (
                      <InputField
                        label="category ID"
                        value={validation.values.category}
                        readOnly
                      ></InputField>
                    )}
                  </Col> */}

                          {/* =================================================== 
                                     sub categories
                   =================================================== */}

                          {isProductEditMode &&
                            validation.values.categoryType == "subCategory" && (
                              <Col className="mb-3">
                                <SelectField
                                  name="subCategory"
                                  id="subCategory"
                                  label="sub category ID"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.subCategory}
                                  isValid={
                                    validation.touched.subCategory &&
                                    validation.errors.subCategory
                                  }
                                  errorMessage={validation.errors.subCategory}
                                >
                                  <option value="">select sub category</option>
                                  {subCategoryData?.map((item, index) => {
                                    return (
                                      <option value={item._id} key={index}>
                                        {item.title}
                                      </option>
                                    );
                                  })}
                                </SelectField>
                              </Col>
                            )}
                        </Row>
                      </Col>
                      <Col xs={12} sm={4} md={6} className="mb-3">
                        <InputField
                          name="manufacturerName"
                          id="manufacturerName"
                          label="manufacturer Name"
                          value={validation.values.manufacturerName || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.manufacturerName &&
                            validation.errors.manufacturerName
                          }
                          errorMessage={validation.errors.manufacturerName}
                        />
                      </Col>
                      <Col xs={12} sm={4} md={6} className="mb-3">
                        {/* <SelectField
                        name="shopFor"
                        id="shopFor"
                        label="shopFor"
                        value={validation.values.shopFor}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        isValid={
                          validation.touched.shopFor &&
                          validation.errors.shopFor
                        }
                        errorMessage={validation.errors.shopFor}
                      >
                        <option value="">Select shopFor</option>
                        <option value="man">man</option>
                        {genderData &&
                          Object.keys(genderData)?.map((key, index) => {
                            const val = genderData[key];
                            return (
                              <option value={val} key={index}>
                                {val}
                              </option>
                            );
                          })}
                      </SelectField> */}
                        <InputField
                          name="shopFor"
                          id="shopFor"
                          label="shop for"
                          value={validation.values.shopFor || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.shopFor &&
                            validation.errors.shopFor
                          }
                          errorMessage={validation.errors.shopFor}
                        />
                      </Col>
                      <Col xs={12} sm={4} md={6} className="mb-3">
                        <SelectField
                          name="label"
                          id="label"
                          label="label"
                          value={validation.values.label}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.label && validation.errors.label
                          }
                          errorMessage={validation.errors.label}
                        >
                          <option value="">Select label</option>
                          <option value="trending">trending</option>
                          <option value="hot">hot</option>
                          <option value="new">new</option>
                          <option value="best seller">best seller</option>
                          <option value="sale">sale</option>
                        </SelectField>
                      </Col>
                      <Col xs={12} sm={4} md={6} className="mb-3">
                        <InputField
                          name="quantity"
                          id="quantity"
                          label="quantity"
                          type="number"
                          value={validation.values.quantity || 0}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.quantity &&
                            validation.errors.quantity
                          }
                          errorMessage={validation.errors.quantity}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <TextAreaField
                      rows={11}
                      name="description"
                      // id="description"
                      value={validation.values.description}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.description &&
                        validation.errors.description
                      }
                      errorMessage={validation.errors.description}
                    />
                  </Col>
                </Row>

                {/* =================================================== 
                                    other fields
                =================================================== */}

                <Row>
                  {/* <Col xs={12} sm={4} md={3} className="mb-3">
                  <InputField
                    name="tag"
                    id="tag"
                    label="tag"
                    value={validation.values.tag || ""}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    isValid={validation.touched.tag && validation.errors.tag}
                    errorMessage={validation.errors.tag}
                  />
                </Col> */}

                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="metalColor"
                      id="metalColor"
                      label="metalColor"
                      value={validation.values.metalColor || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.metalColor &&
                        validation.errors.metalColor
                      }
                      errorMessage={validation.errors.metalColor}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="purity"
                      id="purity"
                      label="purity"
                      value={validation.values.purity || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.purity && validation.errors.purity
                      }
                      errorMessage={validation.errors.purity}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="hasVariant"
                      id="hasVariant"
                      label="has Variant"
                      value={validation.values.hasVariant}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.hasVariant &&
                        validation.errors.hasVariant
                      }
                      errorMessage={validation.errors.hasVariant}
                    >
                      <option value="">select has variant</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="isDraft"
                      id="isDraft"
                      label="is draft"
                      value={validation.values.isDraft}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.isDraft && validation.errors.isDraft
                      }
                      errorMessage={validation.errors.isDraft}
                    >
                      <option value="">select is draft</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="isRing"
                      id="isRing"
                      label="is ring"
                      value={validation.values.isRing}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.isRing && validation.errors.isRing
                      }
                      errorMessage={validation.errors.isRing}
                    >
                      {/* <option value="">select is ring</option> */}
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="isFeatured"
                      id="isFeatured"
                      label="is featured"
                      value={validation.values.isFeatured}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.isFeatured &&
                        validation.errors.isFeatured
                      }
                      errorMessage={validation.errors.isFeatured}
                    >
                      <option value="">is featured</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={6} className="mb-3">
                    <TagField
                      name={"tag"}
                      label="Tags"
                      isValid={validation.touched.tag && validation.errors.tag}
                      errorMessage={validation.errors.tag}
                      defaultValues={isProductEditMode ? "" : tag}
                      onValueUpdate={(value) => {
                        validation.setFieldValue("tag", value);
                      }}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="weight"
                      id="weight"
                      label="weight"
                      value={validation.values.weight || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.weight && validation.errors.weight
                      }
                      errorMessage={validation.errors.weight}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="length"
                      id="length"
                      label="length"
                      value={validation.values.length || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.length && validation.errors.length
                      }
                      errorMessage={validation.errors.length}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="width"
                      id="width"
                      label="width"
                      value={validation.values.width || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.width && validation.errors.width
                      }
                      errorMessage={validation.errors.width}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="height"
                      id="height"
                      label="height"
                      value={validation.values.height || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.height && validation.errors.height
                      }
                      errorMessage={validation.errors.height}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="size"
                      id="size"
                      label="size"
                      type="number"
                      value={validation.values.size || 0}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.size && validation.errors.size
                      }
                      errorMessage={validation.errors.size}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="range"
                      id="range"
                      label="range"
                      value={validation.values.range || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.range && validation.errors.range
                      }
                      errorMessage={validation.errors.range}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="price"
                      id="price"
                      label="price"
                      type="number"
                      value={validation.values.price}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.price && validation.errors.price
                      }
                      errorMessage={validation.errors.price}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="availability"
                      id="availability"
                      label="availability"
                      value={validation.values.availability}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.availability &&
                        validation.errors.availability
                      }
                      errorMessage={validation.errors.availability}
                    >
                      <option value="">select availability</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="discountDescription"
                      id="discountDescription"
                      label="discount description"
                      value={validation.values.discountDescription || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.discountDescription &&
                        validation.errors.discountDescription
                      }
                      errorMessage={validation.errors.discountDescription}
                    />
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <SelectField
                      name="discountType"
                      id="discountType"
                      label="discountType"
                      value={validation.values.discountType}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.discountType &&
                        validation.errors.discountType
                      }
                      errorMessage={validation.errors.discountType}
                    >
                      <option value="">select discount type</option>
                      <option value="percentage">percentage</option>
                      <option value="amount">amount</option>
                    </SelectField>
                  </Col>
                  <Col sm={4} md={3} className="mb-3">
                    <InputField
                      name="discountValue"
                      id="discountValue"
                      label="discount value"
                      type="number"
                      value={validation.values.discountValue || 0}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      isValid={
                        validation.touched.discountValue &&
                        validation.errors.discountValue
                      }
                      errorMessage={validation.errors.discountValue}
                    />
                  </Col>
                </Row>

                {/* =================================================== 
                                  show attributes
                =================================================== */}

                <p className="text-color-primary fw-medium">Attributes ----</p>

                <Row>
                  {[...validation?.values?.attributes, ...allAttributes]?.map(
                    (item, index) => {
                      const attTitle = item.attTitle;
                      const attName = item.attName;
                      const settingType = item.settingType;
                      const attWeight = item?.attWeight;
                      const number = item?.number;
                      return (
                        <Col sm={6} md={4} xl={3} key={index} className="pb-20">
                          <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                            {/* <p className="p-0 m-0 ms-auto">Deleting...</p> */}
                            <div className="p-0 m-0 fw-medium">
                              {deleteLoading && item?._id == deleteId && (
                                <p
                                  className="p-0 m-0 text-end cursor-pointer text-danger"
                                  // onClick={() =>
                                  //   handleDeleteAttribute({
                                  //     id: productDetails?._id,
                                  //     deleteId: item?._id,
                                  //     index: index,
                                  //   })
                                  // }
                                >
                                  deleting...
                                </p>
                              )}
                              <span className="text-color-secondary fw-normal">
                                att Title:-{" "}
                              </span>
                              {attTitle}
                            </div>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                att Name:-{" "}
                              </span>
                              {attName}
                            </p>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                setting type:-{" "}
                              </span>
                              {settingType}
                            </p>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                att weight:-{" "}
                              </span>
                              {attWeight}
                            </p>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                number:-{" "}
                              </span>
                              {number}
                            </p>
                            <ToggleMenu
                              onClick={() =>
                                setAttMenuId((pre) =>
                                  pre == index ? false : index
                                )
                              }
                              isOpen={index == attMenuId}
                              margin="ms-auto"
                              iconColor="text-color-primary"
                            >
                              <p
                                className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                onClick={() =>
                                  handleEditAttribute({
                                    id: productDetails?._id,
                                    editId: item?._id,
                                    index,
                                    values: item,
                                  })
                                }
                              >
                                Edit
                              </p>
                              {/* <hr className="p-0 m-0 hr-light" /> */}
                              <p
                                className="text-color-secondary m-0 fs-14 cursor-pointer px-3 py-1 hover-color-primary hover-bg-color-titan-white"
                                onClick={() =>
                                  handleDeleteAttribute({
                                    id: productDetails?._id,
                                    deleteId: item?._id,
                                    index: index,
                                  })
                                }
                              >
                                Delete
                              </p>
                            </ToggleMenu>
                          </div>
                        </Col>
                      );
                    }
                  )}
                  <Col sm={6} md={4} xl={3} className="pb-20">
                    <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          att Title:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          att Name:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          setting type:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          att weight:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          number:-{" "}
                        </span>
                      </p>
                      <p
                        className="bg-light bg-opacity-20 border border-color-blue cursor-pointer hover-bg-opacity-30 w-21 h-21 d-flex align-items-center justify-content-center rounded-circle p-0 m-0 ms-auto "
                        onClick={() => {
                          handleAttModel(),
                            setIsAttEdit({}),
                            attValidation.resetForm();
                        }}
                      >
                        {/* <i className={`ri-more-2-line ${iconColor} fs-14 fw-bold`}></i> */}
                        <i className={`ri-add-line fs-12 fw-bold mx-auto`}></i>
                      </p>
                    </div>
                  </Col>
                </Row>

                {/* =================================================== 
                                    show cost
                =================================================== */}

                <p className="text-color-primary fw-medium">Cost ----</p>

                {/* <Row>
                {[...validation.values.cost, ...allCost]?.map((item, index) => {
                  const ratePerGram = item?.ratePerGram;
                  const costWeight = item?.costWeight;
                  const costType = item?.costType;
                  const costDiscount = item?.costDiscount;
                  const costDiscountType = item?.costDiscountType;
                  const costName = item?.costName;
                  return (
                    <Col xs={3} key={index} className="pb-20">
                      <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                        <p
                          className="m-0 p-0 text-end cursor-pointer"
                          onClick={() =>
                            handleDeleteCost({ id, deleteId: item?._id, index })
                          }
                        >
                          Delete
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            rate per gram:-{" "}
                          </span>
                          {ratePerGram}
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            cost weight:-{" "}
                          </span>
                          {costWeight}
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            cost type:-{" "}
                          </span>
                          {costType}
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            cost discount:-{" "}
                          </span>
                          {costDiscount}
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            cost discount type:-{" "}
                          </span>
                          {costDiscountType}
                        </p>
                        <p className="p-0 m-0 fw-medium">
                          <span className="text-color-secondary fw-normal">
                            cost name:-{" "}
                          </span>
                          {costName}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row> */}

                <Row>
                  {[...validation?.values?.cost, ...allCost]?.map(
                    (item, index) => {
                      const metal = item.metal;
                      // const attName = item.attName;
                      const costType = item.costType;
                      const costWeight = item?.costWeight;
                      // const number = item?.number;
                      return (
                        <Col sm={6} md={4} xl={3} key={index} className="pb-20">
                          <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                            <p className="p-0 m-0 fw-medium">
                              {deleteLoading && item?._id == deleteId && (
                                <p
                                  className="p-0 m-0 text-end cursor-pointer text-danger"
                                  // onClick={() =>
                                  //   handleDeleteAttribute({
                                  //     id: productDetails?._id,
                                  //     deleteId: item?._id,
                                  //     index: index,
                                  //   })
                                  // }
                                >
                                  deleting...
                                </p>
                              )}
                              <span className="text-color-secondary fw-normal">
                                metal:-{" "}
                              </span>
                              {metal}
                            </p>
                            {/* <p className="p-0 m-0 fw-medium">
                            <span className="text-color-secondary fw-normal">
                              att Name:-{" "}
                            </span>
                            {attName}
                          </p> */}
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                cost type:-{" "}
                              </span>
                              {costType}
                            </p>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                cost weight:-{" "}
                              </span>
                              {costWeight}
                            </p>
                            {/* <p className="p-0 m-0 fw-medium">
                            <span className="text-color-secondary fw-normal">
                              number:-{" "}
                            </span>
                            {number}
                          </p> */}
                            <ToggleMenu
                              onClick={() =>
                                setCostMenuId((pre) =>
                                  pre == index ? false : index
                                )
                              }
                              isOpen={index == costMenuId}
                              margin="ms-auto"
                              iconColor="text-color-primary"
                            >
                              <p
                                className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                onClick={() =>
                                  handleEditCost({
                                    id: productDetails?._id,
                                    editId: item?._id,
                                    index,
                                    values: item,
                                  })
                                }
                              >
                                Edit
                              </p>
                              {/* <hr className="p-0 m-0 hr-light" /> */}
                              <p
                                className="text-color-secondary m-0 fs-14 cursor-pointer px-3 py-1 hover-color-primary hover-bg-color-titan-white"
                                onClick={() =>
                                  handleDeleteCost({
                                    id: productDetails?._id,
                                    deleteId: item?._id,
                                    index: index,
                                  })
                                }
                              >
                                Delete
                              </p>
                            </ToggleMenu>
                          </div>
                        </Col>
                      );
                    }
                  )}
                  <Col sm={6} md={4} xl={3} className="pb-20">
                    <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          metal:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          cost Type:-{" "}
                        </span>
                      </p>
                      <p className="p-0 m-0 fw-medium">
                        <span className="text-color-secondary fw-normal">
                          cost Weight:-{" "}
                        </span>
                      </p>
                      <p
                        className="bg-light bg-opacity-20 border border-color-blue cursor-pointer hover-bg-opacity-30 w-21 h-21 d-flex align-items-center justify-content-center rounded-circle p-0 m-0 ms-auto "
                        onClick={() => {
                          handleCostModel(),
                            setIsAttEdit({}),
                            attValidation.resetForm();
                        }}
                      >
                        {/* <i className={`ri-more-2-line ${iconColor} fs-14 fw-bold`}></i> */}
                        <i className={`ri-add-line fs-12 fw-bold mx-auto`}></i>
                      </p>
                    </div>
                  </Col>
                </Row>

                {/* =================================================== 
                                    submit button
                =================================================== */}

                <Button
                  disabled={addUpdateLoading}
                  type="submit"
                  className="admin-primary-btn w-100 fs-14"
                >
                  {addUpdateLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Col>
          </div>

          {/* =================================================== 
                            attribute model
          =================================================== */}
          <AdminModelWrapper
            show={isShowAttModel}
            onHide={handleAttModel}
            title={isAttEdit?.isEdit ? "Edit Attribute" : "Add Attribute"}
            onSubmit={attValidation.handleSubmit}
            loading={updateLoading}
            loadingText={isAttEdit?.isEdit ? "Updating..." : "Adding..."}
          >
            <Modal.Body>
              <Row className="flex-column gap-3">
                <SelectField
                  name="attTitle"
                  id="attTitle"
                  label="att Title"
                  value={attValidation.values.attTitle}
                  onChange={attValidation.handleChange}
                  onBlur={attValidation.handleBlur}
                  isValid={
                    attValidation.touched.attTitle &&
                    attValidation.errors.attTitle
                  }
                  disabled={isAttEdit?.isEdit}
                  errorMessage={attValidation.errors.attTitle}
                >
                  <option value="">Select title</option>

                  {/* {(filteredDiamondAtt?.toUpperCase() ==
                  attValidation.values.attName?.toUpperCase() ||
                  !filteredDiamondAtt) && (
                    )} */}
                  {(isAttEdit?.isEdit ||
                    filteredDiamondAtt == attValidation.values.attName ||
                    filteredDiamondAtt == "") && (
                    <option value="diamond">diamond</option>
                  )}
                  <option value="gemstone">gemstone</option>
                </SelectField>
                <InputField
                  name="attName"
                  id="attName"
                  label="attribute name"
                  value={attValidation.values.attName || ""}
                  onChange={(e) => {
                    // if (
                    //   filteredDiamondAtt?.toUpperCase() !==
                    //     e.target.value?.toUpperCase() &&
                    //   filteredDiamondAtt
                    // ) {
                    // attValidation.setFieldValue("attTitle", "gemstone");
                    // }
                    attValidation.setFieldValue("attName", e.target.value);
                  }}
                  readOnly={isAttEdit?.isEdit}
                  onBlur={attValidation.handleBlur}
                  isValid={
                    attValidation.touched.attName &&
                    attValidation.errors.attName
                  }
                  errorMessage={attValidation.errors.attName}
                />
                <InputField
                  name="settingType"
                  id="settingType"
                  label="setting type"
                  value={attValidation.values.settingType || ""}
                  onChange={attValidation.handleChange}
                  onBlur={attValidation.handleBlur}
                  isValid={
                    attValidation.touched.settingType &&
                    attValidation.errors.settingType
                  }
                  errorMessage={attValidation.errors.settingType}
                />
                <InputField
                  name="attWeight"
                  id="attWeight"
                  label="att weight"
                  value={attValidation.values.attWeight || ""}
                  onChange={attValidation.handleChange}
                  onBlur={attValidation.handleBlur}
                  isValid={
                    attValidation.touched.attWeight &&
                    attValidation.errors.attWeight
                  }
                  errorMessage={attValidation.errors.attWeight}
                />
                <InputField
                  name="number"
                  id="number"
                  label="att number"
                  type="number"
                  value={attValidation.values.number}
                  onChange={attValidation.handleChange}
                  onBlur={attValidation.handleBlur}
                  isValid={
                    attValidation.touched.number && attValidation.errors.number
                  }
                  errorMessage={attValidation.errors.number}
                />
              </Row>
            </Modal.Body>
          </AdminModelWrapper>

          {/* =================================================== 
                            cost model
          =================================================== */}

          <AdminModelWrapper
            show={isShowCostModel}
            onHide={handleCostModel}
            title={isCostEdit?.isEdit ? "Edit Cost" : "Add Cost"}
            onSubmit={costValidation.handleSubmit}
            loading={updateLoading}
            loadingText={isCostEdit ? "Updating..." : "Adding..."}
          >
            <Modal.Body>
              <Row className="flex-column gap-3">
                <SelectField
                  name="metal"
                  id="metal"
                  label="metal"
                  value={costValidation.values.metal}
                  onChange={costValidation.handleChange}
                  onBlur={costValidation.handleBlur}
                  isValid={
                    costValidation.touched.metal && costValidation.errors.metal
                  }
                  textTransform=""
                  errorMessage={costValidation.errors.metal}
                >
                  <option value="">Select metal</option>
                  {priceData?.map((item, index) => {
                    return (
                      <option value={item.metal} key={index}>
                        {item?.metal}
                      </option>
                    );
                  })}
                </SelectField>
                <InputField
                  name="costWeight"
                  id="costWeight"
                  label="cost weight"
                  type="number"
                  value={costValidation.values.costWeight || 0}
                  onChange={costValidation.handleChange}
                  onBlur={costValidation.handleBlur}
                  isValid={
                    costValidation.touched.costWeight &&
                    costValidation.errors.costWeight
                  }
                  errorMessage={costValidation.errors.costWeight}
                />
                <SelectField
                  name="costType"
                  id="costType"
                  label="cost Type"
                  value={costValidation.values.costType || ""}
                  onChange={costValidation.handleChange}
                  onBlur={costValidation.handleBlur}
                  isValid={
                    costValidation.touched.costType &&
                    costValidation.errors.costType
                  }
                  errorMessage={costValidation.errors.costType}
                >
                  <option value="">Select type</option>
                  <option value="gold">gold</option>
                  <option value="diamond">diamond</option>
                  <option value="gemstone">gemstone</option>
                </SelectField>
                {/* <InputField
                name="costName"
                id="costName"
                label="cost name"
                value={costValidation.values.costName || ""}
                onChange={costValidation.handleChange}
                onBlur={costValidation.handleBlur}
                isValid={
                  costValidation.touched.costName &&
                  costValidation.errors.costName
                }
                errorMessage={costValidation.errors.costName}
              /> */}
                {/* <InputField
                name="amount"
                id="amount"
                label="amount"
                type="number"
                value={costValidation.values.amount || 0}
                onChange={costValidation.handleChange}
                onBlur={costValidation.handleBlur}
                isValid={
                  costValidation.touched.amount && costValidation.errors.amount
                }
                errorMessage={costValidation.errors.amount}
              /> */}
              </Row>
            </Modal.Body>
          </AdminModelWrapper>
        </form>
      ) : (
        <DynamicNoData
          icon="sfwxcaka"
          title="Loading please wait"
          subTitle="Fetching product data"
        />
      )}
    </div>
  );
};

export default ProductDetailsForm;
