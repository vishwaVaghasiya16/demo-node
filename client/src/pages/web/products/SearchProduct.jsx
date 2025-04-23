import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import { CLIENT } from "../../../routes/routesConstants";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { currencyHandler } from "../../../helpers/currencyHandler";
import ProductGridViewLoader from "../../../components/web/loader/ProductGridViewLoader";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  postAddToCartThunk,
  postWishlistThunk,
  searchProductPaginationThunk,
  searchProductThunk,
} from "../../../store/actions";
import NoRecord from "../../../components/web/displayMessagePages/NoRecord";
import {
  setCurrentPage,
  setSelectedFilterData,
} from "../../../store/products/slice";

const SearchProduct = () => {
  const {
    searchPagination,
    searchData,
    loading,
    currentPage,
    filterObject,
    searchPaginationLoading,
    sortByOptions,
    selectedFilterData,
  } = useSelector((store) => store.Products);
  const [limit] = useState(15);
  const { slug } = useParams();
  const lengthArray = Array.from({ length: 10 }, (a, b) => b);
  let [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);

  const { activeIds } = useSelector((store) => store.Wishlist);
  const dispatch = useDispatch();

  const handleAddWishlist = async (id) => {
    await dispatch(postWishlistThunk(id));
  };

  const handleCompareIdToWishlist = (id) => {
    if (activeIds) {
      return activeIds.includes(id) ? true : false;
    }
  };

  const handleAddToCart = async (id) => {
    await dispatch(postAddToCartThunk(id));
  };

  const handleAddRecentProductData = (ele) => {
    dispatch(setRecentlyProduct(ele));
  };

  const queryString = searchParams.get("sort");
  const selectedSortBy = sortByOptions.find(
    (item) => item.queryString === queryString
  );

  const handleSort = (selectedSortOption) => {
    dispatch(setSelectedFilterData(selectedSortOption));
  };

  const handleFilterOffCanvas = () => {
    setShow(true);
  };

  useEffect(() => {
    if (slug) {
      dispatch(searchProductThunk({ tag: slug, limit, ...filterObject }));
    }
  }, [slug, filterObject]);

  const productDiv = document.getElementById("productMainDiv");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const { bottom } = productDiv?.getBoundingClientRect();
      const isBottom = bottom <= windowHeight && bottom > 100;
      if (
        !searchPaginationLoading &&
        isBottom &&
        searchPagination?.page < searchPagination?.totalPages
      ) {
        // dispatch(setCurrentPage(searchPagination?.page + 1));
        dispatch(
          searchProductPaginationThunk({
            page: searchPagination?.page + 1,
            limit,
            tag: slug,
            ...filterObject,
          })
        );
      }
    };

    const queryStringObj = {};
    selectedFilterData.forEach((ele) => {
      queryStringObj[ele.filterType] = ele.queryString;
    });
    setSearchParams(queryStringObj);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    productDiv,
    dispatch,
    searchPagination,
    searchPaginationLoading,
    filterObject,
    selectedFilterData,
  ]);

  return (
    <div className="show-products-page page-content">
      <Container>
        <div className="pb-3 pb-md-4 pb-lg-2">
          <PageHeader
            totalProductCount={searchPagination?.totalItems}
            title={CLIENT.CATEGORY.split("/")?.[1]}
            // pageTitle={pageTitle}
            // subPageTitle={subPageTitle}
            categories={true}
            // isShowCount={true}
          />
        </div>
        <div
          id="productMainDiv"
          className={`position-relative pt-2 paddingBottom mb-lg-5 products-grid-view-page`}
        >
          <div
            className={`border-bottom border-color-light-gray h-40 pb-3 mt-lg-3`}
          >
            <div
              className={`d-flex flex-wrap align-items-center justify-content-between`}
            >
              <Col
                // className={`${
                //   displayFilterOptions?.length > 0
                //     ? "d-block"
                //     : "d-none d-lg-block"
                // }`}
                xs={5}
                sm={5}
              >
                <span
                  className={`d-none d-lg-block mb-1 text-capitalize responsive fs-16 fw-medium text-color-secondary lh-base`}
                >
                  Product:
                  {searchData?.length}
                </span>
              </Col>
              <Col xs={5} sm={5}>
                <div
                  className={`w-fit ms-auto mb-1 cursor-pointer position-relative sort-by d-flex align-items-center gap-2 responsive fs-16 fw-medium text-color-secondary lh-base`}
                >
                  <span className={`d-none d-lg-block text-uppercase`}>
                    Sort By :
                  </span>
                  <Button
                    className={`p-0 m-0 bg-transparent border-0 text-capitalize d-flex align-items-center responsive fs-16 fw-medium text-color-secondary lh-base`}
                  >
                    <span>
                      {selectedSortBy
                        ? selectedSortBy.displayContent
                        : "all products"}
                    </span>
                    <i className="lh-1 fs-4 ri-arrow-down-s-line"></i>
                  </Button>
                  <div
                    className={`z-3 sort-by-box position-absolute w-auto top-100 end-0 d-none`}
                  >
                    <div
                      className={`mt-2 bg-white shadow br-10 border px-4 py-3 d-flex flex-column align-items-start gap-2`}
                    >
                      {sortByOptions.map((ele, index) => {
                        const queryString = ele.queryString;
                        const displayContent = ele.displayContent;
                        return (
                          <Button
                            onClick={() =>
                              handleSort({
                                filterType: "sort",
                                queryString,
                              })
                            }
                            key={index}
                            className={`opacity-75 bg-transparent p-0 m-0 border-0 responsive fs-14 fw-normal lh-base ls-1px text-capitalize text-color-primary`}
                          >
                            {displayContent}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </div>
          <Row className={`px-1 mb-3 mb-md-4`}>
            {searchData?.map((ele, index) => {
              const id = ele?._id;
              const slug = ele?.slug;
              const title = ele?.title;
              const type = ele?.productType;
              const total = Math.floor(ele?.grandTotal);
              const totalCost = Math.floor(ele?.totalCost);
              const category = ele?.subCategory || ele?.category;
              const label = ele?.label || "";
              return (
                <Col
                  key={id || index}
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  xxl={2}
                  className={`px-lg-0 px-2 mt-3 mt-md-4 mt-lg-0 search-product-col`}
                >
                  <div className={`position-relative product-main-box`}>
                    <div
                      className={`${
                        loading && searchData?.length === 0 ? "" : "product-box"
                      } hover-opacity-1 z-1 p-0 p-lg-3 w-100 position-absolute top-0 start-0 br-10 transition-box-shadow`}
                    >
                      {loading && searchData?.length === 0 ? (
                        <ProductGridViewLoader />
                      ) : (
                        <div className="position-relative w-100 h-100 responsive">
                          {label && (
                            <p className="z-2 p-0 m-0 position-absolute top-0 start-0 m-3 bg-white text-color-primary fw-medium responsive fs-12 py-1 px-2 br-5 text-capitalize">
                              {label}
                            </p>
                          )}
                          <span
                            className="z-2 position-absolute transition-opacity wishlist-btn end-0 top-0 m-3 cursor-pointer w-35px bg-white h-35px rounded-circle opacity opacity-0 zoom-hover  d-flex justify-content-center align-items-center shadow-lg"
                            onClick={() => handleAddWishlist(id)}
                          >
                            <i
                              className={`${
                                handleCompareIdToWishlist(id)
                                  ? "ri-heart-3-fill"
                                  : "ri-heart-3-line"
                              }  responsive fs-18 line-height-2 zoom transition-transform`}
                            ></i>
                          </span>
                          <Link
                            onClick={() => handleAddRecentProductData(ele)}
                            target="_blank"
                            to={`${CLIENT.PRODUCT_DETAILS}/${slug}`}
                          >
                            <div className="position-relative product-image-box bg-gradient-gra cursor-pointer br-10 overflow-hidden">
                              <Swiper
                                navigation={true}
                                modules={[Navigation]}
                                className={`h-100`}
                                loop={ele?.files?.length > 1 && true}
                                breakpoints={{
                                  0: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                  },
                                }}
                                pagination={{ clickable: true }}
                              >
                                {ele.files?.map((ele, index) => {
                                  const url = ele?.urls;
                                  return (
                                    <SwiperSlide
                                      className={`common-border br-10`}
                                      key={index}
                                    >
                                      <img
                                        loading="lazy"
                                        className="w-100 h-100 product-image object-fit-cover"
                                        src={url}
                                        alt={`product-${index + 1}`}
                                      />
                                    </SwiperSlide>
                                  );
                                })}
                              </Swiper>
                            </div>
                          </Link>
                          <div className="mt-2">
                            <p className="fs-12 text-color-secondary truncate-line-3 text-uppercase  m-0 mt-2">
                              {category?.title}
                            </p>
                            {/* <p className="p-0 m-0 fs-12 text-color-primary opacity-50 m-0 mb-1 text-uppercase">
                            {type}
                          </p> */}
                            <p className="p-0 m-0 text-color-primary fw-medium fs-15 text-overflow-ellipsis mt-1 text-capitalize">
                              {title}
                            </p>
                            <p className="p-0 m-0 line-height-2 fw-bold fs-16 text-color-primary">
                              {currencyHandler(total)}
                              {totalCost > total && (
                                <span className="fw-medium text-color-secondary fs-14 ms-1">
                                  {" "}
                                  <s>{currencyHandler(totalCost)}</s>{" "}
                                </span>
                              )}
                              {""}
                            </p>
                          </div>
                          <Button
                            className="d-block p-0 m-0 border-0 text-white primary-btn fs-14 mt-2 opacity-sm-0"
                            onClick={() => handleAddToCart(id)}
                          >
                            Add To Cart
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
            {/* {loading && searchData?.length > 0 && searchPagination?.page > 1
              ? lengthArray.map((_, index) => {
                  return (
                    <Col
                      key={index}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={4}
                      xxl={3}
                      className={`px-lg-0 px-2 mb-3 mb-md-4 mb-lg-0 search-product-col`}
                    >
                      <div className={`position-relative product-main-box`}>
                        <div
                          className={`product-box hover-opacity-1 z-1 p-0 p-lg-3 w-100 position-absolute top-0 start-0 br-10 transition-box-shadow`}
                        >
                          <ProductGridViewLoader />
                        </div>
                      </div>
                    </Col>
                  );
                })
              : null} */}
            {searchPaginationLoading
              ? lengthArray.map((_, index) => {
                  return (
                    <Col
                      key={index}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={4}
                      xxl={3}
                      className={`px-lg-0 px-2 mb-3 mb-md-4 mb-lg-0 search-product-col`}
                    >
                      <div className={`position-relative product-main-box`}>
                        <div
                          className={`product-box hover-opacity-1 z-1 p-0 p-lg-3 w-100 position-absolute top-0 start-0 br-10 transition-box-shadow`}
                        >
                          <ProductGridViewLoader />
                        </div>
                      </div>
                    </Col>
                  );
                })
              : null}
            {!loading && !searchData?.length > 0 && <NoRecord />}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SearchProduct;
