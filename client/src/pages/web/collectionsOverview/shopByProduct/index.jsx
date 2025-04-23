import { Container, Tab, Tabs } from "react-bootstrap";
import TextHoverAnimation from "../../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
import ProductsSlider from "./ProductsSlider";

const ShopByProduct = () => {
  const { homeData } = useSelector((store) => store.CollectionsOverview);
  const bestSeller = homeData?.bestSeller;
  const featured = homeData?.featured;
  const newArrivalData = homeData?.newArrivals;

  return (
    <section className="paddingBottom">
      <Container>
        <div>
          <TextHoverAnimation content="shop by product" word="s" />

          <Tabs
            defaultActiveKey={"newArrival"}
            className=" mb-3 mb-md-4 mx-auto justify-content-center custom-line-tab responsive fs-16 gap-1 border-bottom-0"
          >
            {newArrivalData?.length && (
              <Tab eventKey="newArrival" title="New Arrival">
                <ProductsSlider data={newArrivalData} />
              </Tab>
            )}
            {featured?.length > 0 && (
              <Tab eventKey="featured" title="Featured">
                <ProductsSlider data={featured} />
              </Tab>
            )}
            {bestSeller?.length > 0 && (
              <Tab eventKey="bestSeller" title="Best Seller">
                <ProductsSlider data={bestSeller} />
              </Tab>
            )}
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ShopByProduct;
