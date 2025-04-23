import {
  Accordion,
  Card,
  Col,
  Container,
  Form,
  Row,
  useAccordionButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { footerData } from "../../../data/footer";
import PropTypes from "prop-types";
import { useState } from "react";
import Img1 from "/assets/web/home/medal-star.png";
import Img2 from "/assets/web/home/empty-wallet-change.png";
import Img3 from "/assets/web/home/group.png";
import Img4 from "/assets/web/home/money-change.png";
import { socialMediaData } from "../../../data/common";
import paymentMathods from "/assets/web/paymentMathods.webp";
import { iconsEnum } from "../../../helpers/enum";
import { CLIENT } from "../../../routes/routesConstants";

const Footer = () => {
  const [activeAccordion, setActiveAccordion] = useState("");
  const CustomAccordionButton = ({ children, eventKey }) => {
    const handleClick = useAccordionButton(eventKey, () =>
      setActiveAccordion(activeAccordion === eventKey ? null : eventKey)
    );

    return (
      <div
        className="d-flex justify-content-between align-items-center w-100 footer-accordion-button px-3 py-2"
        onClick={handleClick}
      >
        <h6 className="border-0 bg-transparent m-0 p-0" type="button">
          {children}
        </h6>
        {activeAccordion === eventKey ? (
          <i className="ri-arrow-down-s-line"></i>
        ) : (
          <i className="ri-arrow-right-s-line"></i>
        )}
      </div>
    );
  };

  CustomAccordionButton.propTypes = {
    children: PropTypes.node,
    eventKey: PropTypes.string,
  };

  return (
    <footer>
      <div>
        {/* ===================================== 
                customer services boxes
      ===================================== */}
        <Container>
          <Row className=" bg-white px-1 footer-customer-assurance pb-md-5 mb-lg-3">
            <Col xs={6} md={3} className="mb-3 mb-md-0 px-xs-8 px-lg-auto">
              <div className="bg-color-titan-white border-0 border-color-purple-blue text-center py-3 py-sm-4 br-10 translate-shadow-hover transition-transform">
                <div className="bg-white max-w-fit mx-auto p-3 p-sm-4 rounded-circle  d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    src={Img1}
                    className=" h-60px w-60px"
                    alt="img1"
                  />
                </div>
                <p className="p-0 m-0 mt-2 mt-lg-3 fw-medium responsive fs-18">
                  100% Certified
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3 mb-md-0 px-xs-8 px-lg-auto">
              <div className="bg-color-titan-white border-0 border-color-purple-blue text-center py-3 py-sm-4 br-10 translate-shadow-hover transition-transform">
                <div className="bg-white max-w-fit mx-auto p-3 p-sm-4 rounded-circle  d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    src={Img2}
                    className=" h-60px w-60px"
                    alt="img1"
                  />
                </div>
                <p className="p-0 m-0 mt-2 mt-lg-3 fw-medium responsive fs-18 text-color-primary">
                  7 Days Money Back
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3 mb-md-0 px-xs-8 px-lg-auto">
              <div className="bg-color-titan-white border-0 border-color-purple-blue text-center py-3 py-sm-4 br-10 translate-shadow-hover transition-transform">
                <div className="bg-white max-w-fit mx-auto p-3 p-sm-4 rounded-circle  d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    src={Img3}
                    className=" h-60px w-60px"
                    alt="img1"
                  />
                </div>
                <p className="p-0 m-0 mt-2 mt-lg-3 fw-medium responsive fs-18 text-color-primary">
                  7 Days Replacement
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3 mb-md-0 px-xs-8 px-lg-auto">
              <div className="bg-color-titan-white border-0 border-color-purple-blue text-center py-3 py-sm-4 br-10 translate-shadow-hover transition-transform">
                <div className="bg-white max-w-fit mx-auto p-3 p-sm-4 rounded-circle  d-flex justify-content-center align-items-center responsive">
                  <img
                    loading="lazy"
                    src={Img4}
                    className=" h-60px w-60px"
                    alt="img1"
                  />
                </div>
                <p className="p-0 m-0 mt-2 mt-lg-3 fw-medium responsive fs-18 text-color-primary">
                  Lifetime Exchange
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="bg-color-primary ">
          <Container>
            <div className={` mx-auto py-0 py-md-4 py-lg-5 mb-0 mb-sm-4`}>
              <div className="d-flex justify-content-xl-between flex-wrap ">
                {/* ======================================================= 
                      full list footer data in above mobile screen
                ======================================================= */}

                {footerData().map((ele, index) => {
                  const title = ele.title;
                  const routes = ele.routes;
                  return (
                    <div
                      key={index}
                      className=" mt-md-4 col-12 col-sm-6  col-md-3  col-xl-auto d-none d-sm-block"
                    >
                      <h2
                        className={`fw-normal fs-5 lh-base text-capitalize text-white mt-3 mt-md-0`}
                      >
                        {title}
                      </h2>
                      <ul className={`m-0 p-0`}>
                        {routes.slice(0, 6).map((ele, index) => {
                          const path = ele.path;
                          const name = ele.title;
                          const slug = ele?.slug;
                          return (
                            <li key={index} className={`line-height-2_4`}>
                              <Link
                                to={
                                  slug
                                    ? `${CLIENT.CATEGORY}/${slug}`
                                    : path || ""
                                }
                                className={`btn p-0 border-0 fw-light fs-16 lh-base text-capitalize text-black opacity-65 text-start text-white hover-opacity-1 transition-opacity`}
                              >
                                {name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}

                {/* ======================================================= 
                        accordion footer data in mobile screen
                ======================================================= */}

                <Accordion
                  defaultActiveKey={activeAccordion}
                  className="col-12 d-block d-sm-none mt-3"
                >
                  {footerData().map((ele, index) => {
                    const title = ele.title;
                    const routes = ele.routes;
                    return (
                      <Card
                        key={index}
                        className="mb-1 border-0 bg-purple-blue text-white"
                      >
                        <CustomAccordionButton eventKey={"" + index}>
                          <Card.Header className="p-0 bg-transparent border-0 fw-normal">
                            {title}
                          </Card.Header>
                        </CustomAccordionButton>
                        <Accordion.Collapse eventKey={"" + index}>
                          <Card.Body className="pt-0">
                            <ul className={`m-0 p-0 `}>
                              {routes.slice(0, 6).map((ele, index) => {
                                const path = ele.path;
                                const name = ele.title;
                                const slug = ele?.slug;
                                return (
                                  <li
                                    key={index}
                                    className={`lh-base text-white`}
                                  >
                                    <Link
                                      to={
                                        slug
                                          ? `${CLIENT.CATEGORY}/${slug}`
                                          : path || ""
                                      }
                                      className={`btn p-0 border-0 fw-normal fs-14 lh-lg text-capitalize text-black opacity-65 text-start text-white hover-opacity-1 transition-opacity `}
                                    >
                                      {name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  })}
                </Accordion>

                {/* ======================================================= 
                             footer's news latter column
                ======================================================= */}

                <div className="px-0  mb-3 mb-sm-0 mt-3 mt-md-4 px-md-1 col-12 col-md-auto">
                  <div className="">
                    {/* <h2
                      className={`fw-medium h5 fs-sm-5 mb-sm-3 lh-base text-capitalize text-white`}
                    >
                      Newsletter
                    </h2>
                    <div className="bg-white br-5 overflow-hidden p-1">
                      <Form className="">
                        <div className="w-100 d-flex ">
                          <input
                            id="subscribeEmail"
                            name="subscribeEmail"
                            type="text"
                            className="w-100 border-0 bg-transparent border-color-black outline-none border-solid py-2 fs-14 placeholder-black-75 px-2"
                            placeholder="Email Address"
                          />
                          <button className="bg-color-primary hover-bg-secondary transition-background text-white border-0 px-3 px-sm-4 py-2 br-5 btn fs-14">
                            Subscribe
                          </button>
                        </div>
                      </Form>
                    </div> */}
                  </div>
                  {/* <div className="my-3 my-md-4"> */}
                  <div className="mb-3 mb-md-4">
                    <h3 className="fw-medium fs-5 lh-base mb-2 fs-18 text-white">
                      Need Any Help?
                    </h3>
                    <ul className="m-0 p-0 lh-lg responsive">
                      <li className=" fw-normal fs-16 text-white line-height-2_4">
                        Contact -{" "}
                        <span className="ms-2">
                          <a
                            href="tel:98653-45780"
                            className="text-white fw-light hover-opacity-1 opacity-65"
                          >
                            98653-45780
                          </a>
                        </span>{" "}
                      </li>
                      <li className=" fw-normal fs-16 text-white line-height-2_4">
                        Email -{" "}
                        <span className="ms-2">
                          <a
                            href="mailto:alukas@mailinator.com"
                            className="text-white opacity-65 fw-light hover-opacity-1 "
                          >
                            alukas@mailinator.com
                          </a>
                        </span>{" "}
                      </li>
                      <li className=" fw-normal fs-16 text-white line-height-2_4">
                        Address -{" "}
                        <span className="ms-2">
                          <p className="text-white opacity-65 fw-light p-0 m-0 d-inline">
                            502 New Design Str, Melbourne, Australia.
                          </p>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <ul className="m-0 p-0 d-flex gap-3 flex-wrap">
                    {socialMediaData.map((item, index) => {
                      const path = item?.path;
                      const type = item?.type;
                      return (
                        <li
                          key={index}
                          className="bg-white hw-25 rounded-circle d-flex align-items-center justify-content-center cursor-pointer zoom-hover zoom transition-transform"
                        >
                          <a
                            href={path}
                            target="_blank"
                            className="text-color-primary"
                          >
                            <i className={iconsEnum[type]}></i>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
          <hr className="border-white opacity-10 p-0 m-0" />

          {/* =========================================== 
                       footer below stripe 
              ======================================== */}

          <div className="py-3">
            <Container>
              <div className="d-flex text-white justify-content-between flex-wrap gap-3 gap-md-0">
                <Col sm={12} md={4}>
                  <p className="p-0 m-0 fs-14 fw-light">
                    Jewelsmart Ventures Private Limited
                  </p>
                </Col>
                <Col sm={12} md={4}>
                  <p className="p-0 m-0 fs-14 fw-light text-center">
                    © 2015 - {new Date()?.getFullYear()} Copyrights Reserved by
                    Alukas & Co.
                  </p>
                </Col>
                <Col sm={12} md={4}>
                  <img
                    className="max-w-100 ms-auto d-block"
                    src={paymentMathods}
                    alt=""
                  />
                </Col>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
