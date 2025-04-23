import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Gifting = () => {
  const { gifting } = useSelector((store) => store.CollectionsOverview);
  return (
    <section className="paddingBottom gifting-section">
      <Container>
        <TextHoverAnimation content="Jewellery Gifting Made Easy" word="G" />
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className=""
          // className="py-3 px-lg-3"
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            // 768: {
            //   slidesPerView: 3,
            //   spaceBetween: 0,
            // },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          slidesPerView={3}
        >
          {gifting?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="mb-0">
                <div className="bg-color-primary br-10 position-relative overflow-hidden zoom-hover">
                  <div className="gifting-box">
                    <img
                      className="h-100 w-100 object-fit-cover zoom transition-transform"
                      src={item?.img}
                      alt=""
                    />
                  </div>
                  <button className="responsive px-2 py-1 py-sm-1 position-absolute bottom-0 start-0 end-0 m-3 white-btn fs-20 text-capitalize fw-medium">
                    {item?.for}
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
};

export default Gifting;
