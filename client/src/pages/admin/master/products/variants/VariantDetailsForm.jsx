import { useNavigate, useParams } from "react-router-dom";
import { ADMIN } from "../../../../../routes/routesConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";
import InputField from "../../../../../components/admin/inputField/InputField";
import TextAreaField from "../../../../../components/admin/inputField/TextAreaField";
import SelectField from "../../../../../components/admin/inputField/SelectField";
import {
  deleteSingleAttributeThunk,
  deleteSingleVariantFileThunk,
  deleteVariantSingleAttributeThunk,
  deleteVariantSingleCostThunk,
  getMetalPriceThunk,
  getVariantDetailsThunk,
  postVariantThunk,
  updateVariantSingleAttributeThunk,
  updateVariantSingleCostThunk,
  updateVariantThunk,
} from "../../../../../store/actions";
import useConfirmationAlert from "../../../../../components/common/sweetAlerts/ConfirmationAlert";
import { VARIANT } from "../../../../../routes/AdminRoutes";
import Previewer from "../../../../../components/admin/Previewer";
import ToggleMenu from "../../../../../components/admin/ToggleMenu";
import AdminModelWrapper from "../../../../../components/common/modal/AdminModelWrapper";
import useClickOutside from "../../../../../components/admin/useClickOutside";
import BreadCrumb from "../../../../../components/admin/breadCrumb/BreadCrumb";
import DynamicNoData from "../../../../../components/common/dynamicNoData/DynamicNoData";

