import { Col, Container, Row } from "react-bootstrap";
import image1 from "/assets/web/home/explore-collection-image1.webp";
import image2 from "/assets/web/home/explore-collection-image2.webp";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const ExploreCollections = () => {
  const [imageRef1, isVisible1] = useInView({
    triggerOnce: true,
  });
  const [imageRef2, isVisible2] = useInView({
    triggerOnce: true,
  });

  return (
    <section
      className={`overflow-hidden explore-collection-section paddingY`}
    >
      <TextHoverAnimation content="Explore Collections" word="e" />
      <div className={`bg-color-1 position-relative z-3`}>
        <Container>
          <Row className={`align-items-center mb-4 mb-sm-0`}>
            <Col sm={5}>
              <div className="overflow-hidden">
                <img
                  src={image1}
                  alt="image-1"
                  className={`mb-3 mb-sm-0 w-auto object-fit-cover explore-collection-image d-block mx-auto ${
                    isVisible1 ? "" : "custom-animation"
                  }`}
                />
              </div>
            </Col>
            <Col sm={7}>
              <h2
                ref={imageRef1}
                className={`title fw-normal text-center text-sm-start text-color-primary`}
              >
                Perfect Match <br />
                for Every Occasion
              </h2>
              <p
                className={`text-capitalize text-center text-sm-start fw-normal fs-14 lh-base text-color-secondary  mt-2 mt-sm-3 mb-3 mb-md-4 mb-lg-5`}
              >
                Coordinate with other pieces from the collection for a classic
                look.
              </p>
              <Link className="btn text-white border-0 p-0 primary-btn fs-16 mx-auto mx-sm-0 max-w-fit">
                Discover
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`bg-color-2 position-relative z-3`}>
        <Container>
          <Row className={`align-items-center`}>
            <Col className={`order-0 order-sm-1`} sm={5}>
              <div className="overflow-hidden">
                <img
                  src={image2}
                  alt="image-2"
                  className={`mb-3 mb-sm-0 w-auto object-fit-cover explore-collection-image d-block mx-auto ${
                    isVisible2 ? "" : "custom-animation"
                  }`}
                />
              </div>
            </Col>
            <Col className={`order-1 order-sm-0 text-sm-end`} sm={7}>
              <h2
                ref={imageRef2}
                className={`title fw-normal text-center text-sm-end text-color-primary`}
              >
                Antique Diamond <br className={`d-none d-sm-block`} /> Necklaces
              </h2>
              <p
                className={`text-capitalize text-center text-sm-end fw-normal fs-14 lh-base text-color-secondary text-opacity-50 mt-2 mt-sm-3 mb-3 mb-md-4 mb-lg-5`}
              >
                beautiful colors. excellent quality.
              </p>
              <Link className="ms-sm-auto mx-auto mx-sm-0 btn text-white border-0 p-0 primary-btn fs-16 max-w-fit">
                Discover
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ExploreCollections;
