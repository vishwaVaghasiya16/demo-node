import { Container } from "react-bootstrap";
import { companiesLogo } from "../../../data/aboutUs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Company = () => {
  return (
    <section className={`company-section border bg-color-titan-white paddingY`}>
      <Container>
        <div>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              400: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              576: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              1000: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
            }}
          >
            {companiesLogo?.map((ele, index) => {
              const img = ele;
              return (
                <SwiperSlide key={ele._id || index}>
                  <div className="company-logo mx-auto">
                    <img
                      src={img}
                      alt={`logo-${index + 1}`}
                      className={`w-100 h-100 object-fit-contain`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Company;
