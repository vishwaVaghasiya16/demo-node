import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { currencyHandler } from "../../../helpers/currencyHandler";
import MultiSelectInput from "./MultiSelectInput";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import VideoCallModel from "./VideoCallModel";
import { useEffect, useState } from "react";
import Ratings from "../../../components/web/Ratings";
import ShareModel from "./ShareModel";
import {
  getVariantDetailsThunk,
  postWishlistThunk,
  postAddToCartThunk,
} from "../../../store/actions";
import { useLocation, useParams } from "react-router-dom";
import { setEmptyArray } from "../../../store/productDetails/slice";
import { getCouponThunk } from "../../../store/actions";
import { lastIndexOf } from "lodash";

const MainProductDetails = () => {
  const { productDetails, reviewPaginationData } = useSelector(
    (store) => store.ProductDetails
  );
  const { data: couponData } = useSelector((store) => store.Coupon);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const images = productDetails?.files;
  const id = productDetails?.product
    ? productDetails?.product?._id
    : productDetails?._id;
  const productId = productDetails?._id;
  const grandTotal = productDetails?.grandTotal;
  const discountType = productDetails?.discountType;
  const discountValue = productDetails?.discountValue;
  // const discount = productDetails?.discount;
  const title = productDetails?.title || "";
  const ratings = 5;
  const ratingCount = reviewPaginationData.totalItems || 0;
  const totalCost = productDetails?.totalCost;
  const description =
    productDetails?.shortDescription || productDetails?.description || "";
  const hasVariant =
    productDetails?.hasVariant || productDetails?.product?.hasVariant;
  const savedAmount = productDetails?.savedAmount || 0;
  const [showVideoCallModel, setShowVideoCallModel] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const [isStickyCart, setIsStickyCart] = useState(true);

  const { activeIds } = useSelector((store) => store.Wishlist);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const variantValue = searchParams.get("variant");

  // useEffect(() => {
  //   if (variantValue) {
  //     dispatch(getVariantDetailsThunk({ id: variantValue }));
  //   }
  // }, [dispatch, variantValue]);

  // const calculateTotalDiscount = (baseValue, discounts) => {
  //   let totalDiscount = 0;
  //   discounts?.forEach((discount) => {
  //     const { discountType, discountValue } = discount;
  //     if (discountType == "percentage") {
  //       const percentageDiscount = baseValue * (discountValue / 100);
  //       totalDiscount += percentageDiscount;
  //     } else {
  //       totalDiscount += discountValue;
  //     }
  //   });
  //   return totalDiscount + baseValue;
  // };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setEmptyArray());
      await dispatch(getCouponThunk());
    };
    fetchData();
  }, [dispatch, slug]);

  const handleAddWishlist = async () => {
    await dispatch(postWishlistThunk(productId));
  };

  const handleCompareIdToWishlist = () => {
    if (activeIds) {
      return activeIds.includes(productId) ? true : false;
    }
  };

  const handleAddToCart = async () => {
    await dispatch(postAddToCartThunk(productId));
  };

  useEffect(() => {
    const mainProductDetailsHeight =
      document.getElementById("mainProductDetails")?.clientHeight;
    const stickyCart = document.getElementById("sticky-cart");
    const handleScroll = () => {
      let prevScrollPos = window.pageYOffset;
      if (prevScrollPos > mainProductDetailsHeight) {
        stickyCart.classList.remove(
          "invisible",
          "opacity-0",
          "transition-opacity"
        );
        stickyCart.classList.add(
          "visible",
          "opacity-100",
          "transition-opacity"
        );
      } else {
        stickyCart.classList.add(
          "invisible",
          "opacity-0",
          "transition-opacity"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="paddingTop" id="mainProductDetails">
      <Container>
        <div className="d-flex gap-3 gap-lg-0 flex-column flex-lg-row position-relative">
          {/* ==========================
                    left img column
            ==============================*/}

          <Col xs={12} lg={6}>
            <div className="grid-cols-2 gap-4 d-none d-lg-grid">
              {images?.length > 0
                ? images?.map((item, index) => {
                    const extension = item?.urls.match(
                      /\.([0-9a-z]+)(?:[\?#]|$)/i
                    );
                    return (
                      <div key={index}>
                        <div className="image common-border bg-color-titan-white w-100 aspect-1-1_1 br-10 overflow-hidden">
                          {extension[0] == ".mp4" ? (
                            // <video
                            //   // rel="preload"
                            //   autoPlay
                            //   muted
                            //   loop
                            //   src={item?.urls || ""}
                            //   className="w-100 h-100 object-fit-cover"
                            //   alt=""
                            // />
                            <video
                              playsInline
                              autoPlay
                              loop
                              muted
                              preload="metadata"
                              className="w-100 h-100 object-fit-cover"
                            >
                              <source
                                src={item?.urls}
                                type="video/mp4"
                              ></source>
                              {/* <source src={item?.urls} type="video/mp4" /> */}
                            </video>
                          ) : (
                            <img
                              rel="preload"
                              src={item?.urls || ""}
                              className="w-100 h-100 object-fit-cover"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                : [1, 1, 1, 1].map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-color-titan-white w-100 aspect-1-1_1 br-10"
                      ></div>
                    );
                  })}
            </div>
            <Swiper
              className="d-block d-lg-none swiper-pagination-static"
              slidesPerView={3}
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              // className="py-3 px-lg-3"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                400: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  // spaceBetween: 15,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              pagination={{ clickable: true }}
            >
              {images?.length > 0
                ? images?.map((item, index) => {
                    const extension = item?.urls.match(
                      /\.([0-9a-z]+)(?:[\?#]|$)/i
                    );
                    return (
                      <SwiperSlide
                        key={index}
                        className="client-product-details-image"
                      >
                        <div key={index}>
                          <div className="image common-border bg-color-titan-white w-100 aspect-1-1_1 br-10 overflow-hidden">
                            {extension[0] == ".mp4" ? (
                              // <video
                              //   // rel="preload"
                              //   autoPlay
                              //   muted
                              //   loop
                              //   src={item?.urls || ""}
                              //   className="w-100 h-100 object-fit-cover"
                              //   alt=""
                              // />
                              <video
                                playsInline
                                autoPlay
                                loop
                                muted
                                preload="metadata"
                                className="w-100 h-100 object-fit-cover"
                              >
                                <source
                                  src={item?.urls}
                                  type="video/mp4"
                                ></source>
                                {/* <source src={item?.urls} type="video/mp4" /> */}
                              </video>
                            ) : (
                              <img
                                rel="preload"
                                src={item?.urls || ""}
                                className="w-100 h-100 object-fit-cover"
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                : [1, 1, 1, 1].map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="client-product-details-image"
                    >
                      <div key={index}>
                        <div className="image common-border bg-color-titan-white w-100 aspect-1-1_1 br-10 overflow-hidden"></div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </Col>

          {/* ==========================
                    right details column
            ==============================*/}

          <Col
            xs={12}
            lg={6}
            className="ps-lg-5 position-sticky h-100 top-50px"
          >
            <div className="responsive">
              <h2 className="text-color-primary m-0 fs-28 mb-md-1 text-capitalize">
                {title}
              </h2>
              <div className="d-flex gap-1 py-2">
                <Ratings ratings={ratings} />
                <p className="m-0 text-color-secondary fs-14">
                  ({ratingCount})
                </p>
              </div>
              <p className="fs-14 text-color-secondary m-0 truncate-line-5">
                {description}
              </p>
              <Row className="my-3 my-md-4 flex-column flex-md-row">
                <Col>
                  <h3 className="text-color-primary fs-20 mb-0 mb-md-2">
                    {currencyHandler(grandTotal)}
                    {totalCost > grandTotal && (
                      <s className="text-color-secondary fs-14 ms-2 fw-normal">
                        {currencyHandler(totalCost)}
                      </s>
                    )}
                  </h3>
                  <div className="d-flex gap-2 mt-3 mt-md-4">
                    <i
                      className={`${
                        handleCompareIdToWishlist(id)
                          ? "ri-heart-3-fill"
                          : "ri-heart-3-line"
                      }  text-color-primary bg-color-titan-white h-45 w-45 br-5 border border-color-light-gray fs-24 d-flex align-items-center justify-content-center cursor-pointer`}
                      onClick={handleAddWishlist}
                    ></i>
                    {/* <i className="ri-stack-line text-color-primary bg-color-titan-white h-45 w-45 br-5 border border-color-light-gray fs-24 d-flex align-items-center justify-content-center"></i> */}
                    <i
                      className="ri-share-line text-color-primary bg-color-titan-white h-45 w-45 br-5 border border-color-light-gray fs-24 d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() => setShowShareModel(true)}
                    ></i>
                  </div>
                  <ShareModel
                    show={showShareModel}
                    onHide={() => setShowShareModel(false)}
                  />
                  {hasVariant && (
                    <div className="mt-3 mt-md-4">
                      <MultiSelectInput
                        price={grandTotal}
                        // discountedPrice={calculateTotalDiscount(
                        //   grandTotal,
                        //   discount
                        // )}
                        slug={slug}
                        id={id}
                      />

                      {/* <div className="mt-3 mt-md-4">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label className="text-color-primary fs-14">
                            Update Location
                          </Form.Label>
                          <div className="w-100 d-flex border br-5 p-2 border-color-light-gray bg-color-titan-white">
                            <Form.Control
                              readOnly
                              type="email"
                              placeholder="PINCODE"
                              className="focus-border-none fs-14 p-0 border-none text-color-secondary placeholder-secondary bg-transparent"
                            />
                            <i className="ri-map-pin-line ms-2"></i>
                          </div>
                        </Form.Group>
                      </div> */}
                    </div>
                  )}
                </Col>

                {/* ==========================
                    video call design
                ==============================*/}

                <Col>
                  <div
                    className="bg-color-titan-white border border-color-light-gray
                  br-5 border border-color-light-gray p-4 mt-3 mt-md-0"
                  >
                    <div className="bg-color-dusty-red  p-2 h-45 w-45 rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ri-vidicon-fill text-white rounded-circle fs-20"></i>
                    </div>
                    <h6 className="my-2 text-color-primary">
                      Free video call now!
                    </h6>
                    <p className="fs-14 text-color-secondary truncate-line-2">
                      Get on a live video call with our design consultants.
                      Schedule a Video Call
                    </p>
                    <Button
                      className="primary-btn w-100 fs-14 mt-4"
                      onClick={() => setShowVideoCallModel(true)}
                    >
                      Video Call Now
                    </Button>
                    <VideoCallModel
                      show={showVideoCallModel}
                      onHide={() => setShowVideoCallModel(false)}
                    />
                  </div>
                </Col>
              </Row>

              {/* ==========================
                        available offer
                ==============================*/}

              <div>
                {/* <p className="fw-medium text-color-primary mb-2">
                  Offer Expires in 6h : 11m : 24 s
                </p> */}
                <Button
                  className="primary-btn w-100 fs-14"
                  onClick={() => handleAddToCart(id)}
                >
                  Add To Cart
                </Button>
              </div>

              {couponData?.length > 0 && (
                <div className="mt-3 mt-md-4 text-color-primary fs-14 fw-medium">
                  <p className="mb-2">Available Offers</p>

                  <Swiper
                    slidesPerView={3}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    // className="py-3 px-lg-3"
                    breakpoints={{
                      0: {
                        slidesPerView: 1.5,
                        spaceBetween: 16,
                      },
                      500: {
                        slidesPerView: 2.5,
                        spaceBetween: 16,
                      },
                      768: {
                        slidesPerView: 2.5,
                        // spaceBetween: 15,
                        spaceBetween: 16,
                      },
                      1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 16,
                      },
                    }}
                    pagination={{ clickable: true }}
                  >
                    {couponData?.map((item, index) => {
                      const code = item?.code;
                      const description = item?.description;
                      return (
                        <SwiperSlide key={index}>
                          <div className="bg-color-titan-white br-5 border-start border-4 border-color-primary px-4 py-3 cursor-pointer">
                            <div className="d-flex  align-items-center  justify-content-between mb-3">
                              <p className="m-0 fs-14 fw-medium  text-color-primary text-overflow-ellipsis">
                                {code}
                              </p>
                              <i className="ri-scissors-line"></i>
                            </div>
                            <p className="fs-14 text-color-secondary m-0 truncate-line-1">
                              {description}
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </div>
          </Col>
          {isStickyCart && (
            <div
              id="sticky-cart"
              className="z-4 w-100 position-fixed start-0 px-3 px-sm-5 invisible opacity-0 transition-opacity"
            >
              <div className="bg-white p-2 border br-5 flex-column flex-wrap flex-sm-row d-flex align-items-sm-center justify-content-between gap-2 position-relative">
                <Col className="d-flex align-items-center gap-3">
                  <div>
                    <img
                      src={images[0]?.urls}
                      className="order-img br-5"
                      alt=""
                    />
                  </div>
                  <Col xs={6} sm={7} className="">
                    <h5 className="p-0 m-0 mb-1 fs-14 text-color-primary text-capitalize truncate-line-1">
                      {title}
                    </h5>
                    <p className="p-0 m-0 fs-14 fw-medium text-color-primary">
                      {currencyHandler(grandTotal)}
                    </p>
                  </Col>
                </Col>
                <i
                  className="ri-close-circle-line text-color-primary position-absolute top-0 end-0 me-3 mt-2 fs-20 cursor-pointer"
                  onClick={() => setIsStickyCart(false)}
                ></i>
                <Button
                  className="primary-btn fs-14 me-5 sm-w-100"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default MainProductDetails;
