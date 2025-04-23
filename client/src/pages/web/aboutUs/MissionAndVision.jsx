import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const MissionAndVision = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(CLIENT.ACCOUNT_DETAILS.CONTACT_US);
  };

  return (
    <section className={`mission-vision-section paddingY`}>
      <Container>
        <Row className={`flex-row flex-lg-row align-items-center`}>
          <Col
            className={`order-1 order-lg-0 mt-md-3 mt-lg-0 mb-3 mb-sm-0`}
            xs={12}
            sm={6}
            lg={4}
          >
            <div className={`text-center`}>
              <h2
                className={`about-us-common-heading mb-0 fs-30 text-color-primary fw-medium`}
              >
                Our Mission
              </h2>
              <p
                className={`truncate-line-5 my-2 my-md-3 my-xxl-4 fw-normal lg-base responsive fs-14 text-color-secondary`}
              >
                Our mission is to empower our customers to celebrate life&apos;s
                precious moments with elegance and class. We aim to elevate the
                jewellery shopping experience through customized customer
                support and comprehensive product education. Every customer can
                feel confident and informed when choosing jewellery with our
                platform.
              </p>
              <Button
                onClick={handleNavigate}
                className="mx-auto primary-btn fs-14"
              >
                Contact Us
              </Button>
            </div>
          </Col>
          <Col
            className={`order-0 order-lg-1 mx-auto mb-3 mb-md-4 mb-lg-0`}
            xs={12}
            sm={8}
            lg={4}
          >
            <div className={`image br-10 overflow-hidden`}>
              <img
                src="https://images.pexels.com/photos/1454186/pexels-photo-1454186.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="mission-vision-image"
                className={`w-100 h-100 object-fit-cover`}
              />
            </div>
          </Col>
          <Col className={`order-2 mt-md-3 mt-lg-0`} xs={12} sm={6} lg={4}>
            <div className={`text-center`}>
              <h2
                className={`about-us-common-heading mb-0 fs-30 text-color-primary fw-medium`}
              >
                Our Vision
              </h2>
              <p
                className={`truncate-line-5 my-2 my-md-3 my-xxl-4 fw-normal lg-base responsive fs-14 text-color-secondary`}
              >
                Our vision is to bring fine jewellery within reach of all,
                elevating it to represent self-expression and joy. Our constant
                commitment lies in driving innovation, refining our
                craftsmanship, and wholeheartedly adopting sustainable
                practices. Our ultimate aspiration is to secure the top position
                as the preferred destination for individuals searching for
                affordable, exquisite jewellery that represents their unique
                personalities.
              </p>
              <Button
                onClick={handleNavigate}
                className="mx-auto primary-btn fs-14"
              >
                Contact Us
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MissionAndVision;
