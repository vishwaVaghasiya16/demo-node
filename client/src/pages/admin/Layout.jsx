import PropTypes from "prop-types";
import SideBar from "../../components/admin/sideBar/SideBar";
import Header from "../../components/admin/header/Header";
import Footer from "../../components/admin/footer/Footer";
import { useSelector } from "react-redux";
import "../../darkMode.css";

export const Layout = ({ children }) => {
  const { isDarkMode } = useSelector((store) => store.Filters);

  return (
    <div
      className={`admin-main-layout ${
        isDarkMode && "dark-layout"
      } layout-transition`}
    >
      <div className={`d-flex`}>
        <SideBar />
        <div
          className={`position-relative bg-color-titan-white z-1 min-vh-100 position-relative w-100 overflow-x-hidden`}
        >
          <Header />
          <div>
            <div className={`px-20`}>{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
