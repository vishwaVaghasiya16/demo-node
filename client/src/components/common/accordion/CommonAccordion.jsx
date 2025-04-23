import PropTypes from "prop-types";
import { Accordion, Col, Row } from "react-bootstrap";

const CommonAccordion = ({ title, accordionData }) => {
  return (
    <div className={`common-accordion border-bottom paddingY`}>
      <Row className={`flex-column flex-lg-row`}>
        <Col sm={8} md={6} lg={4} className={``}>
          {/* <h3
            className={`text-capitalize pe-2 position-relative accordion-title mb-0 fs-30 text-color-primary fw-medium`}
          >
            {title}
          </h3> */}
          <h3 className={`mt-3 mt-md-0 mb-0 accordion-line position-relative`}>
            <span
              className={`position-relative z-3 pe-2 bg-white text-capitalize accordion-title mb-0 fs-30 text-color-primary fw-medium`}
            >
              {title}
            </span>
          </h3>
        </Col>
        <Col xs={12} lg={8}>
          <Accordion defaultActiveKey={0}>
            {accordionData?.map((ele, index) => {
              const headerTitle = ele.headerTitle;
              const description = ele.description;
              return (
                <Accordion.Item
                  key={index}
                  className={`rounded-0 border-bottom pb-3`}
                  eventKey={index}
                >
                  <Accordion.Header className={`px-0`}>
                    <span
                      className={`text-capitalize responsive fs-18 fw-medium lh-base text-color-primary`}
                    >
                      {headerTitle}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body
                    className={`fw-normal fs-14 lh-base text-color-secondary px-0 pb-0`}
                  >
                    {description}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </div>
  );
};

CommonAccordion.propTypes = {
  title: PropTypes.any,
  accordionData: PropTypes.any,
};

export default CommonAccordion;
