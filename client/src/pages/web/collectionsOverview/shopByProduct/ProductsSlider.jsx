import React from "react";
import { Autoplay, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { currency } from "../../../../helpers/enum";
import { CLIENT } from "../../../../routes/routesConstants";
import { Link } from "react-router-dom";
import { currencyHandler } from "../../../../helpers/currencyHandler";

const ProductsSlider = ({ data }) => {
  if (data && data?.length > 0) {
    return (
      <Swiper
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 15 },
          575: { slidesPerView: 3, spaceBetween: 20 },
          991: { slidesPerView: 4, spaceBetween: 10 },
          1140: { slidesPerView: 5, spaceBetween: 28 },
        }}
        // onSwiper={setFirstSwiper}
        modules={[Autoplay, Controller]}
        // controller={{ control: secondSwiper }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={3}
        pagination={{ clickable: true }}
      >
        {/* Map through data and render SwiperSlide for each item */}
        {data?.map((item, index) => {
          const slug = item?.slug;
          const image = item?.files?.length > 0 && item?.files[0]?.urls;
          const category = item?.subCategory || item?.category;
          const title = item?.title;
          const grandTotal = item?.grandTotal;
          const label = item?.label;
          return (
            <SwiperSlide key={index} className="">
              {/* Your content for each slide goes here */}
              <div className="zoom-hover responsive position-relative">
                {label && <p className="z-2 p-0 m-0 position-absolute top-0 start-0 m-3 bg-white text-color-primary fw-medium responsive fs-12 py-1 px-2 br-5 text-capitalize">
                  {label}
                </p>}
                <div className="aspect-0_9-1  br-10 overflow-hidden">
                  <Link
                    target="_blank"
                    to={`${CLIENT.PRODUCT_DETAILS}/${slug}`}
                  >
                    <img
                      className="h-100 zoom transition-transform w-100 object-fit-cover"
                      src={image}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="mt-3">
                  {category?.title && (
                    <p className="fs-12 text-color-secondary truncate-line-3 text-uppercase  mb-1">
                      {category?.title}
                    </p>
                  )}
                  <h2 className="fs-16 fw-normal fs-md-5 text-color-primary text-capitalize text-truncate">
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
      </Swiper>
    );
  }
};

export default ProductsSlider;
