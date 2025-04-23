import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const Banner = ({ data }) => {
  const bannerData = data?.files?.slice(0, 5);
  const bannerLength = bannerData?.length;
  if (bannerLength > 0) {
    return (
      <Container className="pt-3 pt-sm-4 paddingBottom">
        <div className="">
          <Row>
            <Col xs={12} sm={bannerLength < 5 ? 12 : 8} className="">
              <div
                className={`d-grid ${
                  bannerLength < 5 ? "grid-cols-3" : "grid-cols-2"
                } gap-3 gap-sm-4`}
              >
                {bannerData?.slice(0, 4)?.map((item, index) => {
                  const url = item?.urls;
                  const redirectUrl = item?.redirectUrl;
                  return (
                    <Col key={index} className="">
                      <div className="br-5 overflow-hidden zoom-hover cursor-pointer bg-color-titan-white">
                        <Link to={redirectUrl} target="_blank">
                          <img
                            src={url}
                            className="w-100 object-fit-cover aspect-1_5-1 zoom transition-transform"
                            alt=""
                          />
                        </Link>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </Col>
            {bannerLength == 5 && (
              <Col
                xs={12}
                sm={bannerLength == 5 ? 4 : 0}
                className="mt-3 mt-sm-0"
              >
                <div className="h-100 bg-color-titan-white br-5 overflow-hidden zoom-hover cursor-pointer">
                  <Link to={bannerData[4]?.redirectUrl} target="_blank">
                    <img
                      src={bannerData[4]?.urls}
                      className="w-100 long-overview-banner object-fit-cover h-100 zoom transition-transform"
                      alt=""
                    />
                  </Link>
                </div>
              </Col>
            )}
          </Row>
        </div>
        {bannerLength > 0 && (
          <div className="responsive mt-3 mt-sm-4">
            <div className="d-flex align-items-center gap-3 gap-sm-4 justify-content-center bg-color-primary py-3 px-3 br-10 flex-wrap">
              <i className="ri-home-5-line fs-24 text-white "></i>
              <p className="p-0 m-0 fs-15 text-white">
              Get ready to shine bright as a diamond!
              </p>
              <Link to={CLIENT.CART} className="white-btn fs-14 text-nowrap text-capitalize px-5 fs-12 fw-medium">
                shop now
              </Link>
            </div>
          </div>
        )}
      </Container>
    );
  }
};

export default Banner;
