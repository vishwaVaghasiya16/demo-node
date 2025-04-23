import { Button, Placeholder } from "react-bootstrap";

const ProductGridViewLoader = () => {
  return (
    <div>
      <div className={`product-image-box product-image`}>
        <Placeholder animation="glow">
          <Placeholder className={`h-100 w-100 br-10 overflow-hidden`} xs={2} />
        </Placeholder>
      </div>
      <div>
        <Placeholder animation="glow">
          <Placeholder className={`br-10 overflow-hidden`} xs={4} />
        </Placeholder>
      </div>
      <div>
        <Placeholder animation="glow">
          <Placeholder className={`br-10 overflow-hidden`} xs={10} />
        </Placeholder>
      </div>
      <div>
        <Placeholder animation="glow">
          <Placeholder className={`br-10 overflow-hidden`} xs={6} />
        </Placeholder>
      </div>
      <Placeholder className={`d-block d-lg-none`} animation="glow">
        <Button className="cursor-default placeholder bg-color-primary d-block p-0 m-0 border-0 primary-btn mt-3 mt-md-4"></Button>
      </Placeholder>
    </div>
  );
};

export default ProductGridViewLoader;
