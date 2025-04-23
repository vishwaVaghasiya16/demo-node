import { Col, Container, Row } from "react-bootstrap";
import { collectionSectionStamps } from "../../../data/aboutUs";

const Collections = () => {
  return (
    <section className={`collection-section`}>
      <div className={`bg-color-collection-section paddingY`}>
        <Container>
          <Row className={`flex-column flex-lg-row align-items-center`}>
            <Col className={`order-1 order-lg-0`} md={12} lg={5} xl={4}>
              <div>
                <h2
                  className={`about-us-common-heading mb-0 fs-30 text-white fw-medium`}
                >
                  The Most Exquisite And Opulent Designer Jewelry
                </h2>
                <p
                  className={`my-2 my-md-3 my-xxl-4 fw-normal lg-base responsive fs-14 text-white opacity-50`}
                >
                  A scelerisque purus semper eget duis. Ac turpis egestas
                  maecenas pharetra convallis posuere morbi leo urna. Vel quam
                  elementum pulvinar etiam non quam. Urna id volutpat lacus
                  laoreet non curabitur gravida. Pretium viverra suspendisse
                  potenti nullam ac tortor.
                </p>

                <div className={`mt-3 mt-md-4 mt-xxl-5`}>
                  <Row>
                    {collectionSectionStamps.map((ele, index) => {
                      const image = ele.image;
                      const label = ele.label;
                      return (
                        <Col
                          key={index}
                          className={`mb-3 mb-md-0 mb-lg-4 mb-xxl-5`}
                          xs={6}
                          sm={3}
                          lg={6}
                        >
                          <div className={`collection-stamps-details`}>
                            <div className="collection-stamp mb-3">
                              <img
                                src={image}
                                alt={`collection-${index + 1}`}
                                className={`w-100 h-100 object-fit-cover`}
                              />
                            </div>
                            <h6
                              className={`mb-0 label truncate-line-2 text-white fw-normal responsive fs-14 lh-base`}
                            >
                              {label}
                            </h6>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
            <Col
              className={`collection-image-col order-0 order-lg-1`}
              md={11}
              lg={7}
              xl={8}
            >
              <div
                className={`d-flex align-items-center gap-3 gap-lg-4 paddingY`}
              >
                <div className="collection-image bg-white w-50 br-10 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6167403/pexels-photo-6167403.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="collection-1"
                    className={`h-100 w-100 object-fit-cover`}
                  />
                </div>
                <div className="collection-image bg-white w-50 br-10 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/10897815/pexels-photo-10897815.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="collection-1"
                    className={`h-100 w-100 object-fit-cover`}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Collections;
