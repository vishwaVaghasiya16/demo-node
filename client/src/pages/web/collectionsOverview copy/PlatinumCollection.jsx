import { Col} from "react-bootstrap";

const PlatinumCollection = () => {
  return (
    <section className="platinum-collection">
      <div className="platinum-collection-bg min-h-200px overflow-hidden bg-zoom-hover bg-zoom bg-position-center d-flex flex-column justify-content-center bg-cover">
        <div className="px-3 px-sm-5 mx-0 mx-sm-5 ">
          <Col xs={6}>
            <h2 className=" display-6 display-sm-4 fw-normal text-color-primary">
              PLATINUM COLLECTIONS
            </h2>
          </Col>
          <div className="mt-4 mt-sm-5">
            <button className="primary-btn w-auto fs-16 ">
              Browse Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatinumCollection;
