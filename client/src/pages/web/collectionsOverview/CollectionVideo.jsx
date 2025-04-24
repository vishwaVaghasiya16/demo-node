import React from "react";
import { Button, Col, Container } from "react-bootstrap";

const CollectionVideo = () => {
  return (
    <section className="paddingBottom collection-video">
      <Container>
        <div>
          <div className="d-flex br-10 overflow-hidden flex-wrap">
            <Col xs={12} sm={7} md={8} className="">
              <div className="aspect-1_8-1 w-100 bg-color-secondary object-fit-cover">
                {/* <video className="w-100 object-fit-cover" autoPlay muted /> */}
                <video
                  className="w-100 object-fit-cover h-100 d-flex lh-0"
                  autoPlay
                  loop
                  playsInline
                  muted
                  src="https://cdn.pixabay.com/video/2023/06/01/165407-832724912_tiny.mp4"
                ></video>
              </div>
            </Col>
            <Col xs={12} sm={5} md={4} className="">
              <div className="bg-color-primary text-center h-100 d-flex flex-column align-items-center justify-content-center w-100 min-h-180px responsive">
                <p className="m-0 p-0 text-white fs-12 opacity-75 text-uppercase">
                  Customisable Jewelry. Made for You.
                </p>
                <h3 className="m-0 p-0 mb-2 line-height-1_5 fs-2_5vw text-white mt-1">
                  Your Uniquely <br /> Jewelry Collection
                </h3>
                {/* <Button className="white-border-btn mx-auto d-block mt-3 mt-md-4 fs-12 px-5"> */}
                <a
                  href="#collections"
                  className="white-border-btn mx-auto d-block mt-3 mt-md-4 fs-12 px-5"
                >
                  Shop Now
                </a>
                {/* </Button> */}
              </div>
            </Col>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CollectionVideo;
