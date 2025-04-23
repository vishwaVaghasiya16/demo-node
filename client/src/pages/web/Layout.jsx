import PropTypes from "prop-types";
import HeaderStripe from "../../components/web/header/HeaderStripe";
import Header from "../../components/web/header/Header";
import Footer from "../../components/web/footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, getWishlistThunk } from "../../store/actions";
import { getCategoryThunk } from "../../store/actions";
export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const { cart } = useSelector((store) => store.Cart);
  const cartItems = cart?.[0]
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(getWishlistThunk());
    }
    if (Object.keys(user)?.length > 0 && !cartItems?.length > 0) {
      dispatch(getCartThunk());
    }
  }, [user, dispatch]);

  return (
    <div>
      <HeaderStripe />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
