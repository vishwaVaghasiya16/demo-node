import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { currency } from "../../helpers/enum";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../../routes/routesConstants";
import { currencyHandler } from "../../helpers/currencyHandler";

const CommonSliderCard = ({ data }) => {
  const nav = useNavigate();

  const handleNavigate = (item) => {
    nav(`${CLIENT.PRODUCT_DETAILS}/${item._id}`);
  };

  if (data) {
    return (
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="pb-4 py-lg-4 pe-0 pe-md-3 common-slider-cart"
        // className="py-3 px-lg-3"
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 15 },
          575: { slidesPerView: 3, spaceBetween: 20 },
          991: { slidesPerView: 4, spaceBetween: 10 },
          1140: { slidesPerView: 5, spaceBetween: 28 },
        }}
        slidesPerView={3}
        pagination={{ clickable: true }}
      >
        {...data?.map((item, index) => {
          const image = item?.files[0]?.urls;
          const title = item?.title;
          const category = item?.subCategory || item?.category;
          const grandTotal = item?.grandTotal;
          const slug = item?.slug;
          const label = item?.label;
          return (
            <SwiperSlide key={index} className="">
              {/* Your content for each slide goes here */}
              <div className="zoom-hover responsive position-relative">
                {label && (
                  <p className="z-2 p-0 m-0 position-absolute top-0 start-0 m-3 bg-white text-color-primary fw-medium responsive fs-12 py-1 px-2 br-5 text-capitalize">
                    {label}
                  </p>
                )}
                <div className="aspect-0_9-1 br-10 overflow-hidden">
                  <Link
                    target="_blank"
                    to={`${CLIENT.PRODUCT_DETAILS}/${slug}`}
                  >
                    <img
                      className="h-100 zoom transition-transform w-100 object-fit-cover"
                      src={image || ""}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="mt-2">
                  {category?.title && (
                    <p className="fs-12 text-color-secondary truncate-line-3 text-uppercase  mb-2">
                      {category?.title}
                    </p>
                  )}
                  <h2 className="fs-16 fw-normal fs-md-5 text-color-primary text-capitalize truncate-line-2">
                    {title}
                  </h2>
                  <h3 className="fs-18 fs-md-5 text-color-primary mt-2">
                    {currencyHandler(grandTotal)}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {/* <div className="swiper-button-prev">
                  <div className="border border-2 border-color-secondary h-35px w-35px d-flex align-items-center justify-content-center rounded-circle bg-white">
                    <i className="ri-arrow-left-line fs-5 text-color-secondary"></i>
                  </div>
                </div>
                <div className="swiper-button-next">
                  <div className="border border-2 border-color-secondary h-35px w-35px d-flex align-items-center justify-content-center rounded-circle bg-white">
                    <i className="ri-arrow-right-line fs-5 text-color-secondary"></i>
                  </div>
                </div> */}
      </Swiper>
    );
  }
};

CommonSliderCard.propTypes = {
  data: PropTypes.any,
};

export default CommonSliderCard;
