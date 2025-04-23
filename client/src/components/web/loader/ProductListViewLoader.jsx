import { Button, Col, Placeholder, Row } from "react-bootstrap";

const ProductListViewLoader = () => {
  return (
    <div>
      <Row>
        <Col
          xs={5}
          sm={5}
          md={4}
          xxl={3}
          className={`custom-width px-2 px-md-3`}
        >
          <div className={`product-image-box product-image`}>
            <Placeholder animation="glow">
              <Placeholder
                className={`h-100 w-100 br-10 overflow-hidden`}
                xs={2}
              />
            </Placeholder>
          </div>
        </Col>
        <Col xs={7} sm={7} md={8} xxl={9} className={`custom-width`}>
          <div>
            <Placeholder animation="glow">
              <Placeholder
                className={`mt-3 br-10 overflow-hidden`}
                xs={4}
                sm={2}
              />
            </Placeholder>
          </div>
          <div>
            <Placeholder animation="glow">
              <Placeholder
                className={`mt-3 br-10 overflow-hidden`}
                xs={10}
                sm={4}
              />
            </Placeholder>
          </div>
          <div>
            <Placeholder animation="glow">
              <Placeholder
                className={`mt-3 br-10 overflow-hidden`}
                xs={5}
                sm={2}
              />
            </Placeholder>
          </div>
          <div>
            <Placeholder animation="glow">
              <Placeholder
                className={`mt-3 mt-md-4 br-10 overflow-hidden`}
                xs={12}
              />
            </Placeholder>
          </div>
          <Placeholder animation="glow">
            <Button className="cursor-default placeholder bg-color-primary d-block p-0 m-0 border-0 primary-btn mt-3 mt-md-4"></Button>
          </Placeholder>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListViewLoader;
