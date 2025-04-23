import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerSlideShow = ({ data = [] }) => {
  return (
    <section className="">
      <Container>
        {data?.files?.length > 0 && (
          <div className="banner-slider">
            <Swiper
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                450: { slidesPerView: 1, spaceBetween: 20 },
                991: { slidesPerView: 1, spaceBetween: 28 },
              }}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={3}
              pagination={{ clickable: true }}
            >
              {/* Map through data and render SwiperSlide for each item */}
              {data?.files?.map((item, index) => {
                const image = item?.urls;
                // const title = item?.title;
                // const description = item?.description;
                return (
                  <SwiperSlide key={index} className="">
                    {/* Your content for each slide goes here */}
                    <div className="zoom-hover">
                      {/* <div className="max-h-420px h-1_3-1 bg-color-primary br-10 overflow-hidden"> */}
                      <div className=" object-fit-cover br-5 overflow-hidden">
                        <Link to={item.redirectUrl} target="_blank">
                          <img
                            className="aspect-2_6-1 zoom transition-transform w-100 object-fit-cover"
                            src={image}
                            alt=""
                          />
                        </Link>
                      </div>
                      {/* </div> */}
                      {/* <div>
                        <h2 className="fs-20 fs-md-5 text-color-primary my-3">
                          {title}
                        </h2>
                        <p className="fs-14 text-color-secondary truncate-line-3">
                          {description}
                        </p>
                        <Button className="primary-btn fs-14 mt-3 mt-sm-4">
                          Read More
                        </Button>
                      </div> */}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BannerSlideShow;
