import { useEffect, useState } from "react";
import {
  deleteProductReviewThunk,
  getProductReviewsByAdminThunk,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row, Table } from "react-bootstrap";
import { itemLimitEnum } from "../../../../helpers/enum";
import ReviewsTableLoader from "./ReviewsTableLoader";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import { getMomentDate } from "../../../../components/common/MomentFun";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import defaultProductImg from "/assets/admin/defaultProduct.webp";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { UPDATE } from "../../../../routes/AdminRoutes";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import ReactStars from "react-stars";
import { setSingleReviewDetails } from "../../../../store/productDetails/slice";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";

const ProductReviewsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviews, reviewPaginationData, reviewLoading } = useSelector(
    (store) => store.ProductDetails
  );
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    limit: 10,
  });
  const [active, setActive] = useState(1);
  const [clickedMenuId, setClickedMenuId] = useState();
  const ADMIN = Admin();

  const triggerDeleteCouponConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Review",
    text: "Are you sure you want to delete the review?",
    confirmButtonText: "Delete Review",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Review has been successfully deleted.",
  });

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

  const handleDeleteReview = async (id) => {
    triggerDeleteCouponConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(deleteProductReviewThunk(id));
        if (deleteProductReviewThunk.fulfilled.match(response)) {
          dispatch(
            getProductReviewsByAdminThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          return true;
        }
        if (deleteProductReviewThunk.rejected.match(response)) {
          dispatch(
            getProductReviewsByAdminThunk({
              page: active,
              limit: searchQuery.limit,
            })
          );
          return false;
        }
      },
    });
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { search } = searchQuery;
    if (search === "") {
      setActive(1);
      dispatch(getProductReviewsByAdminThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (search !== "") {
          setActive(1);
          dispatch(getProductReviewsByAdminThunk(searchQuery));
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getProductReviewsByAdminThunk({ page, limit: searchQuery.limit }));
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="apps" pageTitle="reviews list" />
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
            </Col>
          </Row>
          {/* ======================
          Table Design Start 
       ======================*/}
          <div
            className={`table-responsive overflow-scroll-design bg-white px-0`}
          >
            {reviews && reviews.length > 0 ? (
              <Table className={`align-middle mb-0`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        date
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        product ID
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        product name
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        customer review
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        rating
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
                {reviewLoading ? (
                  <ReviewsTableLoader />
                ) : (
                  <tbody>
                    {reviews.map((ele, index) => {
                      const id = ele?._id;
                      const sku = ele?.product?.sku;
                      const productSlug = ele?.product?.slug;
                      const productId = ele?.product?._id;
                      const productName = ele?.product?.title;
                      const url =
                        ele?.product?.files?.length > 0 &&
                        ele?.product?.files[0]?.urls;
                      const userImage = ele?.user?.url;
                      const username = ele?.user?.username;
                      const message = ele?.message;
                      const createdAt = ele?.createdAt;
                      const rating = ele?.rating;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {getMomentDate(createdAt, "DD MMM, YYYY")}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Link
                              to={`${ADMIN.PRODUCT.path}${UPDATE}/${productSlug}`}
                            >
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {sku}
                              </span>
                            </Link>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Link
                              to={`${ADMIN.PRODUCT.path}${UPDATE}/${productSlug}`}
                            >
                              <div
                                className={`w-fit d-flex align-items-center gap-2`}
                              >
                                <div
                                  className={`wh-35 border common-border-color br-5 overflow-hidden`}
                                >
                                  <img
                                    src={
                                      url && url.includes(".mp4")
                                        ? defaultProductImg
                                        : url
                                    }
                                    alt={`product-${productId}`}
                                    className={`w-100 h-100 object-fit-cover`}
                                  />
                                </div>
                                <div>
                                  <span
                                    className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                  >
                                    {productName}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td
                            className={`w-30p bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <div className={`d-flex align-items-center gap-2`}>
                              <div>
                                <div
                                  className={`wh-35 border common-border-color rounded-circle overflow-hidden`}
                                >
                                  <img
                                    loading="lazy"
                                    src={userImage || defaultUserImg}
                                    alt={`user-${id}`}
                                    className={`w-100 h-100 object-fit-cover`}
                                  />
                                </div>
                              </div>

                              <div className={`text-start`}>
                                <span
                                  className={`d-flex align-items-center gap-1 text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                >
                                  by
                                  <span className="text-color-primary">
                                    {username}
                                  </span>
                                </span>
                                <span
                                  className={`d-flex align-items-center gap-2 fs-14 lh-base truncate-line-2 fw-medium text-color-secondary text-capitalize`}
                                >
                                  {message}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <div className={`d-flex align-items-center gap-2`}>
                              <ReactStars
                                count={1}
                                value={1}
                                size={14}
                                edit={false}
                                color2="#24ff00"
                              />
                              <span
                                className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                              >
                                {rating}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`w-1 bg-white px-3 py-10 border-bottom common-border-color`}
                          >
                            <ToggleMenu
                              onClick={() => setClickedMenuId(id)}
                              isOpen={id == clickedMenuId}
                              rootClass={"tbody"}
                            >
                              <p
                                className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                onClick={() => {
                                  dispatch(setSingleReviewDetails(ele));
                                  navigate(`${ADMIN.REVIEWS.path}/${id}`);
                                }}
                              >
                                View
                              </p>
                              <p
                                className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                onClick={() => handleDeleteReview(id)}
                              >
                                Delete
                              </p>
                            </ToggleMenu>
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
                  icon="vcuhguff"
                  title="Oops ! No Any Reviews Yet !"
                  subTitle="Stay tuned for reviews !"
                />
              </div>
            )}
          </div>
          {reviewPaginationData?.totalItems > 0 && !reviewLoading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={reviewPaginationData?.totalItems}
                size={reviewPaginationData?.totalPages}
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

export default ProductReviewsTable;
