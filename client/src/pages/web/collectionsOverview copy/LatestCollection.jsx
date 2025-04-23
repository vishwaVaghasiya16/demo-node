import { Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import PageHeader from "../../../components/web/header/PageHeader";

const LatestCollection = () => {
  const { latestCollection } = useSelector(
    (store) => store.CollectionsOverview
  );
  const { data } = useSelector((store) => store.Categories);

  return (
    <div className={`page-content`}>
      <Container className={`d-block d-lg-none`}>
        <PageHeader categories={true} />
      </Container>
      <section className="pt-3 pt-sm-4 pt-lg-0 bg-pattern1 latest-collection">
        <Container>
          <div className={`d-flex flex-column flex-lg-row gap-3 gap-sm-4`}>
            <Col lg={5} className="d-flex flex-column gap-3 gap-sm-4">
              <div
                className="br-10 dynamic-bg-img bg-overlay-sm-after overflow-hidden min-h-380px px-3 px-sm-5 d-flex flex-column justify-content-center"
                style={{
                  "--dynamic-bg-img": `url(${latestCollection[0]?.thumbnail})`,
                }}
              >
                <div>
                  <Col lg={6} xl={4}>
                    <h3 className="text-white lh-base ">
                      {latestCollection[0]?.title}
                    </h3>
                  </Col>
                  <p className="text-white m-0 p-0 mt-3 mb-4 mb-sm-5 opacity-65 fs-14">
                    {latestCollection[0]?.description}
                  </p>
                  <button className="white-border-btn fs-14 ">Shop Now</button>
                </div>
              </div>
              <div
                className="br-10 dynamic-bg-img bg-overlay-sm-after overflow-hidden min-h-380px px-3 px-sm-5 d-flex flex-column justify-content-center"
                style={{
                  "--dynamic-bg-img": `url(${latestCollection[1]?.thumbnail})`,
                }}
              >
                <div>
                  <Col lg={6} xl={4}>
                    <h3 className="text-white lh-base ">
                      {latestCollection[1]?.title}
                    </h3>
                  </Col>
                  <p className="text-white m-0 p-0 mt-3 mb-4 mb-sm-5 opacity-65 fs-14">
                    {latestCollection[1]?.description}
                  </p>
                  <button className="white-border-btn fs-14 ">Shop Now</button>
                </div>
              </div>
            </Col>
            <Col className="br-10 overflow-hidden  bg-cover bg-overlay-sm">
              <div
                className="w-100 h-100 dynamic-bg-img bg-overlay-sm-after min-h-380px overflow-hidden px-3 px-sm-5 d-flex flex-column justify-content-center"
                style={{
                  "--dynamic-bg-img": `url(${latestCollection[2]?.thumbnail})`,
                }}
              >
                <div>
                  <Col lg={7} xl={4}>
                    <h3 className="text-white">{latestCollection[2]?.title}</h3>
                  </Col>
                  <p className="text-white m-0 p-0 mt-3 mb-4 mb-sm-5 opacity-65 fs-14">
                    {latestCollection[2]?.description}
                  </p>
                  <button className="white-border-btn fs-14 ">Shop Now</button>
                </div>
              </div>
            </Col>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LatestCollection;
