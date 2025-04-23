import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import CommonSliderCard from "../../../components/web/CommonSliderCard";
import { useSelector } from "react-redux";

const RecentlyViewProduct = () => {
  const { recentlyProduct } = useSelector((store) => store.ProductDetails);
  if (recentlyProduct?.length > 0) {
    return (
      <section className="">
        <Container>
          <TextHoverAnimation content="Recently views" word="R" />
          <CommonSliderCard data={recentlyProduct} />
        </Container>
      </section>
    );
  }
};

export default RecentlyViewProduct;
