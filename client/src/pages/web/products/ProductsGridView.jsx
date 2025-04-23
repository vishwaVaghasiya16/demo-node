import { Button, Col, Row } from "react-bootstrap";
import { currencyHandler } from "../../../helpers/currencyHandler";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";
import ProductGridViewLoader from "../../../components/web/loader/ProductGridViewLoader";
import { useEffect } from "react";
import { postWishlistThunk } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { postAddToCartThunk } from "../../../store/actions";
import { setCurrentPage } from "../../../store/products/slice";
import { setRecentlyProduct } from "../../../store/productDetails/slice";

const ProductsGridView = () => {
  const dispatch = useDispatch();
  const { activeIds } = useSelector((store) => store.Wishlist);
  const { products, loading, productsPaginationData, currentPage } =
    useSelector((store) => store.Products);
  const lengthArray = Array.from({ length: 11 }, (a, b) => b);
  const nav = useNavigate();

  const productDiv = document.getElementById("productMainDiv");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const { bottom } = productDiv?.getBoundingClientRect();
      const isBottom = bottom <= windowHeight && bottom > 100;
      if (isBottom && currentPage < productsPaginationData?.totalPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productDiv, currentPage, dispatch, productsPaginationData?.totalPages]);

  const handleAddWishlist = async (id) => {
    await dispatch(postWishlistThunk(id));
  };

  const handleAddToCart = async (id) => {
    await dispatch(postAddToCartThunk(id));
  };

  const handleCompareIdToWishlist = (id) => {
    if (activeIds) {
      return activeIds.includes(id) ? true : false;
    }
  };

  const handleAddRecentProductData = (ele) => {
    dispatch(setRecentlyProduct(ele));
    // const allRecentData =
    //   JSON.parse(localStorage.getItem("jewelryRecentViewProducts")) || [];
    // const isSameProduct = allRecentData?.some((item) => item?._id == ele?._id);
    // if (!isSameProduct) {
    //   if (allRecentData?.length >= 1) {
    //     localStorage.setItem(
    //       "jewelryRecentViewProducts",
    //       JSON.stringify([ele, ...allRecentData.slice(0, -1)])
    //     );
    //   } else {
    //     localStorage.setItem(
    //       "jewelryRecentViewProducts",
    //       JSON.stringify([ele, ...allRecentData])
    //     );
    //   }
    // }
  };

  return (
    <>
      <div
        id="productMainDiv"
        className={`position-relative pt-2 paddingBottom mb-lg-5 products-grid-view-page`}
      >
        <Row className={`px-1`}>
          {products?.map((ele, index) => {
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
                md={3}
                lg={4}
                xxl={3}
                className={`px-lg-0 px-2 mb-3 mb-md-4 mb-lg-0`}
              >
                <div className={`position-relative product-main-box`}>
                  <div
                    className={`${
                      loading && products?.length === 0 ? "" : "product-box"
                    } hover-opacity-1 z-1 p-0 p-lg-3 w-100 position-absolute top-0 start-0 br-10 transition-box-shadow`}
                  >
                    {loading && products?.length === 0 ? (
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
                          <div className="position-relative product-image-box bg-gradient-gray cursor-pointer br-10 overflow-hidden">
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
          {loading && products?.length > 0 && currentPage > 1
            ? lengthArray.map((_, index) => {
                return (
                  <Col
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                    lg={4}
                    xxl={3}
                    className={`px-lg-0 px-2 mb-3 mb-md-4 mb-lg-0`}
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
        </Row>
      </div>
    </>
  );
};

export default ProductsGridView;
