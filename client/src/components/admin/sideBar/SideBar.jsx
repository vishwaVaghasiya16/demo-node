import { Link } from "react-router-dom";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import React, { useEffect, useState } from "react";
import { Button, Collapse, Offcanvas } from "react-bootstrap";
import { useSideBarNavItemsData } from "../../../data/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { setToggleValue } from "../../../store/filters/slice";
import { useMediaQuery } from "react-responsive";

const SideBar = () => {
  const ADMIN = Admin();
  const navItemsData = useSideBarNavItemsData();
  const dispatch = useDispatch();
  const { isDarkMode, isToggle } = useSelector((store) => store.Filters);
  const { user } = useSelector((store) => store.Auth);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isParentId, setIsParentId] = useState("");
  const [navListParentId, setNavListParentId] = useState("");
  const md = useMediaQuery({ query: "(max-width: 991px)" });

  const handleClose = () => {
    dispatch(setToggleValue(false));
  };

  const handleActiveNavItem = (path, id) => {
    // if (
    //   location.pathname
    //     .split("-")
    //     .join("")
    //     .includes(path?.split("-").join("")) ||
    //   isParentId === id
    // ) {
    if (location.pathname === path || isParentId === id) {
      return true;
    } else {
      return false;
    }
  };

  const toggleNavItem = (id) => {
    if (isParentId === id) {
      setIsParentId("");
    } else {
      setIsParentId(id);
    }
  };

  useEffect(() => {
    navItemsData.forEach((ele) => {
      const navList = ele.navList;
      const mainId = ele.id;
      for (let item of navList) {
        if (item.path === location.pathname) {
          setNavListParentId(item.parentId);
        }
        if (item.subItems && item.subItems.length > 0) {
          for (let subItem of item.subItems) {
            if (subItem.path === location.pathname) {
              setNavListParentId(mainId);
              setIsParentId(subItem.parentId);
            }
          }
        }
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    if (md) {
      dispatch(setToggleValue(false));
    }
  }, [location.pathname, md, dispatch]);

  return (
    <>
      <div
        onMouseOver={() => isToggle && setIsMouseOver(true)}
        onMouseOut={() => isToggle && setIsMouseOver(false)}
        className={`position-relative z-2 transition-width d-none d-lg-block side-navbar ${
          isToggle ? "close" : "open"
        }`}
      >
        <div
          className={`position-sticky h-100 hover-open transition-width top-0 start-0`}
        >
          <div
            className={`bg-color-primary border-end border-color-white-15 side-bar vh-100 overflow-y-auto overflow-scroll-design position-sticky w-100 start-0 top-0`}
          >
            <Link
              className={`position-sticky z-2 top-0`}
              to={ADMIN.DASHBOARD.path}
            >
              <div className="bg-color-primary logo-bar h-60 d-flex align-items-center justify-content-center border-bottom border-color-white-15">
                {isToggle && !isMouseOver ? (
                  <img
                    src={
                      "https://pms.logicgoinfotech.com/static/media/logo-sm-light.93f7aae5c96f8493d953bbaf80f9dc48.svg"
                    }
                    alt="logo"
                    className="h-40 w-auto d-block mx-auto"
                  />
                ) : (
                  <img
                    src={"/assets/common/ALUKAS%20&amp;%20CO.webp"}
                    alt="logo"
                    className="logo d-block mx-auto"
                  />
                )}
              </div>
            </Link>

            <div className={`position-relative`}>
              <ul
                className={`${
                  isToggle && !isMouseOver
                    ? "text-center px-2 pt-3"
                    : "px-3 pt-3"
                } p-0 pb-4 m-0 side-navbar-items`}
              >
                {user?.role &&
                  navItemsData.map((ele) => {
                    const mainId = ele.id;
                    const title = ele.title;
                    const filterData = ele.navList?.filter((item) => {
                      if (item.role?.length > 0) {
                        if (item.role.includes(user?.role)) {
                          return true;
                        }
                        return false;
                      } else if (item.subItems?.length > 0) {
                        item.subItems = item.subItems.filter((value) => {
                          if (
                            value.role?.length === 0 ||
                            (user?.role && value.role.includes(user?.role))
                          ) {
                            return true;
                          }
                          return false;
                        });
                        return item.subItems.length > 0;
                      } else {
                        return true;
                      }
                    });
                    return (
                      <React.Fragment key={mainId}>
                        <div
                          className={`${
                            isToggle && !isMouseOver ? "pt-2" : "ps-3 pt-2"
                          } text-truncate sidebar-nav-label text-uppercase fs-12 lh-base fw-semibold text-color-secondary mb-1`}
                        >
                          {isToggle && !isMouseOver ? (
                            // <i
                            //   className={`fs-8 circle fw-bold ${
                            //     navListParentId === mainId
                            //       ? "ri-circle-fill"
                            //       : "ri-circle-line opacity-60"
                            //   } text-white`}
                            // ></i>
                            <span
                              className={`opacity-75 ${
                                navListParentId === mainId ? "d-block pb-2" : ""
                              }`}
                            >
                              ...
                            </span>
                          ) : (
                            title
                          )}
                        </div>
                        {filterData.map((ele) => {
                          const id = ele.id;
                          const label = ele.label;
                          const icon = ele.icon;
                          const path = ele.path;
                          const subItems = ele.subItems;
                          const isActive = handleActiveNavItem(path, id);
                          const role = ele.role;
                          return (
                            <div
                              className={`nav-item-div position-relative ${
                                isToggle && !isMouseOver ? "" : "pb-2"
                              }`}
                              key={id}
                            >
                              <Link onClick={() => toggleNavItem(id)} to={path}>
                                <li
                                  className={`transition-background-color nav-list ${
                                    isActive ? "bg-color-secondary-40" : ""
                                  } ${
                                    isToggle && !isMouseOver
                                      ? "hw-45 d-flex align-items-center justify-content-center mb-1"
                                      : "h-40 lh-40"
                                  } br-8 px-0 text-white text-capitalize mx-auto`}
                                >
                                  <div
                                    className={`d-flex align-items-center ${
                                      isToggle && !isMouseOver
                                        ? "justify-content-center"
                                        : "justify-content-between ps-3 pe-2"
                                    } transition-opacity ${
                                      isActive ? "" : "opacity-60"
                                    }`}
                                  >
                                    <div className="overflow-hidden">
                                      <i
                                        className={`${
                                          isToggle && !isMouseOver
                                            ? "fs-18 fw-semibold"
                                            : "fs-14 fw-semibold"
                                        }  ${icon}`}
                                      ></i>
                                      {isToggle && !isMouseOver ? null : (
                                        <span
                                          className={`text-truncate w-25 fs-15 fw-normal ms-2`}
                                        >
                                          {label}
                                        </span>
                                      )}
                                    </div>
                                    {subItems?.length > 0 &&
                                    ((isToggle && isMouseOver) || !isToggle) ? (
                                      <div
                                        className={`transition-transform-1s arrow ${
                                          isActive ? "rotate-90" : ""
                                        }`}
                                      >
                                        <i
                                          className={`fs-16 fw-semibold ri-arrow-right-s-line`}
                                        ></i>
                                      </div>
                                    ) : null}
                                  </div>
                                </li>
                              </Link>
                              <div
                                className={
                                  isToggle && !isMouseOver
                                    ? "d-none"
                                    : "d-block"
                                }
                              >
                                <Collapse in={isParentId === id}>
                                  <ul className={`ps-4 m-0`}>
                                    {subItems && subItems?.length > 0
                                      ? subItems.map((ele) => {
                                          const id = ele.id;
                                          const subLabel = ele.label;
                                          const subPath = ele.path;
                                          const isPathMatch =
                                            location.pathname === subPath;
                                          return (
                                            <Link to={subPath} key={id}>
                                              <li
                                                className={`${
                                                  isPathMatch ? "" : "nav-list"
                                                } h-32 lh-32 my-1 transition-background-color fs-14 px-2 br-8 text-white text-capitalize`}
                                              >
                                                <div
                                                  className={`d-flex align-items-center justify-content-between transition-opacity ${
                                                    isPathMatch
                                                      ? ""
                                                      : "opacity-60"
                                                  }`}
                                                >
                                                  <div
                                                    className={`text-truncate`}
                                                  >
                                                    <div
                                                      className={`d-flex align-items-center gap-12`}
                                                    >
                                                      <i
                                                        className={`fs-8 circle fw-normal ${
                                                          isPathMatch
                                                            ? "ri-circle-fill"
                                                            : "ri-circle-line"
                                                        }`}
                                                      ></i>
                                                      <span>{subLabel}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </Link>
                                          );
                                        })
                                      : null}
                                  </ul>
                                </Collapse>
                              </div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        className={`d-block d-lg-none ${
          isDarkMode && "dark-layout"
        } sidebar-off-canvas`}
        show={md && isToggle}
        onHide={handleClose}
      >
        <Offcanvas.Body
          className={`position-relative z-1 p-0 filters-canvas-options pb-0`}
        >
          <Button
            className={`bg-transparent p-0 border-0 position-absolute end-0 top-0 z-2 hw-25 rounded-circle d-flex align-items-center justify-content-center me-3 mt-3 text-color-titan-white`}
            color="transparent"
            onClick={handleClose}
          >
            <i className="ri-close-line fs-20 fw-semibold"></i>
          </Button>
          <div className={`side-navbar`}>
            <div
              className={`position-sticky h-100 hover-open transition-width top-0 start-0`}
            >
              <div
                className={`bg-color-primary side-bar vh-100 overflow-y-auto overflow-scroll-design position-sticky w-100 start-0 top-0`}
              >
                <Link
                  className={`position-sticky z-2 top-0`}
                  to={ADMIN.DASHBOARD.path}
                >
                  <div className="bg-color-primary logo-bar h-60 d-flex align-items-center justify-content-center border-bottom border-color-white-15">
                    <img
                      src={"/assets/common/ALUKAS%20&amp;%20CO.webp"}
                      alt="logo"
                      className="logo d-block mx-auto"
                    />
                  </div>
                </Link>

                <div className={`position-relative`}>
                  <ul className={`px-3 pt-3 p-0 pb-4 m-0 side-navbar-items`}>
                    {navItemsData.map((ele) => {
                      const mainId = ele.id;
                      const title = ele.title;
                      const navList = ele.navList;
                      const filterData = ele.navList?.filter((item) => {
                        if (
                          // user?.role &&
                          item.role?.length > 0
                          // item.role.includes(user?.role)
                        ) {
                          if (item.role.includes(user?.role)) {
                            return true;
                          }
                          return false;
                        } else if (item.subItems?.length > 0) {
                          item.subItems = item.subItems.filter((value) => {
                            if (
                              user?.role &&
                              value.role?.length > 0 &&
                              value.role.includes(user?.role)
                            ) {
                              return true;
                            }
                            return false;
                          });
                          return item.subItems.length > 0;
                        } else {
                          return true;
                        }
                      });
                      return (
                        <React.Fragment key={mainId}>
                          <div
                            className={`ps-3 text-truncate sidebar-nav-label text-uppercase fs-12 lh-base fw-semibold text-color-secondary mb-1 pt-2`}
                          >
                            {title}
                          </div>
                          {filterData.map((ele) => {
                            const id = ele.id;
                            const label = ele.label;
                            const icon = ele.icon;
                            const path = ele.path;
                            const subItems = ele.subItems;
                            const isActive = handleActiveNavItem(path, id);
                            const role = ele.role;
                            const isSubItems = subItems
                              ? subItems?.length > 0
                              : true;
                            return (
                              <div
                                className={`nav-item-div position-relative pb-2`}
                                key={id}
                              >
                                {isSubItems && (
                                  <Link
                                    onClick={() => toggleNavItem(id)}
                                    to={path}
                                  >
                                    <li
                                      className={`${
                                        isActive ? "bg-color-secondary-40" : ""
                                      } transition-background-color nav-list h-40 lh-40 br-8 px-0 text-white text-capitalize`}
                                    >
                                      <div
                                        className={`${
                                          isActive ? "" : "opacity-60"
                                        } d-flex align-items-center justify-content-between ps-3 pe-2
                                      transition-opacity`}
                                      >
                                        <div className="overflow-hidden">
                                          <i
                                            className={`fs-14 fw-semibold ${icon}`}
                                          ></i>
                                          <span
                                            className={`w-25 fs-15 fw-normal ms-2`}
                                          >
                                            {label}
                                          </span>
                                        </div>
                                        {subItems && subItems?.length > 0 ? (
                                          <div
                                            className={`arrow ${
                                              isActive ? "rotate-90" : ""
                                            } transition-transform-1s`}
                                          >
                                            <i
                                              className={`fs-16 fw-semibold ri-arrow-right-s-line`}
                                            ></i>
                                          </div>
                                        ) : null}
                                      </div>
                                    </li>
                                  </Link>
                                )}
                                <div>
                                  <Collapse in={isParentId === id}>
                                    <ul className={`ps-4 m-0`}>
                                      {subItems && subItems?.length > 0
                                        ? subItems.map((ele) => {
                                            const id = ele.id;
                                            const subLabel = ele.label;
                                            const subPath = ele.path;
                                            const isPathMatch =
                                              location.pathname === subPath;
                                            return (
                                              <Link to={subPath} key={id}>
                                                <li
                                                  className={`${
                                                    isPathMatch
                                                      ? ""
                                                      : "nav-list"
                                                  } h-32 lh-32 my-1 transition-background-color fs-14 px-2 br-8 text-white text-capitalize`}
                                                >
                                                  <div
                                                    className={`d-flex align-items-center justify-content-between transition-opacity ${
                                                      isPathMatch
                                                        ? ""
                                                        : "opacity-60"
                                                    }`}
                                                  >
                                                    <div
                                                      className={`text-truncate`}
                                                    >
                                                      <div
                                                        className={`d-flex align-items-center gap-12`}
                                                      >
                                                        <i
                                                          className={`fs-8 circle fw-normal ${
                                                            isPathMatch
                                                              ? "ri-circle-fill"
                                                              : "ri-circle-line"
                                                          }`}
                                                        ></i>
                                                        <span>{subLabel}</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </li>
                                              </Link>
                                            );
                                          })
                                        : null}
                                    </ul>
                                  </Collapse>
                                </div>
                              </div>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
