import { Button, Col, Container, Row } from "react-bootstrap";
import handImage from "/assets/web/hand.webp";
import collectionBanner1 from "/assets/web/home/collection-banner1.webp";
import collectionBanner2 from "/assets/web/home/collection-banner2.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const Collections = ({ data }) => {
  const files = data?.files;
  const firstRowData = files?.slice(1, 3);
  const otherData = files?.slice(3, data?.files?.length);

  if (files?.length > 0) {
    return (
      <section className={`home-collection paddingBottom`} id="collections">
        <Container className="overflow-hidden ">
          <div className="fs-200 text-center responsive position-relative text-color-primary fade-up-big">
            <p className="position-absolute ff-sorts top-50 start-50 translate-middle">
              Collections
            </p>
            <img
              data-aos="fade-up"
              src={handImage}
              // alt="handImage"
              className="hand-img"
            />
          </div>
          <div>
            <Row className="align-items-end justify-content-end">
              <Col xs={6} className="mb-20">
                <>
                  <div className="position-relative bg-color-titan-white br-10 overflow-hidden zoom-hover cursor-pointer">
                    <Link
                      to={`${CLIENT.CATEGORY}/${files[0]?.category?.slug}`}
                      target="_blank"
                    >
                      <img
                        className="w-100 zoom transition-transform  object-fit-cover aspect-1_4-1"
                        src={files[0]?.urls}
                        alt=""
                      />
                    <button className="responsive-2 px-2 py-1 py-sm-1 position-absolute bottom-0 start-0 end-0 m-2 m-sm-3 white-btn fs-18 text-capitalize fw-medium">
                      {files[0]?.category?.title}
                    </button>
                    </Link>
                  </div>
                </>
              </Col>
              {firstRowData?.map((item, index) => {
                const redirectUrl = item?.redirectUrl;
                return (
                  <Col xs={6} md={3} key={index} className="mb-20">
                    <div>
                      <div className="position-relative bg-color-titan-white br-10 overflow-hidden cursor-pointer zoom-hover">
                        <Link to={redirectUrl} target="_blank">
                          <img
                            src={item?.urls}
                            className="w-100 object-fit-cover aspect-1-1_1 zoom transition-transform"
                            alt=""
                          />
                        </Link>
                        {item?.category && (
                          <button className="responsive-2 px-2 py-1 py-sm-1 position-absolute bottom-0 start-0 end-0 m-2 m-sm-3 white-btn fs-18 text-capitalize fw-medium">
                            {item?.category?.title}
                          </button>
                        )}
                      </div>
                    </div>
                  </Col>
                );
              })}
              {otherData?.map((item, index) => {
                const redirectUrl = item?.redirectUrl;
                return (
                  <Col xs={6} md={3} key={index} className="mb-20">
                    <div>
                      <div className="position-relative bg-color-titan-white br-10 overflow-hidden zoom-hover cursor-pointer">
                        <Link to={redirectUrl} target="_blank">
                          <img
                            src={item?.urls}
                            className="w-100 object-fit-cover aspect-1-1_1 zoom transition-transform"
                            alt=""
                          />
                        </Link>
                        <button className="responsive-2 px-2 py-1 py-sm-1 position-absolute bottom-0 start-0 end-0 m-2 m-sm-3 white-btn fs-18 text-capitalize fw-medium">
                          {/* {collectionData?.data[0]?.category?.title} */}
                          {item?.category?.title}
                        </button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    );
  }
};

export default Collections;
