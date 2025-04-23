import { Button, Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useDispatch, useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect } from "react";
import { getImageBlog, getLatestBlogsThunk } from "../../../store/actions";
import { getMomentDate } from "../../../components/common/MomentFun";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const Blog = ({ data }) => {
  if (data?.length > 0) {
    return (
      <section className="paddingBottom">
        <Container>
          <div>
            <TextHoverAnimation content="From The Blogs" word="B" />
            {/* Initialize Swiper */}
            <Swiper
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },
                450: { slidesPerView: 2, spaceBetween: 20 },
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
            >
              {/* Map through data and render SwiperSlide for each item */}
              {data?.map((item, index) => {
                const image = item?.url;
                const title = item?.title;
                const created = item?.createdAt;
                return (
                  <SwiperSlide key={index} className="">
                    {/* Your content for each slide goes here */}
                    <div className="zoom-hover responsive">
                      <Link
                        to={`${CLIENT.BLOG_DETAILS}/${title}`}
                        target="_blank"
                      >
                        <div className="max-h-420px h-1_3-1 bg-color-primary br-10 overflow-hidden">
                          <img
                            className="h-100 zoom transition-transform w-100 object-fit-cover"
                            src={image}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="p-0 m-0 mt-3 mb-2 text-capitalize fs-14 text-color-secondary">
                            {getMomentDate(created, "MMMM DD, YYYY")}
                          </p>
                          <h2 className="fs-18 fs-md-5 text-color-primary  text-overflow-ellipsis text-capitalize">
                            {title}
                          </h2>
                          {/* <p className="fs-14 text-color-secondary truncate-line-3">
                        {description}
                        </p> */}
                          <Button className="primary-btn fs-14 mt-3 mt-sm-4">
                            Read More
                          </Button>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>
    );
  }
};

export default Blog;
