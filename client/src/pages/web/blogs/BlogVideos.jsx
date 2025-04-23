import { Col, Container, Row } from "react-bootstrap";
import YTVideoHandler from "../../../components/common/YTVideoHandler";
import { useDispatch, useSelector } from "react-redux";
import { getMomentDate } from "../../../components/common/MomentFun";
import { useEffect, useRef, useState } from "react";
import {
  getVideoBlog,
  imageBlogPagination,
  videoBlogPagination,
} from "../../../store/actions";

const BlogVideos = () => {
  const { videoBlog, videoBlogLoading, otherLoading, videoPagination } =
    useSelector((store) => store.Blogs);
  const [selectVideo, setSelectVideo] = useState(videoBlog && videoBlog[0]);
  const dispatch = useDispatch();
  const sideVideosRef = useRef();
  useEffect(() => {
    const container = sideVideosRef.current;
    const handleScroll = async () => {
      if (
        container.scrollTop + container.clientHeight ==
        container.scrollHeight
      ) {
        if (
          !videoBlogLoading &&
          !otherLoading &&
          videoPagination?.page < videoPagination?.totalPages
        ) {
          await dispatch(
            videoBlogPagination({
              limit: 5,
              page: videoPagination?.page + 1,
            })
          );
        }
      }
    };
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [videoPagination?.page]);

  useEffect(() => {
    dispatch(getVideoBlog({ limit: 5 }));
  }, []);

  if (videoBlog?.length > 0) {
    return (
      <section className="paddingBottom">
        <div className="py-3 py-md-5 bg-color-primary">
          <Container>
            <Row>
              <Col lg={8}>
                <div className="blog-video">
                  <YTVideoHandler
                    url={
                      selectVideo?.video || (videoBlog && videoBlog[0]?.video)
                    }
                    className="br-10"
                  />
                </div>
                <p className="d-flex align-items-center p-0 m-0 opacity-75 fs-date text-white mt-3">
                  <span className="me-2">
                    <i className="ri-calendar-2-line fs-date"></i>
                  </span>
                  {getMomentDate(selectVideo?.date, "MMMM D, YYYY")}
                </p>
                <p className="text-white mt-2 fs-20 responsive p-0 m-0">
                  {selectVideo?.title}
                </p>
              </Col>
              <Col lg={4} className="mt-3 mt-lg-4 mt-lg-0 sm-mt-0">
                <div
                  className="d-flex flex-column blog-post-height overflow-y-scroll overflow-track-none"
                  ref={sideVideosRef}
                >
                  {videoBlog?.map((item, index) => {
                    const date = item?.createdAt;
                    const title = item?.title;
                    const url = item?.video;
                    return (
                      <div
                        key={index}
                        className="scroll-snap-start responsive blog-all-videos"
                      >
                        <div className="d-flex">
                          <Col xs={4} sm={4} md={3} lg={5}>
                            <div
                              className="bg-white all-blog-post-videos br-5 overflow-hidden cursor-pointer"
                              onClick={() => setSelectVideo(item)}
                            >
                              <YTVideoHandler url={url} thumbnail />
                            </div>
                          </Col>
                          <Col xs={8} sm={8} lg={7} className="ps-3">
                            <div className="text-white">
                              <p className="d-flex align-items-center p-0 m-0 opacity-75 fs-date">
                                <span className="me-2">
                                  <i className="ri-calendar-2-line fs-date"></i>
                                </span>
                                {getMomentDate(date, "MMMM D, YYYY")}
                              </p>
                              <p className="p-0 m-0 mt-1 mt-sm-2 fs-18 truncate-line-2">
                                {title}
                              </p>
                            </div>
                          </Col>
                        </div>
                        {/* <div  className="d-flex">
                        <Col
                          xs={12}
                          className="all-blog-post-videos bg-white w-100"
                        >
                          1
                        </Col>
                        <Col xs={8}>2</Col>
                      </div> */}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
};

export default BlogVideos;
