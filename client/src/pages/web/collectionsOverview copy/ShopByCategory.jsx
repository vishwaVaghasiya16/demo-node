import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
import "swiper/css";
import CommonSliderCard from "../../../components/web/CommonSliderCard";

const ShopByCategory = () => {
  const { shopByCategories, shopByCategoryData } = useSelector(
    (store) => store.CollectionsOverview
  );

  return (
    <section className="paddingTop common-slider-cart">
      <Container>
        <TextHoverAnimation content="Show By Category" word="s" />
        <div className="responsive">
          <ul className="d-flex gap-4 gap-sm-5 justify-content-center p-0 mb-0 fs-16 pb-3 pb-md-0">
            {shopByCategories?.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`hover-color-primary cursor-pointer transition-color  ${
                    item?._id == shopByCategories[0]?._id
                      ? "text-color-primary border-bottom  border-color-primary border-2"
                      : "text-color-secondary hover-underline "
                  }`}
                >
                  {item?.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="swiper-custom-navigation">
          <CommonSliderCard data={shopByCategoryData[0]?.data} />
        </div>
      </Container>
    </section>
  );
};

export default ShopByCategory;
