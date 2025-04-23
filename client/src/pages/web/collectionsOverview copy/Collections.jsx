import { Col, Container, Row } from "react-bootstrap";
import handImage from "/assets/web/hand.webp";
import collectionBanner1 from "/assets/web/home/collection-banner1.webp";
import collectionBanner2 from "/assets/web/home/collection-banner2.webp";

const Collections = () => {
  const collectionImageData = [
    {
      _id: "1",
      thumbnail:
        "https://i.pinimg.com/originals/07/68/62/076862fc939397571c52aed6c7534ab3.jpg",
      category: "Ear Rings",
    },
    {
      _id: "2",
      thumbnail:
        "https://www.thejewelleryeditor.com/media/images_thumbnails/filer_public_thumbnails/old/18529/Cartier-Trinity9.jpg__1080x0_q75_crop-scale_subsampling-2_upscale-false.jpg",
      category: "Rings",
    },
    {
      _id: "3",
      thumbnail:
        "https://basinreboot.com/wp-content/uploads/2023/03/Womens-Jewelry-1024x592.jpg",
      category: "Neckless",
    },
  ];

  const findFirstLatter = (value) => {
    if (value) {
      return value.charAt(0);
    }
  };

  return (
    <section className={`collection-section`}>
      <Container className="overflow-hidden ">
        <div className="fs-200 text-center responsive position-relative text-color-primary fade-up-big">
          <p className="position-absolute ff-sorts top-50 start-50 translate-middle">
            Collections
          </p>
          <img
            data-aos="fade-up"
            src={handImage}
            alt="handImage"
            className="hand-img"
          />
        </div>
        <div>
          <div className="responsive">
            <p className="text-center text-color-primary fs-28 fw-medium">
              Inspired by our multi-ethnic life, <br /> we create fine jewelry
              to share our wonderful tales…
            </p>
          </div>
          <div className="">
            <Row>
              {collectionImageData?.map((item, index) => {
                const thumbnail = item?.thumbnail;
                const category = item?.category;

                return (
                  <Col
                    md={4}
                    key={index}
                    className=" home-collections-image mb-3 mb-md-5"
                  >
                    <div className="position-relative br-10 overflow-hidden hover-collection">
                      <div className=" h-100 w-100  collection-category-card hover-collection-child-1">
                        <img
                          loading="lazy"
                          className="w-100 aspect-2_1 object-fit-cover"
                          src={thumbnail}
                          alt=""
                        />
                      </div>
                      <div className="position-absolute  w-100 h-100 hover-collection-child-2 bg-color-primary top-0 start-0 d-flex align-items-center justify-content-center">
                        <div className="position-relative">
                          <h3 className="fs-2_9vw text-white ff-sorts fw-normal z-2 position-relative m-0 p-0 ">
                            {category}
                          </h3>
                          <span className="position-absolute top-75 start-50 translate- z-1 fs-170 text-white opacity-10 fw-medium ff-sorts text-capitalize first-category-latter">
                            {findFirstLatter(category)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <div className="pb-3 pb-md-5 responsive">
              <div className="d-flex align-items-center gap-3 gap-sm-5 justify-content-center bg-color-titan-white py-3 px-3 br-10">
                <i className="ri-home-5-line fs-5 text-color-primary "></i>
                <p className="p-0 m-0 fs-16 text-color-primary">
                  Find Jewelry Shops Near You
                </p>
                <button className="primary-btn fs-14 text-nowrap">
                  shop now
                </button>
              </div>
            </div>

            <div>
              <Row className="responsive">
                <Col md={6} className="mb-3 mb-md-0 zoom-hover">
                  <div className="br-10 overflow-hidden h-1_1-1 bg-gradient-black position-relative w-100 max-h-400px d-flex align-items-center">
                    <img
                      loading="lazy"
                      className="position-absolute end-0 top-0 h-100 zoom transition-transform"
                      src={collectionBanner1}
                      alt=""
                    />
                    <div className="px-4 px-sm-5 px-md-4 px-lg-5 position-relative z-1">
                      <h4 className="text-white fs-2 fw-normal lh-base">
                        New Bangles <br /> Collection
                      </h4>
                      <p className="text-white opacity-50 fs-14 ls-0_7px m-0 p-0">
                        Catch the highlight in the roof
                      </p>
                      <button className="white-border-btn fs-14 mt-4 mt-lg-5 text-nowrap">
                        Shop now
                      </button>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="zoom-hover ">
                  <div className="br-10 overflow-hidden h-1_1-1 bg-gradient-gray position-relative max-h-400px w-100 d-flex align-items-center">
                    <img
                      loading="lazy"
                      className="position-absolute end-0 top-0  h-100 zoom transition-transform"
                      src={collectionBanner2}
                      alt=""
                    />
                    <div className="px-4 px-sm-5 px-md-4 px-lg-5 position-relative z-1">
                      <h4 className="text-white fs-2 fs-md-4 fs-lg-3 fw-normal lh-base">
                        Culture of <br /> Ring Design
                      </h4>
                      <p className="text-white opacity-50 fs-14 ls-0_7px m-0 p-0">
                        Pasha de Cartier Collection.
                      </p>
                      <button className="white-border-btn fs-14 mt-4 mt-lg-5 text-nowrap">
                        Shop now
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Collections;
