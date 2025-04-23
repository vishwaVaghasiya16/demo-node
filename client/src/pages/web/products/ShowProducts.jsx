import { useEffect, useState } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  setClearAllFilters,
  setDisplayFilterOptions,
  setProductViewType,
  setSelectedFilterData,
} from "../../../store/products/slice";
import { productViewTypeEnum } from "../../../helpers/enum";
import ProductsGridView from "./ProductsGridView";
import ProductListView from "./ProductListView";
import {
  getProductsOnScrollThunk,
  getProductsThunk,
} from "../../../store/actions";
import FilterOptionsList from "./FilterOptionsList";
import { useMediaQuery } from "react-responsive";
import NoRecord from "../../../components/web/displayMessagePages/NoRecord";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import { CLIENT } from "../../../routes/routesConstants";
import Lottie from "lottie-react";
import noRecord from "/src/data/lottie/noRecord.json";

const ShowProducts = () => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((store) => store.Categories);
  const {
    products,
    displayFilterOptions,
    filterObject,
    sortByOptions,
    productViewType,
    currentPage,
    productsPaginationData,
    selectedFilterData,
  } = useSelector((store) => store.Products);
  const { categoryslug, subcategoryslug } = useParams();
  const [show, setShow] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [subPageTitle, setSubPageTitle] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const queryString = searchParams.get("sort");
  const selectedSortBy = sortByOptions.find(
    (item) => item.queryString === queryString
  );

  const [limit] = useState(16);

  const sm = useMediaQuery({ query: "(max-width: 767px)" });

  const handleSort = (selectedSortOption) => {
    dispatch(setSelectedFilterData(selectedSortOption));
  };

  const handleClearAllFilter = () => {
    dispatch(setClearAllFilters());
  };

  const handleFilterOffCanvas = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    for (const [key, value] of queryParams.entries()) {
      dispatch(setSelectedFilterData({ filterType: key, queryString: value }));
    }
  }, [dispatch]);

  useEffect(() => {
    const queryStringObj = {};
    selectedFilterData.forEach((ele) => {
      queryStringObj[ele.filterType] = ele.queryString;
    });

    // dispatch(setProduct(queryStringObj));
    setSearchParams(queryStringObj);
  }, [selectedFilterData, setSearchParams, dispatch]);

  useEffect(() => {
    const singleCategoryFilter = categoryData.filter(
      (items) => items.slug === categoryslug
    );

    // if (categoryslug && !subcategoryslug) {
    //   dispatch(setDisplayFilterOptions(singleCategoryFilter[0]?.filters));
    // } else if (categoryslug && subcategoryslug) {
    //   const singleSubCategoryFilter =
    //     singleCategoryFilter[0]?.subCategory?.filter(
    //       (items) => items.slug === subcategoryslug
    //     );
    //   if (singleSubCategoryFilter[0]?.filters.length === 0) {
    //     dispatch(setDisplayFilterOptions(singleCategoryFilter[0]?.filters));
    //   } else {
    //     dispatch(setDisplayFilterOptions(singleSubCategoryFilter[0]?.filters));
    //   }
    // } else {
    //   dispatch(setDisplayFilterOptions([]));
    // }

    setPageTitle(categoryslug);
    setSubPageTitle(subcategoryslug);

    dispatch(
      setDisplayFilterOptions(
        categoryslug && !subcategoryslug
          ? singleCategoryFilter[0]?.filters
          : categoryslug && subcategoryslug
          ? singleCategoryFilter[0]?.subCategory?.find(
              (items) => items.slug === subcategoryslug
            )?.filters || singleCategoryFilter[0]?.filters
          : []
      )
    );

    if (currentPage > 1) {
      dispatch(
        getProductsOnScrollThunk({
          ...filterObject,
          limit: limit,
          page: currentPage,
          ...(subcategoryslug
            ? { subcategorySlug: subcategoryslug }
            : { categorySlug: categoryslug }),
        })
      );
    } else {
      dispatch(
        getProductsThunk({
          ...filterObject,
          limit: limit,
          page: currentPage,
          ...(subcategoryslug
            ? { subcategorySlug: subcategoryslug }
            : { categorySlug: categoryslug }),
        })
      );
    }
  }, [
    // categoryData,
    subcategoryslug,
    categoryslug,
    dispatch,
    currentPage,
    filterObject,
    limit,
  ]);

  useEffect(() => {
    if (sm) {
      dispatch(setProductViewType(productViewTypeEnum.LIST));
    } else {
      dispatch(setProductViewType(productViewTypeEnum.GRID));
    }
  }, [dispatch, sm]);

  return (
    <div className={`show-products-page page-content`}>
      <Container>
        <div className={`pb-3 pb-md-4 pb-lg-2`}>
          <PageHeader
            totalProductCount={productsPaginationData?.totalItems}
            title={CLIENT.CATEGORY.split("/")?.[1]}
            pageTitle={pageTitle}
            subPageTitle={subPageTitle}
            categories={true}
            isShowCount={true}
          />
        </div>
        {displayFilterOptions?.length > 0 || products?.length > 0 ? (
          <>
            <Row>
              {/* {displayFilterOptions?.length > 0 ? ( */}
              <Col
                className={`custom-width d-none d-lg-block`}
                xs={12}
                lg={3}
                xl={3}
                xxl={3}
              >
                <div
                  className={`display-filter-options position-sticky top-0 pt-lg-3 pb-lg-5`}
                >
                  <div
                    className={`border-bottom border-color-light-gray h-40 pb-3`}
                  >
                    <div
                      className={`d-flex flex-wrap align-items-center justify-content-between`}
                    >
                      <span
                        className={`text-uppercase responsive fs-16 fw-medium text-color-secondary lh-base`}
                      >
                        filters
                      </span>
                      <Button
                        onClick={handleClearAllFilter}
                        className={`p-0 m-0 bg-transparent border-0 text-uppercase responsive fs-16 fw-medium text-color-secondary lh-base`}
                      >
                        clear all
                      </Button>
                    </div>
                  </div>
                  <div className={`pt-3 max-vh-100 overflow-auto`}>
                    {displayFilterOptions?.length > 0 ? (
                      <div>
                        {displayFilterOptions?.map((ele, index) => {
                          const id = ele._id;
                          return (
                            <FilterOptionsList {...ele} key={id || index} />
                          );
                        })}
                      </div>
                    ) : (
                      <DynamicNoData
                        icon="msoeawqm"
                        title="Oops ! No Filter Options Yet !"
                        subTitle="Check back soon for filter options!"
                      />
                    )}
                  </div>
                </div>
              </Col>
              {/* ) : null} */}
              <Col xs={12} lg={9}>
                <div className={`mt-1 mt-lg-0`}>
                  <div
                    className={`border-bottom border-color-light-gray h-40 pb-3 mt-lg-3`}
                  >
                    <div
                      className={`d-flex flex-wrap align-items-center justify-content-between`}
                    >
                      <Col
                        className={`${
                          displayFilterOptions?.length > 0
                            ? "d-block"
                            : "d-none d-lg-block"
                        }`}
                        xs={5}
                        sm={5}
                      >
                        <span
                          className={`d-none d-lg-block mb-1 text-capitalize responsive fs-16 fw-medium text-color-secondary lh-base`}
                        >
                          Product: {products?.length}
                        </span>
                        <Button
                          onClick={handleFilterOffCanvas}
                          className={`d-block d-lg-none p-0 m-0 bg-transparent border-0 d-flex align-items-center gap-1 responsive fs-16 fw-medium text-color-secondary`}
                        >
                          <i className="ri-filter-3-fill"></i>
                          <span className={`text-uppercase lh-base`}>
                            filters
                          </span>
                        </Button>
                      </Col>
                      <Col xs={2} sm={2}>
                        <div
                          className={`${
                            displayFilterOptions?.length > 0
                              ? "justify-content-center"
                              : "justify-content-start justify-content-lg-center"
                          } d-flex align-items-center  gap-2`}
                        >
                          <Button
                            onClick={() => {
                              dispatch(setClearAllFilters());
                              dispatch(
                                setProductViewType(productViewTypeEnum.GRID)
                              );
                            }}
                            className={`p-0 m-0 bg-transparent border-0`}
                          >
                            <i className="fw-medium text-color-secondary lh-base responsive fs-20 ri-layout-grid-fill"></i>
                          </Button>
                          <Button
                            onClick={() => {
                              dispatch(setClearAllFilters());
                              dispatch(
                                setProductViewType(productViewTypeEnum.LIST)
                              );
                            }}
                            className={`p-0 m-0 bg-transparent border-0`}
                          >
                            <i className="fw-medium text-color-secondary lh-base responsive fs-20 ri-list-check"></i>
                          </Button>
                        </div>
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
                  {products?.length > 0 ? (
                    <div className={`pt-2 pt-md-3`}>
                      {productViewType === productViewTypeEnum.GRID ? (
                        <ProductsGridView />
                      ) : productViewType === productViewTypeEnum.LIST ? (
                        <ProductListView />
                      ) : null}
                    </div>
                  ) : (
                    <div className={`paddingBottom mt-lg-5`}>
                      <div className={`display-message-page text-center`}>
                        <Col xs={10} sm={6} md={5} xl={4} className={`mx-auto`}>
                          <Lottie
                            className="w-100 mx-auto"
                            animationData={noRecord}
                          />
                        </Col>
                        <h3
                          className={`mt-3 mt-md-4 mb-0 responsive text-color-primary fs-3 fw-medium text-capitalize`}
                        >
                          products not found !
                        </h3>
                        <Col
                          sm={10}
                          md={8}
                          xl={6}
                          xxl={5}
                          className={`mx-auto`}
                        >
                          <p
                            className={`mt-2 mb-0 responsive text-color-secondary fs-14 fw-medium`}
                          >
                            We couldn't find any products matching the details
                            you provided. Please check the URL or explore our
                            other categories.
                          </p>
                        </Col>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            {displayFilterOptions?.length > 0 ? (
              <Offcanvas
                className={`filter-off-canvas`}
                show={show}
                onHide={handleClose}
              >
                <Button
                  className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center border ms-auto me-3 mt-3 bg-color-titan-white text-color-black"
                  color="transparent"
                  onClick={handleClose}
                >
                  <i className="ri-close-line fs-18"></i>
                </Button>
                <Offcanvas.Body className={`filters-canvas-options pb-0`}>
                  <div className={`display-filter-options`}>
                    <div
                      className={`border-bottom border-color-light-gray h-40 pb-3`}
                    >
                      <div
                        className={`d-flex flex-wrap align-items-center justify-content-between`}
                      >
                        <Button
                          onClick={handleClearAllFilter}
                          className={`p-0 m-0 bg-transparent border-0 text-uppercase responsive fs-16 fw-medium text-color-secondary lh-base`}
                        >
                          clear all
                        </Button>
                      </div>
                    </div>
                    <div className={`pt-3`}>
                      {displayFilterOptions?.map((ele, index) => {
                        const id = ele._id;
                        return <FilterOptionsList {...ele} key={id || index} />;
                      })}
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            ) : null}
          </>
        ) : (
          // <div className={`mb-3 mb-md-4 mb-lg-5`}>
          <div className={`paddingBottom mt-lg-5`}>
            <NoRecord
              title="products not found !"
              message="We couldn't find any products matching the details you provided. Please check the URL or explore our other categories."
              isBack={false}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShowProducts;
