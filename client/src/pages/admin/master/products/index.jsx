import { Card, CardBody, CardHeader, Col, Row, Table } from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useEffect, useState } from "react";
import { itemLimitEnum } from "../../../../helpers/enum";
import { useDispatch, useSelector } from "react-redux";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import { getProductByAdminThunk } from "../../../../store/actions";
import Badge from "../../../../components/admin/badge/Badge";
import useClickOutside from "../../../../components/admin/useClickOutside";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import ProductTableLoader from "./ProductTableLoader";
import { CREATE, UPDATE, VARIANT } from "../../../../routes/AdminRoutes";
import { setClearProductDetails } from "../../../../store/productDetails/slice";
import { currencyHandler } from "../../../../helpers/currencyHandler";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productPaginationData, loading } = useSelector(
    (store) => store.Products
  );
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    // availability: "",
    search: "",
    limit: 10,
  });
  const [clickedMenuId, setClickedMenuId] = useState();
  const ADMIN = Admin();

  useClickOutside([".menu-popup-parent", ".menu-popup"], () => {
    setClickedMenuId(null);
  });

  const handleProductDetailsPage = (slug) => {
    dispatch(setClearProductDetails());
    navigate(`${ADMIN.PRODUCT.path}${UPDATE}/${slug}`);
  };

  const handleVarianPageRedirect = (slug, id) => {
    navigate(`${ADMIN.PRODUCT.path}/${slug}${VARIANT}`, { state: { id } });
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { search, availability } = searchQuery;
    if (search === "" && (!availability || availability === "")) {
      setActive(1);
      dispatch(getProductByAdminThunk({ limit: searchQuery.limit }));
    } else {
      const delayDebounceFn = setTimeout(() => {
        if (availability !== "" || search !== "") {
          setActive(1);
          if (availability === "true" || availability === "false") {
            dispatch(getProductByAdminThunk(searchQuery));
          } else {
            delete searchQuery.availability;
            dispatch(getProductByAdminThunk(searchQuery));
          }
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    const filterSearchQuery = Object.fromEntries(
      Object.entries(searchQuery).filter(([_, value]) => value !== "")
    );
    setActive(page);
    dispatch(
      getProductByAdminThunk({
        page,
        limit: searchQuery.limit,
        ...filterSearchQuery,
      })
    );
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="master" pageTitle="product" />
      <Card
        className={`border common-border-color bg-transparent common-box-shadow br-5 overflow-hidden`}
      >
        {/* <CardHeader
          className={`p-3 border-bottom common-border-color bg-white`}
        >
          <div className={`table-title`}>
            <span
              className={`text-capitalize text-color-primary fs-16 fw-semibold lh-base`}
            >
              products list table
            </span>
          </div>
        </CardHeader> */}
        <CardBody className={`p-0`}>
          <Row
            className={`bg-white align-items-center filter-options p-3 pb-0 border-bottom common-border-color`}
          >
            <Col lg={6} xxl={5}>
              <Row className={`px-1`}>
                <Col xs={12} sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={limit}
                      name="limit"
                      onChange={(e) => {
                        setActive(1);
                        handleSearch(e.target);
                      }}
                    >
                      {itemLimitEnum?.map((item, key) => {
                        return (
                          <option key={key} value={item}>
                            Show {item} item
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Col>
                <Col xs={12} sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`text-capitalize fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={roleSelected}
                      name="availability"
                      onChange={(e) => handleSearch(e.target)}
                    >
                      <option value={""}>select status</option>
                      <option value={true}>in stock</option>
                      <option value={false}>out of stock</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} xxl={5} className="ms-auto">
              <Row className={`px-1 pe-0 justify-content-end`}>
                <Col sm={6} className={`px-2 mb-3`}>
                  <div
                    className={`bg-white h-40 px-3 d-flex align-items-center border common-border-color br-5 overflow-hidden`}
                  >
                    <i className="ri-search-line search-icon responsive fs-16 text-color-primary text-opacity-75 fw-medium"></i>
                    <div className="search-box w-100">
                      <input
                        type="text"
                        name="search"
                        className={`bg-transparent placeholder-secondary focus-border-none form-control border-none ps-2 responsive fs-14 placeholder-fs-14 text-black text-color-primary`}
                        placeholder="Search..."
                        onChange={(e) => {
                          handleSearch(e.target);
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col className={`col-lg-auto px-2 mb-3`}>
                  <div
                    className={`admin-primary-btn-div w-auto px-md-2 ps-md-0`}
                  >
                    <Link
                      onClick={() => dispatch(setClearProductDetails())}
                      to={!loading && `${ADMIN.PRODUCT.path}${CREATE}`}
                      className={`text-center admin-primary-btn d-block ms-auto fs-15 fw-medium`}
                    >
                      <i className="ri-add-circle-line fs-16"></i> add product
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* ======================
              Table Design Start 
          =======================*/}
          <div
            className={`table-responsive overflow-scroll-design bg-white px-0`}
          >
            {productList && productList.length > 0 ? (
              <Table className={`align-middle mb-0 table`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        sku ID
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        product
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        description
                      </span>
                    </th>
                    <th
                      className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end  common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        isDraft
                      </span>
                    </th>
                    <th
                      className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        quantity
                      </span>
                    </th>
                    <th
                      className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        inStock
                      </span>
                    </th>
                    <th
                      className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        sales
                      </span>
                    </th>
                    <th
                      className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        total cost
                      </span>
                    </th>
                    <th
                      className={`w-85px px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                    >
                      <span
                        className={`fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        actions
                      </span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <ProductTableLoader />
                ) : (
                  <tbody>
                    {productList.map((ele, index) => {
                      const id = ele?._id;
                      const sku = ele?.sku;
                      const title = ele?.title;
                      const description = ele?.description;
                      const grandTotal = ele?.grandTotal;
                      const isDraft = ele?.isDraft;
                      const availability = ele?.availability;
                      const quantity = ele?.quantity;
                      const hasVariant = ele?.hasVariant;
                      const slug = ele?.slug;
                      const sales = ele?.sales;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              onClick={() => handleProductDetailsPage(slug)}
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {sku}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              onClick={() => handleProductDetailsPage(slug)}
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {title}
                            </span>
                          </td>
                          <td
                            className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {description}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Badge
                              text={isDraft ? "yes" : "no"}
                              type={isDraft ? "success" : "danger"}
                            />
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {quantity || 0}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <Badge
                              text={availability ? "yes" : "no"}
                              type={availability ? "success" : "danger"}
                            />
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {sales || 0}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {currencyHandler(grandTotal) || 0}
                            </span>
                          </td>
                          <td
                            className={`w-fit bg-white px-3 py-10 border-bottom common-border-color`}
                          >
                            <ToggleMenu
                              onClick={() => setClickedMenuId(id)}
                              isOpen={id == clickedMenuId}
                              rootClass={"tbody"}
                            >
                              {hasVariant && (
                                <p
                                  className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                  onClick={() =>
                                    handleVarianPageRedirect(slug, id)
                                  }
                                >
                                  Variant
                                </p>
                              )}
                              <p
                                className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                                onClick={() => handleProductDetailsPage(slug)}
                              >
                                Edit
                              </p>
                            </ToggleMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
            ) : (
              <div className={`mx-auto`}>
                <DynamicNoData
                  icon="odavpkmb"
                  title="Oops ! No Any Products Yet !"
                  subTitle="Stay alert for incoming products soon !"
                />
              </div>
            )}
          </div>
          {productPaginationData?.totalItems > 0 && !loading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={Number(searchQuery.limit)}
                totalItems={productPaginationData?.totalItems}
                size={productPaginationData?.totalPages}
                step={1}
                onClickHandler={(value) => activeHandler(value)}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductsTable;
