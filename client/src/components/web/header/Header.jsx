import { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Form,
  Modal,
  Navbar,
  Offcanvas,
  useAccordionButton,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "/assets/common/ALUKAS & CO.webp";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setAuthBox } from "../../../store/auth/slice";
import { CLIENT } from "../../../routes/routesConstants";
import PropTypes from "prop-types";
import { useUserInfoRoutes } from "../../../data/header";
import { setClearAllFilters } from "../../../store/products/slice";
import { clearCart } from "../../../store/cart/slice";
import defaultUserImg from "/assets/admin/defaultUser.webp";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSearchField, setShowSearchField] = useState(false);
  const { user } = useSelector((store) => store?.Auth);
  const { activeIds } = useSelector((store) => store.Wishlist);
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const { categoryData } = useSelector((store) => store?.Categories);
  const [activeAccordion, setActiveAccordion] = useState("");
  const nav = useNavigate();
  const userInfoRoutes = useUserInfoRoutes();
  const { cart } = useSelector((store) => store.Cart);
  const cartItems = cart?.[0];

  // const { userProfile } = useGetAuth()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { pathname } = useLocation();
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const dispatch = useDispatch();
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const webHeader = document.getElementById("webHeader");

      if (prevScrollPos > currentScrollPos) {
        if (window.scrollY > 70) {
          setShowHeader(true);
          setTimeout(() => {
            if (webHeader) {
              webHeader.classList.add("activeHeader");
            }
          }, 20);
        } else {
          setShowHeader(false);
        }
      } else {
        setShowHeader(false);
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const CustomAccordionButton = ({ children, eventKey, img, icon }) => {
    const handleClick = useAccordionButton(eventKey, () =>
      setActiveAccordion(activeAccordion === eventKey ? null : eventKey)
    );

    return (
      <div
        className="d-flex justify-content-between align-items-center w-100 footer-accordion-button"
        onClick={handleClick}
      >
        <div className="d-flex align-items-center gap-3">
          <img src={img} alt="" className="h-45 w-45 rounded-circle" />
          <h6 className="border-0 bg-transparent m-0 p-0" type="button">
            {children}
          </h6>
        </div>
        {icon && (
          <span>
            {activeAccordion === eventKey ? (
              <i className="ri-arrow-down-s-line"></i>
            ) : (
              <i className="ri-arrow-right-s-line"></i>
            )}
          </span>
        )}
      </div>
    );
  };

  CustomAccordionButton.propTypes = {
    children: PropTypes.node,
    eventKey: PropTypes.string,
  };

  const handleShowModel = () => {
    if (Object.keys(user)?.length > 0) {
      setShowModel(true);
    } else {
      dispatch(setAuthBox("register"));
    }
  };

  const handleCloseModel = () => setShowModel(false);

  const handleLogOut = () => {
    setShowModel(false);
    dispatch(logOut());
    dispatch(clearCart());
  };

  const handleCart = (data) => {
    if (!user) {
      dispatch(setAuthBox(data));
    }
  };

  const handleNavigate = (path) => {
    dispatch(setClearAllFilters());
    nav(`${CLIENT.CATEGORY}/${path}`);
  };

  const handleSearch = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setShowSearchField(false);
        // nav(`${CLIENT.SEARCH}/${value}`);
        nav(`${CLIENT.SEARCH}/${value?.toLowerCase()}`);
      } else {
        setShowSearchField(false);
        nav(CLIENT.CATEGORY);
      }
    }
  };

  return (
    <header>
      {" "}
      <Navbar
        id="webHeader"
        expand="lg"
        className={` w-100 bg-white navbar p-0 z-50  ${
          !showHeader
            ? " position-absolute top-2"
            : "position-fixed top-0 initialActiveHeader"
        }`}
      >
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between w-100 flex-wrap z-50 position-relative">
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header className="bg-body-tertiary" closeButton>
                <Offcanvas.Title>
                  <Link to={CLIENT.INDEX} onClick={() => setShow(false)}>
                    <img src={Logo} alt="logo" className="w-180px" />
                  </Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="pb-5">
                <div className="d-flex justify-content-between ">
                  <h5>Menu</h5>
                  <ul className="d-flex gap-1 gap-sm-3 m-0 p-0">
                    <li>
                      <Link
                        onClick={() => setShow(false)}
                        to={CLIENT.WISHLIST}
                        className="fs-5 text-color-primary position-relative"
                      >
                        <i className="ri-heart-3-line"></i>
                        <span className="position-absolute translate-middle top-0 min-w-15px fs-8 bg-color-primary text-center p-1 text-white rounded-circle min-h-15px">
                          {activeIds?.length || 0}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <hr className="hr mt-2 hr-color-primary" />
                <div className="m-0 p-0">
                  <Accordion defaultActiveKey={activeAccordion}>
                    {categoryData?.map((item, index) => {
                      const title = item?.title;
                      // const path = title?.split(" ")?.join("-")?.toLowerCase();
                      const path = item?.slug;
                      const subCategory = item?.subCategory;
                      const img = item?.url;
                      return (
                        <Card
                          key={index}
                          className="mb-1 bg-color-titan-white p-2 px-3"
                        >
                          <CustomAccordionButton
                            eventKey={"" + index}
                            img={img}
                            icon={subCategory?.length > 0 ? true : false}
                          >
                            <Link to={`${CLIENT.CATEGORY}/${path}`}>
                              <Card.Header className="p-0 bg-transparent border-0 fw-normal text-capitalize fs-14 fw-medium text-color-primary">
                                {title}
                              </Card.Header>
                            </Link>
                          </CustomAccordionButton>
                          {subCategory?.length > 0 && (
                            <Accordion.Collapse eventKey={"" + index}>
                              <Card.Body className="p-0 mt-2">
                                <ul className="m-0 p-0">
                                  {subCategory?.map((subItem, index) => {
                                    const title = subItem.title;
                                    const categorySlug = item?.slug;
                                    const subCategorySlug = subItem?.slug;
                                    return (
                                      <li key={index}>
                                        <Link
                                          onClick={() => setShow(false)}
                                          to={`${CLIENT.CATEGORY}/${categorySlug}/${subCategorySlug}`}
                                          className="text-capitalize text-color-secondary line-height-2 fw-normal fs-14"
                                        >
                                          {title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </Card.Body>
                            </Accordion.Collapse>
                          )}
                        </Card>
                      );
                    })}
                  </Accordion>
                  {/* {categoryData?.map((item, index) => {
                    const title = item?.title;
                    const path = title.split(" ")?.join("-")?.toLowerCase();
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => setShow(false)}
                          to={`${CLIENT.CATEGORY}/${path}`}
                          className="text-capitalize text-color-black-75 line-height-2"
                        >
                          {title}
                        </Link>
                      </li>
                    );
                  })} */}
                </div>
                <a
                  href="tel:+91 1234567890"
                  className="p-0 m-0 d-block text-center fs-14 position-absolute bottom-0 end-0 p-2 bg-color-primary w-100 text-white fs-12 fw-normal"
                >
                  <span className="lh-1">
                    <i className="ri-phone-line me-2 fs-16"></i>
                  </span>
                  Free Call:- +91 123 456 7890
                </a>
              </Offcanvas.Body>
            </Offcanvas>

            <div className=" bg-color-titan-white w-100 border-bottom ">
              <div className="container">
                <div className=" d-flex justify-content-between align-items-center w-100 py-3">
                  <Col xs={4} className="d-none d-lg-block">
                    <Form className="d-flex">
                      <div className="bg-white border d-flex align-items-center justify-content-between px-2 py-1 br-5 w-280px">
                        <input
                          onKeyDown={handleSearch}
                          id="header-search-field"
                          type="text"
                          className="ps-0 w-100 pe-2 border-0 bg-transparent outline-none fs-14 fw-normal"
                          placeholder="Search Product..."
                        />
                        <i className="ri-search-line fs-5"></i>
                      </div>
                    </Form>
                  </Col>

                  <Col
                    xs={4}
                    className="d-flex align-items-center justify-content-lg-center"
                  >
                    <i
                      onClick={handleShow}
                      className="ri-menu-2-line me-3 fs-5 d-inline-block d-lg-none text-color-black-75 cursor-pointer"
                    ></i>
                    <Link to={CLIENT.INDEX} aria-label="home">
                      <img src={Logo} className="logo d-block mx-auto" alt="" />
                    </Link>
                  </Col>

                  <Col xs={4} className="d-flex justify-content-end">
                    <ul className="p-0 m-0 d-flex align-items-center gap-2 gap-sm-3">
                      <li
                        onClick={() => setShowSearchField(!showSearchField)}
                        className=""
                      >
                        <i className="ri-search-line d-inline-block d-lg-none fs-4 text-color-primary"></i>
                      </li>
                      <li className="position-relative">
                        <i
                          className={`${
                            user?.role &&
                            user?.role !== enumsData?.userRoleEnum?.CUSTOMER
                              ? "ri-user-settings-line"
                              : "ri-user-3-line"
                          } fs-4 text-color-primary cursor-pointer`}
                          onClick={handleShowModel}
                        ></i>
                        <Modal
                          show={showModel}
                          className="user-info-model responsive"
                          onHide={handleCloseModel}
                        >
                          <Modal.Body className="">
                            <div className="p-3 bg-white ms-auto rounded-3 ">
                              <div className="bg-color-titan-white br-5 p-3 border border-color-light-gray">
                                <div className="border hw-50 rounded-circle mx-auto mb-2 overflow-hidden">
                                  <img
                                    src={user?.url || defaultUserImg}
                                    className="w-100 h-100 object-fit-cover"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <h6 className="m-0 text-center text-capitalize text-color-primary">
                                    {user?.username || "user"}
                                  </h6>
                                  <p className="m-0 text-center text-color-secondary fs-14 ls-0_7px mt-1 pb-1 text-overflow-ellipsis">
                                    {user?.email || "user@gmail.com"}
                                  </p>
                                </div>
                              </div>
                              <ul className="p-0 m-0 mt-2">
                                {userInfoRoutes?.map((item, index) => {
                                  const path = item?.path;
                                  const name = item?.name;
                                  return (
                                    <li key={index}>
                                      <Link
                                        onClick={handleCloseModel}
                                        to={path}
                                        className={`nav-item ${
                                          location.pathname === path
                                            ? "active"
                                            : "text-color-secondary"
                                        } text-capitalize fs-14  hover-text-color-primary`}
                                      >
                                        <span className="m-0 line-height-2_6">
                                          {name}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                                <Link
                                  to={CLIENT.INDEX}
                                  className="hover-text-color-primary text-capitalize text-color-secondary fs-14 fw-medium cursor-pointer"
                                  onClick={handleLogOut}
                                >
                                  <p className="m-0 line-height-2_6">Log out</p>
                                </Link>
                              </ul>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </li>

                      <li className="d-none d-lg-inline">
                        <Link
                          to={CLIENT.WISHLIST}
                          className="position-relative"
                        >
                          <i className="ri-heart-3-line fs-4 text-color-primary "></i>
                          <span className="position-absolute translate-middle top-0 min-w-15px fs-8 bg-color-primary text-center p-1 text-white rounded-circle min-h-15px">
                            {activeIds?.length || 0}
                          </span>
                        </Link>
                      </li>
                      <li onClick={() => handleCart("register")}>
                        <Link to={CLIENT.CART} className="position-relative">
                          {" "}
                          <i className="ri-shopping-cart-2-line fs-4 text-color-primary cursor-pointer"></i>
                          <span className="position-absolute translate-middle top-0 min-w-15px fs-8 bg-color-primary text-center p-1 text-white rounded-circle min-h-15px">
                            {cartItems?.items?.length || 0}
                          </span>
                        </Link>
                      </li>
                    </ul>{" "}
                  </Col>
                </div>

                {showSearchField && (
                  <Form className="d-flex w-100 mb-3 d-lg-none">
                    <label htmlFor="search"></label>
                    <div className="bg-white w-100 border d-flex align-items-center justify-content-between px-3 py-2 br-5">
                      <input
                        onKeyDown={handleSearch}
                        id="header-search-field"
                        name="search"
                        type="text"
                        className="p-0 border-0 w-100 pe-3 bg-transparent outline-none fs-14 placeholder-black-75"
                        placeholder="Search Product..."
                      />
                      <i className="ri-search-line fs-5 text-color-primary"></i>
                    </div>
                  </Form>
                )}
              </div>
            </div>

            <div className="container">
              <ul className="d-none d-lg-flex gap-4 p-0 m-0 flex-wrap justify-content-center bg-white">
                {categoryData?.map((item, index) => {
                  const title = item?.title;
                  const slug = item?.slug;
                  const subCategory = item.subCategory;
                  const numColumns = Math.ceil(subCategory?.length / 5);
                  const columnWidth = `repeat(${numColumns}, 1fr)`;
                  const activeLink =
                    location.pathname.split("/")[2]?.localeCompare(slug) === 0;
                  return (
                    <li
                      key={index}
                      className={`position-relative header-list subRoute-parent ${
                        activeLink
                          ? "border-bottom-underline"
                          : "hover-underline"
                      } navbar-category `}
                    >
                      <p
                        onClick={() => handleNavigate(slug)}
                        className="text-capitalize text-color-primary m-0 p-0 fw-medium fs-14 text-nowrap line-height-4 hover-text-color-primary cursor-pointer"
                      >
                        {title}
                      </p>
                      {subCategory && subCategory?.length > 0 && (
                        <div className="position-absolute navbar-subcategory pt-2">
                          <div className="p-4 m-0 bg-white w-auto br-10 light-shadow">
                            <h6 className="text-nowrap text-color-primary fw-medium mb-3 text-capitalize fs-16">
                              Shop By Style ({title})
                            </h6>
                            <ul
                              className="m-0 p-0 d-grid"
                              style={{ gridTemplateColumns: columnWidth }}
                            >
                              {subCategory?.map((subItem, index) => {
                                const title = subItem?.title;
                                const categorySlug = item?.slug;
                                const subCategorySlug = subItem?.slug;
                                return (
                                  <li key={index}>
                                    <Link
                                      to={`${CLIENT.CATEGORY}/${categorySlug}/${subCategorySlug}`}
                                      className={`text-color-secondary fs-14 line-height-2 text-capitalize hover-color-primary d-block mb-1`}
                                    >
                                      {title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
