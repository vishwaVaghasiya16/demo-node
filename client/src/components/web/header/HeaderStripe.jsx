import { Col } from "react-bootstrap";

const HeaderStripe = () => {
  return (
    <div className="overflow-hidden bg-color-primary p-0 position-relative z-55">
      <div className="d-flex  align-items-center justify-content-lg-between gap-lg-2  justify-content-center  py-2 container flex-wrap ">
        <div className=" max-w-fit d-flex gap-4 m-0 p-0 text-white">
          <p className="p-0 m-0 d-none d-lg-flex align-items-center fs-14 ">
            <span className="lh-1">
              <i className="ri-phone-line me-2 fs-5"></i>
            </span>
            Free Call:- +91 123 456 7890
          </p>
        </div>

        <Col lg={5} className="overflow-hidden">
          {/* <div className="marquee-content d-flex top-banner-section-marquee-box">
            <h2 className="text-nowrap">
              Summer Sale 15% off! Shop Now! | Buy Online Jewellery In India |
              1500+ Latest Design
            </h2>
            <h2 className="text-nowrap">
              Summer Sale 15% off! Shop Now! | Buy Online Jewellery In India |
              1500+ Latest Design
            </h2>
          </div> */}
          <section className="b-section">
            <div className="b-section-marquee-box overflow-hidden align-items-center d-flex">
              <h2 className="marquee-text text-white fw-normal fs-14 m-0 text-nowrap">
                Summer Sale 15% off! Shop Now! <span className="px-3">|</span>{" "}
                Buy Online Jewellery In India <span className="px-3">|</span>
                1500+ Latest Design <span className="px-3">|</span>
              </h2>
              <h2 className="marquee-text text-white fw-normal fs-14 m-0 text-nowrap">
                Summer Sale 15% off! Shop Now! <span className="px-3">|</span>{" "}
                Buy Online Jewellery In India <span className="px-3">|</span>
                1500+ Latest Design  <span className="px-3">|</span>
              </h2>
              <h2 className="marquee-text text-white fw-normal fs-14 m-0 text-nowrap">
                Summer Sale 15% off! Shop Now! <span className="px-3">|</span>{" "}
                Buy Online Jewellery In India <span className="px-3">|</span>
                1500+ Latest Design  <span className="px-3">|</span>
              </h2>
              <h2 className="marquee-text text-white fw-normal fs-14 m-0 text-nowrap">
                Summer Sale 15% off! Shop Now! <span className="px-3">|</span>{" "}
                Buy Online Jewellery In India <span className="px-3">|</span>
                1500+ Latest Design  <span className="px-3">|</span>
              </h2>
              <h2 className="marquee-text text-white fw-normal fs-14 m-0 text-nowrap">
                Summer Sale 15% off! Shop Now! <span className="px-3">|</span>{" "}
                Buy Online Jewellery In India <span className="px-3">|</span>
                1500+ Latest Design  <span className="px-3">|</span>
              </h2>
            </div>
          </section>
        </Col>

        {/* <div className="text-white fs-14">
          Summer Sale 15% off! Shop Now! | Buy Online Jewellery In India | 1500+
          Latest Design
        </div> */}
        <ul className="d-none d-lg-flex m-0 p-0 max-w-fit text-white fs-14 ">
          <li className="">
            Contact Us<span className="px-2">|</span>
          </li>
          <li className="">
            Services<span className="px-2">|</span>
          </li>
          <li className="">Gift</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderStripe;
