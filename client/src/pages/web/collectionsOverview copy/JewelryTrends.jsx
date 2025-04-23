import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
import CommonSliderCard from "../../../components/web/CommonSliderCard";

const JewelryTrends = () => {
  const { JewelryTrends } = useSelector((store) => store.CollectionsOverview);
  return (
    <section className={`jewelry-trends-section`}>
      <TextHoverAnimation content="Trending Jewelry" word="T" />
      <Container>
        <div>
          {/* <Swiper
            autoplay={true}
            className={`pb-5`}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              450: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {JewelryTrends?.map((ele) => {
              const img = ele?.img;
              const nameAndDate = ele?.nameAndData;
              const title = ele?.title;
              return (
                <SwiperSlide key={ele._id}>
                  <div className={`cursor-pointer`}>
                    <div
                      className={`jewelry-trends-image br-10 overflow-hidden`}
                    >
                      <img
                        src={img}
                        alt={`jewelry-trend-${ele?._id}`}
                        className={`transition w-100 h-100 object-fit-cover`}
                      />
                    </div>
                    <div className="pt-1 content ps-2">
                      <span
                        className={`fs-12 fw-normal text-black text-opacity-50`}
                      >
                        {nameAndDate}
                      </span>
                      <span
                        className={`d-block fs-16 fw-medium lh-base text-black`}
                      >
                        {title}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper> */}
          <CommonSliderCard data={JewelryTrends} />
        </div>
      </Container>
    </section>
  );
};

export default JewelryTrends;
