import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllBlogs, getImageBlog } from "../../../store/actions";
import { getMomentDate } from "../../../components/common/MomentFun";
import { useNavigate } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";

const LatestBlogs = () => {
  const { imageBlog: data } = useSelector((store) => store.Blogs);
  const latestBlogs = Array.isArray(data) ? data.slice(0, 3) : [];
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (!data?.length > 0) {
      dispatch(getImageBlog());
    }
  }, []);

  return (
    <section className="paddingY">
      <div className="bg-color-titan-white paddingY mainLatestBlogSlider">
        <Container className="">
          {latestBlogs?.length > 0 ? (
            <div className="position-relative">
              <Swiper
                className="swiper-pagination-static"
                slidesPerView={3}
                modules={[Autoplay, Navigation]}
                navigation={{
                  // Configure Swiper to use navigation
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
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
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 1,
                    // spaceBetween: 15,
                    spaceBetween: 16,
                  },
                }}
              >
                {latestBlogs?.map((item, index) => {
                  const id = item?._id;
                  const thumbnail = item?.url;
                  const date = item?.createdAt;
                  const comments = item?.commentCount;
                  const title = item?.title;
                  const description = item?.description;
                  return (
                    <SwiperSlide key={index} className="responsive">
                      <div className="d-md-grid grid-cols-2 gap-3 gap-md-4 gap-lg-5 align-items-center col-12 col-sm-8 col-md-12 mx-auto">
                        <div
                          className="cursor-pointer"
                          onClick={() => nav(`${CLIENT.BLOG_DETAILS}/${title}`)}
                        >
                          <img
                            src={thumbnail}
                            alt=""
                            className="bg-color-primary aspect-1-0_8 w-100 br-10 overflow-hidden object-fit-cover"
                          />
                        </div>
                        <div className="mt-3 mt-md-0">
                          <div>
                            <div className="d-flex align-items-center gap-3">
                              <p className="d-flex align-items-center text-color-secondary p-0 m-0 fs-14">
                                <i className="ri-calendar-2-line fs-24 me-2"></i>
                                {getMomentDate(date, "MMMM DD, YYYY")}
                              </p>
                              {/* <p className="d-flex align-items-center text-color-secondary p-0 m-0 fs-14">
                                <i className="ri-message-2-line fs-24 me-2"></i>
                                {comments} COMMENTS
                              </p> */}
                            </div>
                            <h2 className="text-color-primary line-height-1_5 fs-28 m-0">
                              {title}
                            </h2>
                            <p className="text-color-secondary fs-14 mt-2 mt-md-3 mb-3 mb-md-4">
                              {description}
                            </p>
                            <Button
                              onClick={() =>
                                nav(`${CLIENT.BLOG_DETAILS}/${title}`)
                              }
                              className="primary-btn fs-14"
                            >
                              Read More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Button className="swiper-button-prev d-flex align-items-center justify-content-center bg-transparent rounded-circle w-40 h-40 border-color-secondary border-2">
                <i className="ri-arrow-left-line text-color-secondary fs-20"></i>
              </Button>
              <Button className="swiper-button-next d-flex align-items-center justify-content-center bg-transparent rounded-circle w-40 h-40 border-color-secondary border-2">
                <i className="ri-arrow-right-line text-color-secondary fs-20"></i>
              </Button>
            </div>
          ) : (
            <DynamicNoData
              icon="ghhwiltn"
              title="Oops ! No Blogs Yet !"
              subTitle="Check Back Soon For Read Stunning Blogs!"
            />
          )}
        </Container>
      </div>
    </section>
  );
};

export default LatestBlogs;
