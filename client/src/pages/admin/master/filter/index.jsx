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
import { itemLimitEnum } from "../../../../helpers/enum";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";
import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "../../../../components/admin/inputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilterThunk,
  deleteSingleFilterThunk,
  getCategoryThunk,
  updateFilterThunk,
  updateSingleFilterThunk,
} from "../../../../store/actions";
import SelectField from "../../../../components/admin/inputField/SelectField";
import { createFilterThunk, getFilterThunk } from "../../../../store/actions";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import { setFilterValue } from "../../../../store/filters/slice";

const FilterMaster = () => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((store) => store.Categories);
  const { filters, loading, dataLoading, deleteLoading } = useSelector(
    (store) => store.Filters
  );
  const [editId, setEditId] = useState("");
  const [editMainId, setEditMainId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteMainId, setDeleteMainId] = useState("");
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    limit: 10,
  });
  const [clickedMenuId, setClickedMenuId] = useState();

  const triggerDeleteFiltersConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Filters",
    text: "Are you sure you want to delete the filters?",
    confirmButtonText: "Delete Filters",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Filters have been successfully deleted.",
  });

  const triggerDeleteSingleFilterConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Filter",
    text: "Are you sure you want to delete the filter?",
    confirmButtonText: "Delete Filter",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Filter have been successfully deleted.",
  });

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  const showModal = () => {
    setModal(true);
  };

  const initialValues = {
    category: "",
    title: "",
    filters: [
      {
        displayName: "",
        query: "",
        type: "string",
      },
    ],
  };

  const closeModal = () => {
    setModal(false);
    setEditId("");
    setEditMainId("");
    validation.resetForm({
      values: {
        ...initialValues,
        category: validation.values.category,
      },
    });
    // validation.resetForm();
  };

  const validationSchema = yup.object({
    category: yup.string().required("Please select the category"),
    title: yup.string().required(),
    filters: yup
      .array()
      .of(
        yup.object({
          displayName: yup.string().required("Please enter display name"),
          query: yup.string().required("query is required"),
          type: yup.string().required(),
        })
      )
      .required("At least one filter is required"),
  });

  const validation = useFormik({
    name: "filter validation",
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        if (editMainId && editId) {
          const mainId = editMainId;
          const id = editId;
          const data = { ...values.filters[0] };
          delete data._id;
          await dispatch(updateSingleFilterThunk({ mainId, id, values: data }));
        } else if (editMainId && !editId) {
          const id = editMainId;
          const data = {
            title: values.title,
            filters: values.filters,
          };
          await dispatch(updateFilterThunk({ id, values: data }));
        } else {
          await dispatch(createFilterThunk(values));
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        dispatch(getFilterThunk({ category: values.category }));
        closeModal();
      }
    },
  });

  const handleDeleteFilters = async (id) => {
    triggerDeleteFiltersConfirmation({
      dispatchFunction: async () => {
        setDeleteMainId(id);
        const response = await dispatch(deleteFilterThunk(id));
        if (deleteFilterThunk.fulfilled.match(response)) {
          dispatch(getFilterThunk({ category: validation.values.category }));
          setDeleteMainId("");
          return true;
        }
        if (deleteFilterThunk.rejected.match(response)) {
          dispatch(getFilterThunk({ category: validation.values.category }));
          return false;
        }
      },
    });
  };

  const handleDeleteSingleFilter = async (mainId, id) => {
    setDeleteId(id);
    triggerDeleteSingleFilterConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(
          deleteSingleFilterThunk({ mainId, id })
        );
        if (deleteSingleFilterThunk.fulfilled.match(response)) {
          dispatch(getFilterThunk({ category: validation.values.category }));
          setDeleteId("");
          return true;
        }
        if (deleteSingleFilterThunk.rejected.match(response)) {
          dispatch(getFilterThunk({ category: validation.values.category }));
          return false;
        }
      },
    });
  };

  const handleAddMoreFilter = (mainId, values) => {
    const { title } = values;
    setEditMainId(mainId);
    validation.setValues({
      category: validation.values.category,
      title: title,
      filters: [],
    });
    showModal();
  };

  const handleEditSingleFilter = ({ mainId, id, data, title }) => {
    setEditMainId(mainId);
    setEditId(id);
    validation.setValues({
      category: validation.values.category,
      title: title,
      filters: [data],
    });
    showModal();
  };

  const handleAddFiltersFields = () => {
    validation.setValues({
      ...validation.values,
      filters: [
        ...validation.values.filters,
        { displayName: "", query: "", type: "string" },
      ],
    });
  };

  const handleRemoveFiltersFields = (index) => {
    const updatedFilters = [...validation.values.filters];
    updatedFilters.splice(index, 1);
    validation.setValues({
      ...validation.values,
      filters: updatedFilters,
    });
  };

  const handleSearchFilters = () => {
    dispatch(getFilterThunk({ category: validation.values.category }));
  };

  useEffect(() => {
    if (!categoryData?.length > 0) {
      dispatch(getCategoryThunk());
    }
  }, [categoryData, dispatch]);

  useEffect(() => {
    if (!validation.values.category) {
      dispatch(setFilterValue([]));
    }
  }, [validation.values.category, dispatch]);

  return (
    <div className={`py-20`}>
      <BreadCrumb title="master" pageTitle="filter" />
      <div className={`bg-white br-5 px-1 border common-border-color`}>
        <Row className={`align-items-center filter-options px-3 pt-3`}>
          {/* <Col className={`px-2`} lg={4} xl={4} xxl={12}> */}
          <Col xs={12} sm={12} md={6} xl={8} className={`px-2 mb-3`}>
            <div
              className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
            >
              <select
                className={`text-capitalize fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                aria-label="Default select example"
                value={validation.values.category}
                name="category"
                onChange={(e) => {
                  handleSearch(e.target);
                  validation.setFieldValue("category", e.target.value);
                }}
              >
                <option value="">select category</option>
                {categoryData?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} xl={2} className={`px-2 mb-3`}>
            <div className={`admin-primary-btn-div`}>
              <Button
                disabled={validation.values.category ? dataLoading : true}
                onClick={handleSearchFilters}
                className={`text-truncate d-block m-0 text-center admin-primary-btn w-100 fs-15 fw-medium`}
              >
                {dataLoading ? "Searching..." : "Show Filters"}
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} xl={2} className={`px-2 mb-3`}>
            <div className={`admin-primary-btn-div`}>
              <Button
                onClick={showModal}
                className={`text-truncate d-block m-0 text-center admin-primary-btn w-100 fs-15 fw-medium`}
              >
                <i className="ri-add-circle-line fs-16"></i> Add Filter
              </Button>
            </div>
          </Col>
          {/* </Col> */}
          {/* <Col className={`ms-auto`} lg={8} xl={8} xxl={6}>
            <Row className={`px-1 pe-0 justify-content-end`}>
              <Col className={`col-lg-auto px-2 mb-3`}>
                <div className={`admin-primary-btn-div`}>
                  <Button
                    onClick={showModal}
                    className={`text-truncate d-block m-0 text-center admin-primary-btn w-100 fs-15 fw-medium`}
                  >
                    <i className="ri-add-circle-line fs-16"></i> Add Filter
                  </Button>
                </div>
              </Col>
              <Col className={`col-lg-auto px-2 mb-3`}>
                <div className={`admin-primary-btn-div`}>
                  <Button
                    onClick={showModal}
                    className={`text-truncate d-block m-0 text-center admin-primary-btn w-100 fs-15 fw-medium`}
                  >
                    <i className="ri-add-circle-line fs-16"></i> Add Filter
                  </Button>
                </div>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </div>
      <div>
        <Row className={`px-1`}>
          {dataLoading ? (
            <div className="text-center mt-4">
              <lord-icon
                src={`https://cdn.lordicon.com/sfwxcaka.json`}
                trigger="loop"
                colors="primary:#405189,secondary:#3695e0"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              ></lord-icon>
            </div>
          ) : filters.length > 0 ? (
            // ============================
            //        main code
            // ============================
            filters.map((ele) => {
              const mainId = ele?._id;
              const title = ele?.title;
              const filtersArray = ele?.filters;
              return (
                <Col className={`mt-3 px-2`} xxl={12} key={mainId}>
                  <div
                    className={`bg-white border common-border-color br-5 p-3`}
                  >
                    <div
                      className={`d-flex align-items-center justify-content-between`}
                    >
                      <div className={`top-label`}>
                        <span
                          className={`text-capitalize fs-14 fw-normal lh-base text-color-secondary`}
                        >
                          filter name :
                        </span>
                        <span
                          className={`text-capitalize fs-14 fw-normal lh-base text-color-primary`}
                        >
                          {" "}
                          {title}
                        </span>
                      </div>
                      {deleteMainId === mainId && (
                        <div
                          className={`text-danger fs-16 fw-medium text-capitalize`}
                        >
                          deleting...
                        </div>
                      )}
                    </div>
                    <div
                      className={`table-responsive overflow-scroll-design bg-white px-0 mt-2`}
                    >
                      <Table
                        className={`align-middle border common-border-color mb-0`}
                      >
                        <thead>
                          <tr>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                display
                              </span>
                            </th>
                            <th
                              className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                query
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
                              className={`w-10 px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                            >
                              <span
                                className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                              >
                                actions
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtersArray?.length > 0 ? (
                            filtersArray?.map((ele, index) => {
                              const id = ele?._id;
                              const displayName = ele?.displayName;
                              const query = ele?.query;
                              const type = ele?.type;
                              return (
                                <tr key={id || index}>
                                  <td
                                    className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                  >
                                    <span
                                      className={`text-truncate text-capitalize fs-14 lh-base fw-medium text-color-secondary`}
                                    >
                                      {displayName}
                                    </span>
                                  </td>
                                  <td
                                    className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                  >
                                    <span
                                      className={`text-truncate text-capitalize fs-14 lh-base fw-medium text-color-secondary`}
                                    >
                                      {query}
                                    </span>
                                  </td>
                                  <td
                                    className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                  >
                                    <span
                                      className={`text-truncate text-capitalize fs-14 lh-base fw-medium text-color-secondary`}
                                    >
                                      {type}
                                    </span>
                                  </td>
                                  <td
                                    className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                  >
                                    <div
                                      className={`d-flex align-items-center justify-content-center gap-2`}
                                    >
                                      <Button
                                        onClick={() =>
                                          handleEditSingleFilter({
                                            mainId,
                                            id,
                                            title,
                                            data: ele,
                                          })
                                        }
                                        className={`m-0 p-0 bg-transparent border-0`}
                                      >
                                        <i className="text-color-secondary fs-16 fw-bold ri-edit-line"></i>
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteSingleFilter(mainId, id)
                                        }
                                        className={`m-0 p-0 ${
                                          deleteLoading &&
                                          (deleteMainId === mainId ||
                                            deleteId === id)
                                            ? "spin"
                                            : ""
                                        } bg-transparent border-0`}
                                      >
                                        <i
                                          className={`text-danger ${
                                            deleteLoading &&
                                            (deleteMainId === mainId ||
                                              deleteId === id)
                                              ? "fs-18 ri-loader-2-line"
                                              : "fs-16 ri-delete-bin-6-line"
                                          }`}
                                        ></i>
                                      </Button>
                                    </div>
                                    {/* <ToggleMenu
                                    onClick={() => setClickedMenuId(id)}
                                    isOpen={id == clickedMenuId}
                                    rootClass={"tbody"}
                                  >
                                    <p
                                      className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                      // onClick={() =>
                                      //   navigate(
                                      //     `${ADMIN.ORDERS.path}/${orderId}`
                                      //   )
                                      // }
                                    >
                                      View
                                    </p>
                                  </ToggleMenu> */}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={4} className={`bg-white`}>
                                <DynamicNoData
                                  icon="unukghxb"
                                  title="Oops ! No Any Filter Yet !"
                                  subTitle={`You will get all the filters of ${title} here !`}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <div className={`mt-3`}>
                      {!deleteMainId && (
                        <ToggleMenu
                          onClick={() => setClickedMenuId(mainId)}
                          isOpen={mainId == clickedMenuId}
                          margin="ms-auto"
                        >
                          <p
                            className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                            onClick={() => handleDeleteFilters(mainId)}
                          >
                            Delete
                          </p>
                          <p
                            className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                            onClick={() => handleAddMoreFilter(mainId, ele)}
                          >
                            Edit Filter
                          </p>
                        </ToggleMenu>
                      )}
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <div className={`mx-auto`}>
              <DynamicNoData
                icon="unukghxb"
                title="Oops ! No Any Filters Yet !"
                subTitle={`You will get all the filters here !`}
              />
            </div>
          )}
        </Row>
      </div>
      {/* ============================ 
        banner slider model 
      ============================ */}
      <AdminModelWrapper
        size="lg"
        show={modal}
        loading={loading}
        title={editMainId ? "Update Filter" : "Add Filter"}
        onSubmit={validation.handleSubmit}
        onHide={closeModal}
      >
        <Modal.Body>
          <div>
            <div className="mt-3">
              <SelectField
                disabled={editMainId || editId ? true : false}
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
            <div className="mt-3">
              <InputField
                readOnly={editMainId && editId ? true : false}
                placeholder={"enter filter name"}
                label="Filter Name"
                name="title"
                id="title"
                value={validation.values.title}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                isValid={validation.touched.title && validation.errors.title}
                errorMessage={validation.errors.title}
              />
            </div>
            {validation.values.filters.map((ele, index) => {
              return (
                <div key={index}>
                  <Row className={`px-1`}>
                    <Col lg={4} className={`px-2`}>
                      <div className="mt-3">
                        <InputField
                          placeholder={"enter display name"}
                          label="Display Name"
                          name={`filters.${index}.displayName`}
                          id={`displayName-${index}`}
                          value={ele.displayName}
                          onChange={validation.handleChange}
                          onReset={validation.handleReset}
                          onBlur={validation.handleBlur}
                          isValid={
                            validation.touched.filters &&
                            validation.errors.filters?.[index]?.displayName
                          }
                          errorMessage={
                            validation.errors.filters?.[index]?.displayName
                          }
                        />
                      </div>
                    </Col>
                    {ele.type === "string" ? (
                      <Col lg={4} className={`px-2`}>
                        <div className="mt-3">
                          <InputField
                            placeholder={"enter query"}
                            label="Query"
                            name={`filters.${index}.query`}
                            id={`query-${index}`}
                            value={ele.query}
                            onChange={validation.handleChange}
                            onReset={validation.handleReset}
                            onBlur={validation.handleBlur}
                            isValid={
                              validation.touched.filters &&
                              validation.errors.filters?.[index]?.query
                            }
                            errorMessage={
                              validation.errors.filters?.[index]?.query
                            }
                          />
                        </div>
                      </Col>
                    ) : (
                      <Col lg={4} className={`px-2`}>
                        <div className="mt-3">
                          <SelectField
                            name={`filters.${index}.query`}
                            id={`query-${index}`}
                            label="query"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={ele.query}
                            isValid={
                              validation.touched.filters &&
                              validation.errors.filters?.[index]?.query
                            }
                            errorMessage={
                              validation.errors.filters?.[index]?.query
                            }
                          >
                            <option value="">select boolean</option>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                          </SelectField>
                        </div>
                      </Col>
                    )}
                    <Col lg={4} className={`px-2`}>
                      <div className="mt-3">
                        <SelectField
                          name={`filters.${index}.type`}
                          id={`type-${index}`}
                          label="type"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={ele.type}
                          isValid={
                            validation.touched.filters &&
                            validation.errors.filters?.[index]?.type
                          }
                          errorMessage={
                            validation.errors.filters?.[index]?.type
                          }
                        >
                          <option value="string">string</option>
                          <option value="boolean">boolean</option>
                        </SelectField>
                      </div>
                    </Col>
                  </Row>
                  {index < validation.values.filters.length - 1 && (
                    <Button
                      onClick={() => handleRemoveFiltersFields(index)}
                      className={`border mt-3 d-block w-100 px-3 text-color-primary input-field-bg button-border-blue`}
                    >
                      <i className="ri-subtract-line"></i>
                    </Button>
                  )}
                </div>
              );
            })}
            <Button
              onClick={handleAddFiltersFields}
              className={`border mt-3 d-block w-100 px-3 text-color-primary input-field-bg button-border-blue`}
            >
              {editMainId && !editId ? (
                <span className={`fs-14 fw-medium`}>
                  <i className="ri-add-circle-line fs-16"></i> Add Field
                </span>
              ) : (
                <i className="ri-add-line"></i>
              )}
            </Button>
          </div>
        </Modal.Body>
      </AdminModelWrapper>
    </div>
  );
};

export default FilterMaster;