const VariantDetailsForm = () => {
  const { slug } = useParams();
  const nav = useNavigate();
  const isVariantCreateMode = location.pathname.includes("create");
  const admin = ADMIN();
  const [addMoreType, setAddMoreType] = useState();
  const [allAttributes, setAllAttributes] = useState([]);
  const [isAttEdit, setIsAttEdit] = useState();
  const [isCostEdit, setIsCostEdit] = useState({ isEdit: false });
  const [allCost, setAllCost] = useState([]);
  const [isShowAttModel, setIsShowAttModel] = useState(false);
  const [isShowCostModel, setIsShowCostModel] = useState(false);
  const [attMenuId, setAttMenuId] = useState();
  const [costMenuId, setCostMenuId] = useState();
  const [selectedProductImages, setSelectedProductImages] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const dispatch = useDispatch();
  const { priceData } = useSelector((store) => store?.Price);
  const {
    productDetails,
    loading,
    updateLoading,
    deleteLoading,
    addUpdateLoading,
  } = useSelector((store) => store.ProductDetails);
  const { categoryData, subCategoryData } = useSelector(
    (store) => store.Categories
  );
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const genderData = enumsData?.genderEnum;
  const productId = productDetails?.product?._id;
  const productSlug = productDetails?.productSlug;
  const id = productDetails?._id;
  const files = productDetails?.files || [];
  const childSku = productDetails?.childSku || "";
  const title = productDetails?.title || "";
  const shortDescription = productDetails?.shortDescription || "";
  const metalColor = productDetails?.metalColor;
  const purity = productDetails?.purity;
  const isDraft = productDetails?.isDraft;
  const weight = productDetails?.weight;
  const length = productDetails?.length;
  const width = productDetails?.width;
  const height = productDetails?.height;
  const discountDescription = productDetails?.discountDescription;
  const discountType = productDetails?.discountType || "";
  const discountValue = productDetails?.discountValue;
  const size = Number(productDetails?.size) || 0;
  const range = productDetails?.range;
  const price = productDetails?.price || 0;
  const attributes = productDetails?.attributes || [];
  const cost = productDetails?.cost || [];
  const quantity = productDetails?.quantity;
  const product = productId;
  const availability = productDetails?.availability;
  const stateDiamondAttributesFilter =
    allAttributes?.filter((item) => item?.attTitle == "diamond") || [];
  const diamondAttributesFilter =
    productDetails?.attributes?.filter((item) => item?.attTitle == "diamond") ||
    [];
  const filteredDiamondAtt =
    [...stateDiamondAttributesFilter, ...diamondAttributesFilter][0]?.attName ||
    "";

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setAttMenuId(null), setCostMenuId(null);
  });

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

  const initialValues = {
    childSku: "",
    productSlug: slug,
    title: "",
    shortDescription: "",
    availability: "",
    metalColor: "",
    purity: "",
    isDraft: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    size: 0,
    range: "",
    price: 0,
    quantity: "",
    discountDescription: "",
    discountType: "",
    discountValue: 0,
    cost: [],
    attributes: [],
    files: [],
  };

  const attributeInitialValue = {
    attTitle: "",
    attName: "",
    settingType: "",
    attWeight: "",
    number: 0,
  };

  const costInitialValues = {
    metal: "",
    // ratePerGram: 0,
    costWeight: "",
    costType: "",
    // costDiscount: 0,
    // costDiscountType: "",
    // costName: "",
    // amount: 0,
  };

  const validationSchema = yup.object({
    childSku: yup.string().required("childSku is required"),
    title: yup.string().required("title is required"),
    shortDescription: yup
      .string()
      .min(100, "min 100 letters are required")
      .required("short description is required"),
    metalColor: yup.string().required("metal color is required"),
    availability: yup.string().required("availability is required"),
    purity: yup.string().required("purity is required"),
    isDraft: yup.string().required("is draft required"),
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
    quantity: yup
      .number()
      .min(1, "Min 1 quantity required")
      .required("quantity is required"),
    discountType: yup.string(),
    discountValue: yup
      .number()
      .min(0, "enter valid value")
      .when("discountType", {
        is: (val) => val,
        then: (schema) =>
          schema
            .min(1, "Enter valid value")
            .required("discount type is required"),
        otherwise: (schema) => schema,
      }),
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
    metal: yup.string().required("metal is required"),
    // ratePerGram: yup
    //   .number()
    //   .min(0, "enter valid number")
    //   .required("rate per gram is required"),
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

  const validation = useFormik({
    name: "details validation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formValues = {
        ...values,
        // cost: allCost,
        // attributes: allAttributes,
      };

      // // delete which field are in array and add separately

      delete formValues.files;
      delete formValues?.attributes;
      delete formValues?.cost;
      if (!isVariantCreateMode) {
        delete formValues.childSku;
        delete formValues.product;
        delete formValues?.title;
      }

      const bodyFormData = new FormData();
      Object.keys(formValues)?.map(
        (item) =>
          formValues[item] !== "" &&
          formValues[item] !== undefined &&
          bodyFormData.append(`${item}`, formValues[item])
      );

      selectedProductImages?.map(
        (item) => item && bodyFormData.append("files", item?.file)
      );

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

      try {
        if (isVariantCreateMode) {
          const response = await dispatch(postVariantThunk(bodyFormData));
          if (postVariantThunk.fulfilled.match(response)) {
            nav(`${admin.PRODUCT.path}/${slug}${VARIANT}`);
            resetForm();
          }
          // if (postVariantThunk.fulfilled.match(response)) {
          //   if (selectedProductImages?.length > 0) {
          //     const bodyFormData = new FormData();
          //     selectedProductImages.forEach((item) => {
          //       bodyFormData.append("files", item?.file);
          //     });
          //     const imageResponse = await dispatch(
          //       updateVariantThunk({
          //         id: response.payload.data._id,
          //         value: bodyFormData,
          //       })
          //     );
          //     if (updateVariantThunk.fulfilled.match(imageResponse)) {
          //       resetForm();
          //       nav(`${admin.PRODUCT.path}/${slug}${VARIANT}`);
          //     }
          //   } else {
          //     resetForm();
          //     nav(`${admin.PRODUCT.path}/${slug}${VARIANT}`);
          //   }
          // } else {
          //   console.log("Failed to create variant:", response.error);
          // }
        } else {
          const response = await dispatch(
            updateVariantThunk({ id: id, value: bodyFormData })
          );
          if (updateVariantThunk.fulfilled.match(response)) {
            resetForm();
            nav(`${admin.PRODUCT.path}/${productSlug}${VARIANT}`);
          }
          // if (updateVariantThunk.fulfilled.match(response)) {
          //   if (selectedProductImages?.length > 0) {
          //     const bodyFormData = new FormData();
          //     selectedProductImages.forEach((item) => {
          //       bodyFormData.append("files", item?.file);
          //     });
          //     const imageResponse = await dispatch(
          //       updateVariantThunk({ id: id, value: bodyFormData })
          //     );
          //     if (updateVariantThunk.fulfilled.match(imageResponse)) {
          //       resetForm();
          //       nav(`${admin.PRODUCT.path}/${productSlug}${VARIANT}`);
          //     }
          //   } else {
          //     resetForm();
          //     nav(`${admin.PRODUCT.path}/${productSlug}${VARIANT}`);
          //   }
          // }
        }
      } catch (error) {
        console.error("Error in form submission:", error);
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
            updateVariantSingleAttributeThunk({
              id: productDetails._id,
              editId: isAttEdit.values._id,
              values: values,
            })
          );
          if (updateVariantSingleAttributeThunk.fulfilled.match(response)) {
            setIsAttEdit(null);
            handleAttModel();
          }
        } else {
          [...validation.values.attributes, ...allAttributes][isAttEdit.index] =
            values;
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
            updateVariantSingleCostThunk({
              id: productDetails._id,
              editId: isCostEdit.values._id,
              values: values,
            })
          );
          if (updateVariantSingleCostThunk.fulfilled.match(response)) {
            setIsCostEdit(null);
            handleCostModel();
          }
        } else {
          [...validation.values.cost, ...allCost][isCostEdit.index] = values;
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

  const handleFindId = ({ id, type }) => {
    if (!id) {
      return false;
    }
    return type?.filter((item) => item._id == id)?.length > 0 ? true : false;
  };

  // =====================================================
  //       handle delete / edit single attribute
  // =====================================================

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
            deleteVariantSingleAttributeThunk({ id, deleteId })
          );
          if (deleteVariantSingleAttributeThunk.fulfilled.match(response)) {
            setDeleteId(null);
            return true;
          }
          return false;
        } else {
          if (index >= 0 && index <= allAttributes?.length) {
            setAllAttributes((pre) => pre?.splice(index, 1));
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

  // ===========================================
  //        handle delete single file
  // ===========================================

  const handleDeleteFile = async ({ deleteId }) => {
    if (deleteId) setDeleteId(deleteId);
    triggerConfirmationAlert({
      dispatchFunction: async () => {
        const response = await dispatch(
          deleteSingleVariantFileThunk({ id, deleteId })
        );
        if (deleteSingleVariantFileThunk.fulfilled.match(response)) {
          deleteId(null);
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

  // ==========================================
  //            handle model function
  // ==========================================

  const handleAttModel = () => {
    setIsShowAttModel((pre) => !pre);
  };

  const handleCostModel = () => {
    setIsShowCostModel((pre) => !pre);
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
            deleteVariantSingleCostThunk({ id, deleteId })
          );
          if (deleteVariantSingleCostThunk.fulfilled.match(response)) {
            setCostMenuId(null);
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

  useEffect(() => {
    if (!priceData?.length > 0) {
      dispatch(getMetalPriceThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isVariantCreateMode && slug) {
      dispatch(getVariantDetailsThunk({ query: { slug } }));
    }
  }, [slug]);

  useEffect(() => {
    if (!categoryData?.length > 0) {
      //   dispatch(getCategoryThunk());
    }
    if (!subCategoryData?.length > 0) {
      //   dispatch(getSubCategoryThunk());
    }
  }, []);

  useEffect(() => {
    validation.setValues({
      childSku,
      title,
      shortDescription,
      metalColor,
      purity,
      isDraft,
      weight,
      length,
      width,
      height,
      size,
      range,
      price,
      quantity,
      files,
      cost,
      attributes,
      product,
      discountDescription,
      discountType,
      discountValue,
      availability,
    });
    // setAllAttributes(attributes);
    // setAllCost(cost);
  }, [productDetails]);

  useEffect(() => {
    validation.resetForm();
    attValidation.resetForm();
    costValidation.resetForm();
  }, [location.pathname]);
  return (
    <div className="py-20">
      <BreadCrumb
        title="product"
        pageTitle="variant"
        subPageTitle={isVariantCreateMode ? "add variant" : "edit variant"}
      />
      {!loading ? (
        <form onSubmit={validation.handleSubmit} className="">
          {/* <FilePond></FilePond> */}
          <div className="d-flex justify-content-center">
            {/* {validation?.values?.files?.length > 0 && (
            <Col
              xs={4}
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
            <Col xs={12} className="">
              <div className="bg-white p-20 br-5">
                {/* ================================================ 
                                      file pond
                ================================================ */}

                <Row className="">
                  {validation.values.files?.map((item, index) => {
                    const extension = item?.urls.match(
                      /\.([0-9a-z]+)(?:[\?#]|$)/i
                    );
                    return (
                      <Col xs={6} md={4} xl={3} key={index} className="mb-3">
                        <div
                          className={`${
                            deleteLoading && deleteId == item?._id
                              ? "opacity-loading"
                              : ""
                          } aspect-1_5-1 bg-color-titan-white br-5 overflow-hidden file-hover-parent w-100`}
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
                      <Col xs={6} md={4} xl={3} key={index} className="mb-3">
                        <div className="aspect-1_5-1 bg-color-titan-white br-5 overflow-hidden file-hover-parent w-100">
                          {item?.type == "image" ? (
                            <img
                              src={item?.url}
                              className="h-100 mx-auto d-block max-w-100 object-fit-cover"
                              alt=""
                            />
                          ) : (
                            <video
                              muted
                              autoPlay
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

                <Col xs={12} className={`pb-20`}>
                  {/* <Col className="mb-3">
                  <FilePond
                    allowMultiple
                    name="productImages"
                    acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                    onaddfile={(error, file) => {
                      setSelectedProductImages((pre) => [...pre, file.file]);
                    }}
                    onremovefile={() => {
                      validation.setFieldValue("image", "");
                    }}
                  ></FilePond>
                </Col> */}

                  {/* =================================================== 
                      first row for message, title, sku etc...
                =================================================== */}

                  <Row>
                    <Col lg={6}>
                      <Row>
                        <Col md={6} className="mb-3">
                          <InputField
                            name="title"
                            id="title"
                            label="title"
                            readOnly={!isVariantCreateMode ? true : false}
                            value={validation.values.title || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            isValid={
                              validation.touched.title &&
                              validation.errors.title
                            }
                            errorMessage={validation.errors.title}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <InputField
                            readOnly={isVariantCreateMode ? false : true}
                            name="childSku"
                            id="childSku"
                            label="child Sku"
                            value={validation.values.childSku || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            isValid={
                              validation.touched.childSku &&
                              validation.errors.childSku
                            }
                            errorMessage={validation.errors.childSku}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <InputField
                            label={`${
                              isVariantCreateMode
                                ? "Product Slug"
                                : "Variant Slug"
                            }`}
                            value={
                              isVariantCreateMode
                                ? validation.values.productSlug || ""
                                : slug || ""
                            }
                            readOnly
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <SelectField
                            name="isDraft"
                            id="isDraft"
                            label="is Draft"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.isDraft}
                            isValid={
                              validation.touched.isDraft &&
                              validation.errors.isDraft
                            }
                            errorMessage={validation.errors.isDraft}
                          >
                            <option value="">select is Draft</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </SelectField>
                        </Col>

                        <Col md={6} className="mb-3">
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
                        <Col md={6} className="mb-3">
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
                        <Col md={6} className="mb-3">
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
                        <Col lg={6} className="mb-3">
                          <InputField
                            name="purity"
                            id="purity"
                            label="purity"
                            value={validation.values.purity || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            isValid={
                              validation.touched.purity &&
                              validation.errors.purity
                            }
                            errorMessage={validation.errors.purity}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6}>
                      <TextAreaField
                        rows={11}
                        label="short description"
                        name="shortDescription"
                        id="shortDescription"
                        value={validation.values.shortDescription}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        isValid={
                          validation.touched.shortDescription &&
                          validation.errors.shortDescription
                        }
                        errorMessage={validation.errors.shortDescription}
                      />
                    </Col>
                  </Row>

                  {/* =================================================== 
                                    other fields
                =================================================== */}

                  <Row>
                    <Col sm={4} md={3} className="mb-3">
                      <InputField
                        name="weight"
                        id="weight"
                        label="weight"
                        value={validation.values.weight}
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

                  {/* ============================================== 
                                show attributes 
                ===============================================*/}

                  <p className="text-color-primary fw-medium">
                    Attributes ----
                  </p>

                  {/* <Row>
                  {[...validation.values.attributes, ...allAttributes]?.map(
                    (item, index) => {
                      const attTitle = item.attTitle;
                      const attName = item.attName;
                      const settingType = item.settingType;
                      const attWeight = item?.attWeight;
                      const number = item?.number;
                      return (
                        <Col xs={4} key={index} className="pb-20">
                          <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
                            <p
                              className="p-0 m-0 text-end cursor-pointer"
                              onClick={() =>
                                handleDeleteAttribute({
                                  id: productDetails?._id,
                                  deleteId: item?._id,
                                  index,
                                })
                              }
                            >
                              Delete
                            </p>
                            <p className="p-0 m-0 fw-medium">
                              <span className="text-color-secondary fw-normal">
                                att Title:-{" "}
                              </span>
                              {attTitle}
                            </p>
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
                          </div>
                        </Col>
                      );
                    }
                  )}
                </Row> */}

                  <Row>
                    {[...validation?.values?.attributes, ...allAttributes]?.map(
                      (item, index) => {
                        const attTitle = item.attTitle;
                        const attName = item.attName;
                        const settingType = item.settingType;
                        const attWeight = item?.attWeight;
                        const number = item?.number;
                        return (
                          <Col
                            sm={6}
                            md={4}
                            xl={3}
                            key={index}
                            className="pb-20"
                          >
                            <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
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
                                      id: productDetails._id,
                                      editId: item._id,
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
                          <i
                            className={`ri-add-line fs-12 fw-bold mx-auto`}
                          ></i>
                        </p>
                      </div>
                    </Col>
                  </Row>

                  {/* show cost */}

                  <p className="text-color-primary fw-medium">Cost ----</p>

                  {/* <Row>
                  {[...validation.values.cost, ...allCost]?.map(
                    (item, index) => {
                      const ratePerGram = item?.ratePerGram;
                      const costWeight = item?.costWeight;
                      const costType = item?.costType;
                      const costDiscount = item?.costDiscount;
                      const costDiscountType = item?.costDiscountType;
                      const costName = item?.costName;
                      return (
                        <Col xs={4} key={index} className="pb-20">
                          <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
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
                    }
                  )}
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
                          <Col
                            sm={6}
                            md={4}
                            xl={3}
                            key={index}
                            className="pb-20"
                          >
                            <div className="text-color-primary text-capitalize bg-white br-5 p-20 common-border-color border d-flex flex-column gap-2 fs-14">
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
                                  metal:-{" "}
                                </span>
                                {metal}
                              </div>
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
                                      id: productDetails._id,
                                      editId: item._id,
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
                          <i
                            className={`ri-add-line fs-12 fw-bold mx-auto`}
                          ></i>
                        </p>
                      </div>
                    </Col>
                  </Row>

                  {/* submit button */}

                  <Button
                    disabled={addUpdateLoading}
                    type="submit"
                    className="admin-primary-btn w-100 fs-14"
                  >
                    {addUpdateLoading ? "Submitting..." : "Submit"}
                  </Button>
                </Col>
              </div>
            </Col>
          </div>

          {/* ============================================= 
                            attribute model 
          ===============================================*/}

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

          {/* ============================================= 
                            cost model 
          ===============================================*/}

          <AdminModelWrapper
            show={isShowCostModel}
            onHide={handleCostModel}
            title={isCostEdit?.isEdit ? "Edit Cost" : "Add Cost"}
            onSubmit={costValidation.handleSubmit}
            loading={updateLoading}
            loadingText={isCostEdit?.isEdit ? "Updating..." : "Adding..."}
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
              />
              <InputField
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
          subTitle="Fetching product variant data"
        />
      )}
    </div>
  );
};

export default VariantDetailsForm;
