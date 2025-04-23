import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import ReactStars from "react-stars";
import Ratings from "../../../components/web/Ratings";

const CustomerReview = ({data}) => {
  if (data?.length > 0) {
    return (
      <section className="paddingBottom">
        <div className="bg-color-titan-white paddingY">
          <Container>
            <TextHoverAnimation content="Customer reviews" word="r" />
            <Swiper
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                991: { slidesPerView: 3, spaceBetween: 28 },
              }}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={3}
              pagination={{ clickable: true }}
              className=""
            >
              {/* Map through data and render SwiperSlide for each item */}
              {data?.map((item, index) => {
                const image = item?.url;
                const title = item?.title;
                const description = item?.description;
                return (
                  <SwiperSlide key={index} className="">
                    {/* Your content for each slide goes here */}
                    <div className="bg-white p-4 br-5">
                      <div className="d-flex align-items-center gap-2">
                        <div className=" ">
                          <img
                            src={item?.user?.url}
                            className="w-100 h-100 max-min-w-45 bg-dark max-min-h-45 rounded-circle"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="m-0 p-0 mb-1">
                            {item?.user?.username}
                          </h6>
                          {/* <p className="m-0 p-0">{item?.user?.username}</p> */}
                          <Ratings ratings={item?.rating} size={12} />
                        </div>
                      </div>
                      <p className="m-0 p-0 fs-14 text-color-secondary mt-3 truncate-line-2">
                        {item?.message}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Container>
        </div>
      </section>
    );
  }
};

export default CustomerReview;
