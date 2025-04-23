import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import img24k from "/assets/web/home/24k.webp";
import set1Img from "/assets/web/home/set1.webp";
import set2Img from "/assets/web/home/set2.webp";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const Sets = () => {
  return (
    <section className="paddingBottom">
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md={6}>
            <div className="mx-auto">
              <h4 className="fs-2 text-center line-height-1_5 text-color-primary ">
                A thin, brilliantband of micro pavé <br /> diamonds sets
              </h4>
              <img
                src={set1Img}
                className="w-100 max-md-w-400p mx-auto d-block object-fit-cover aspect-0_9-1 br-10 overflow-hidden"
                alt=""
              />
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className="mt-3 mt-md-0">
              <div className="position-relative">
                <img
                  src={set2Img}
                  className="w-100 aspect-1_1-1 mx-auto d-block object-fit-cover br-10 overflow-hidden max-md-w-400p"
                  alt=""
                />
                <img
                  src={img24k}
                  className="set-24k-img d-none d-lg-block"
                  alt=""
                />
              </div>
              <h4 className="fs-2 line-height-1_5 text-color-primary mt-3 mt-lg-5 truncate-line-3">
                Our jewelry is handmade ethically and sustainably, because we
                think the earth deserves better.
              </h4>
              <p className="text-color-secondary mt-3">
                Coordinate with other pieces from the collection for a classic
                look.
              </p>
              {/* <Button className="primary-btn fs-14 mt-4 mt-sm-5"> */}
              {/* <Link to={`${CLIENT.CATEGORY}#collections`} className="primary-btn fs-14 mt-4 mt-sm-5 max-w-fit"> */}
              <a
                href="#collections"
                className="primary-btn fs-14 mt-4 mt-sm-5 w-fit"
              >
                All collections
              </a>
              {/* </Link> */}
              {/* </Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Sets;
