import { Col, Container, Row } from "react-bootstrap";
import { logOut } from "../../../store/auth/slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CLIENT } from "../../../routes/routesConstants";
import PageHeader from "../../../components/web/header/PageHeader";
import { useUserInfoRoutes } from "../../../data/header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const userInfoRoutes = useUserInfoRoutes();

  const handleLogOut = () => {
    dispatch(logOut());
    nav(CLIENT.INDEX);
  };

  // const title = "Home";
  const title = location?.pathname?.split("/")[1]?.split("-")?.join(" ");
  const pageTitle = location?.pathname?.split("/")[2]?.split("-")?.join(" ");

  return (
    <>
      <div className={`account-details page-content paddingBottom`}>
        <Container>
          <PageHeader title={title} pageTitle={pageTitle} />
          {/* <div className="border text-center bg-color-titan-white py-3 py-md-5 mb-3 mb-md-4 br-10">
            <h2
              className={`fs-2 fw-medium ls-1px lh-1 text-capitalize text-color-primary`}
            >
              {pageTitle}
            </h2>
            <div className={`mb-md-1 w-fit mx-auto`}>
              <BreadCrumb
                title={title}
                pageTitle={pageTitle}
                // subPageTitle={subPageTitle}
              />
            </div>
          </div> */}
          <div className={`mt-3 mt-md-4`}>
            <Row>
              <Col className={`d-none d-lg-block custom-width`} lg={4} xl={4}>
                <div className="border br-10 bg-white p-3">
                  <ul className="p-0 m-0 d-flex flex-column gap-3">
                    {userInfoRoutes?.map((item, index) => {
                      return Object.keys(item).length > 0 ? (
                        <li className={`br-5 p-0 overflow-hidden`} key={index}>
                          <Link
                            to={item.path}
                            className={`d-flex align-items-center h-45 nav-item bg-color-titan-white ps-3 ${
                              location.pathname === item.path ? "active" : ""
                            } text-capitalize fs-14 fw-medium text-color-black hover-text-color-primary`}
                          >
                            <span className=" text-color-primary m-0 line-height-3">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ) : null;
                    })}
                    <li className={`br-5 p-0 overflow-hidden`}>
                      <button
                        onClick={handleLogOut}
                        className={`d-flex align-items-center h-45 text-start btn w-100 nav-item bg-color-titan-white p-0 ps-3 text-capitalize fs-14 fw-medium text-color-black hover-text-color-primary`}
                      >
                        <span className=" text-color-primary m-0 line-height-3">
                          Log out
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
                {/* {subPageTitle === "contact us" ? <ContactUsDetails /> : null} */}
              </Col>
              <Col className={`custom-width`} md={12} lg={8} xl={8}>
                <div>{children}</div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
