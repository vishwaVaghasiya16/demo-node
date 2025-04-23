import { Container } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import MainProductDetails from "./MainProductDetails";
import RecentlyViewProduct from "./RecentlyViewProduct";
import ProductReviews from "./ProductReviews";
import ProductInfo from "./ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getProductDetailsByIdThunk,
  getVariantDetailsThunk,
} from "../../../store/actions";
import NoRecord from "../../../components/web/displayMessagePages/NoRecord";
import { CLIENT } from "../../../routes/routesConstants";

const ProductDetails = () => {
  const { productDetails } = useSelector((store) => store.ProductDetails);
  const productId = productDetails?.product?._id || productDetails?._id || "";
  const title = productDetails?.title || "Jewellery Product";
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const variantValue = searchParams.get("variant");

  useEffect(() => {
    if (variantValue) {
      dispatch(getVariantDetailsThunk({ query: { slug: variantValue } }));
    } else {
      dispatch(getProductDetailsByIdThunk({ slug }));
    }
  }, [variantValue, dispatch, slug]);

  return (
    <main className="page-content paddingBottom">
      {productDetails && Object.keys(productDetails).length > 0 ? (
        <>
          <Container>
            <PageHeader
              title={CLIENT.CATEGORY.split("/")?.[1]}
              pageTitle={title}
            />
          </Container>
          <MainProductDetails />
          <ProductInfo />
          <RecentlyViewProduct />
          <ProductReviews productId={productId} />
        </>
      ) : (
        <div className="mt-lg-5">
          <NoRecord
            title="product not found !"
            message="We're sorry, but it looks like there is no product available matching your search criteria at the moment. Please try again later or explore our other categories."
          />
        </div>
      )}
    </main>
  );
};

export default ProductDetails;
