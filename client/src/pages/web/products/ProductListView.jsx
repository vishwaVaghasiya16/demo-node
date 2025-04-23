import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CLIENT } from "../../../routes/routesConstants";
import { currencyHandler } from "../../../helpers/currencyHandler";
import { Button, Col, Row } from "react-bootstrap";
import ProductListViewLoader from "../../../components/web/loader/ProductListViewLoader";
import { useDispatch, useSelector } from "react-redux";
import { postAddToCartThunk, postWishlistThunk } from "../../../store/actions";
import { useEffect } from "react";
import { setCurrentPage } from "../../../store/products/slice";
import { setRecentlyProduct } from "../../../store/productDetails/slice";

const ProductListView = () => {
  const { activeIds } = useSelector((store) => store.Wishlist);
  const dispatch = useDispatch();
  const { products, loading, productsPaginationData, currentPage } =
    useSelector((store) => store.Products);

  const lengthArray = Array.from({ length: 11 }, (a, b) => b);
  const productDiv = document.getElementById("productMainDiv");

  const handleAddWishlist = async (id) => {
    await dispatch(postWishlistThunk(id));
  };
  const handleCompareIdToWishlist = (id) => {
    return activeIds?.includes(id) ? true : false;
  };
  const handleAddToCart = async (id) => {
    await dispatch(postAddToCartThunk(id));
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const { bottom } = productDiv.getBoundingClientRect();
      const isBottom = bottom <= windowHeight - 80 && bottom > 100;
      if (isBottom && currentPage < productsPaginationData?.totalPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productDiv, currentPage, dispatch, productsPaginationData?.totalPages]);

  const handleAddRecentProductData = (ele) => {
    dispatch(setRecentlyProduct(ele));
  };

  return (
    <div id="productMainDiv" className={`pt-2 pb-md-5 product-list-view-page`}>
      {products?.map((ele, index) => {
        const id = ele?._id;
        const slug = ele?.slug;
        const name = ele?.name;
        const type = ele?.productType;
        const description = ele?.description;
        const total = Math.floor(ele?.grandTotal);
        const category = ele?.subCategory || ele?.category;
        const label = ele?.label || "";
        const totalCost = ele?.totalCost;
        return (
          <div key={id || index} className={`mb-3 mb-lg-4`}>
            {products?.length === 0 ? (
              <ProductListViewLoader />
            ) : (
              <Row className={`px-1`}>
                <Col
                  xs={5}
                  sm={5}
                  md={4}
                  xxl={3}
                  className={`custom-width px-2 px-md-3`}
                >
                  <div>
                    <div
                      className="position-relative product-image-box bg-gradient-gray cursor-pointer br-10 overflow-hidden"
                      // onClick={() => handleNavigate(item)}
                    >
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
                        <Swiper
                          // navigation={{
                          //   prevEl: ".swiper-button-prev",
                          //   nextEl: ".swiper-button-next",
                          // }}
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
                              <SwiperSlide className={`common-border br-10`} key={index}>
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
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col xs={7} sm={7} md={8} xxl={9} className={`custom-width`}>
                  <div className="mt-2">
                    {/* <span className="d-block p-0 m-0 fs-12 text-color-primary opacity-50 mt-2 mb-1 text-uppercase">
                      {type}
                    </span> */}
                    <p className="fs-12 text-color-secondary truncate-line-3 text-uppercase  m-0 mt-2">
                      {category?.title}
                    </p>
                    <span className="d-block mt-1 p-0 m-0 text-color-primary fw-medium fs-15 text-overflow-ellipsis text-capitalize">
                      {name}
                    </span>
                    <div className="p-0 m-0 line-height-2 fw-bold fs-16 text-color-primary">
                      {currencyHandler(total)}
                      {totalCost > total && (
                        <span className="fw-medium text-color-secondary fs-14 ms-1">
                          {" "}
                          <s>{currencyHandler(totalCost)}</s>{" "}
                        </span>
                      )}
                    </div>
                    <div className={`d-block d-sm-block`}>
                      <p
                        className={`truncate-line-3 mt-md-2 mb-0 fs-16 fw-normal lh-base text-color-secondary`}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="d-block p-0 m-0 border-0 text-white primary-btn primary-btn fs-14 mt-2 mt-md-4"
                    onClick={() => handleAddToCart(id)}
                  >
                    Add To Cart
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        );
      })}

      {loading && products?.length > 0 && currentPage > 1
        ? lengthArray.map((_, index) => {
            return (
              <div key={index} className={`mb-3 mb-lg-4`}>
                <ProductListViewLoader />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ProductListView;
