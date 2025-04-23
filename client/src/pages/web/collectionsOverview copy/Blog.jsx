import { Button, Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useDispatch, useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect } from "react";
import { getLatestBlogsThunk } from "../../../store/actions";

const Blog = () => {
  const { latestBlogs } = useSelector((store) => store?.Blogs) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!latestBlogs?.length > 0) {
      dispatch(getLatestBlogsThunk());
    }
  }, []);

  return (
    <section className="paddingY">
      <Container>
        <div>
          <TextHoverAnimation content="From The Blogs" word="B" />
          {/* Initialize Swiper */}
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
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
            {latestBlogs?.map((item, index) => {
              const image = item?.thumbnail;
              const title = item?.title;
              const description = item?.description;
              return (
                <SwiperSlide key={index} className="">
                  {/* Your content for each slide goes here */}
                  <div className="zoom-hover responsive">
                    <div className="max-h-420px h-1_3-1 bg-color-primary br-10 overflow-hidden">
                      <img
                        className="h-100 zoom transition-transform w-100 object-fit-cover"
                        src={image}
                        alt=""
                      />
                    </div>
                    <div>
                      <h2 className="fs-20 fs-md-5 text-color-primary my-3">
                        {title}
                      </h2>
                      <p className="fs-14 text-color-secondary truncate-line-3">
                        {description}
                      </p>
                      <Button className="primary-btn fs-14 mt-3 mt-sm-4">
                        Read More
                      </Button>
                    </div>
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

export default Blog;
