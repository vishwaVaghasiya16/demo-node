import { Card, CardBody, CardHeader, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import { UPDATE } from "../../../routes/AdminRoutes";
import { Link } from "react-router-dom";
import defaultProductImg from "/assets/admin/defaultProduct.webp";
import Badge from "../../../components/admin/badge/Badge";
import PaginationDiv from "../../../components/admin/pagination/PaginationDiv";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const BestSellingProductCard = () => {
  const { data } = useSelector((store) => store.Dashboard);
  const [active, setActive] = useState(1);
  const [limit] = useState(5);
  const [bestSaleProductArray, setBestSaleProductArray] = useState([]);
  const ADMIN = Admin();
  const xl = useMediaQuery({
    query: "(min-width: 1200px) and (max-width: 1350px)",
  });

  const handleSearch = (input) => {
    const { value } = input;

    const searchedDataArray = data?.bestSellingProducts?.filter((ele) => {
      return (
        ele.title.toLowerCase().includes(value.toLowerCase()) ||
        ele.sku.toLowerCase().includes(value.toLowerCase())
      );
    });
    setBestSaleProductArray([...searchedDataArray]);
  };

  const activeHandler = (page) => {
    setActive(page);
  };

  useEffect(() => {
    if (data && data?.bestSellingProducts?.length > 0) {
      const array = data?.bestSellingProducts;
      setBestSaleProductArray([...array]);
    }
  }, [data]);

  return (
    <Card
      className={`min-h-484 lg-h-0 bg-white border common-border-color br-5 p-3`}
    >
      <CardHeader
        className={`border-0 bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-2 p-0`}
      >
        <div className={`heading`}>
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            best selling products
          </span>
        </div>
        <Col
          xs={12}
          sm={5}
          md={4}
          xl={5}
          xxl={4}
          className={`ms-auto ps-sm-1 ps-md-3`}
        >
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
        {/* <div className={`total-count`}>
          <span
            className={`text-capitalize text-color-secondary fw-normal fs-14 lh-base`}
          >
            Total{" "}
            {data?.totalProductReviews
              ? formatNumber(data?.totalProductReviews)
              : 0}{" "}
            reviews
          </span>
        </div> */}
      </CardHeader>
      <CardBody
        className={`${
          bestSaleProductArray?.length > 0
            ? ""
            : "d-flex align-items-center justify-content-center"
        } p-0`}
      >
        <div
          className={`table-responsive overflow-scroll-design bg-white px-0 mt-3`}
        >
          {bestSaleProductArray && bestSaleProductArray?.length > 0 ? (
            <Table
              className={`align-middle mb-0 table border common-border-color `}
            >
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
                      product name
                    </span>
                  </th>
                  <th
                    className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      price
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
                      order
                    </span>
                  </th>
                  <th
                    className={`w-120px px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                  >
                    <span
                      className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                    >
                      status
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bestSaleProductArray
                  ?.slice(limit * (active - 1), limit * active)
                  ?.map((ele, index) => {
                    const id = ele?._id;
                    const productSlug = ele?.slug;
                    const productId = ele?.sku;
                    const productName = ele?.title;
                    const file = ele?.files?.[0]?.urls;
                    const grandTotal = ele?.grandTotal;
                    const quantity = ele?.quantity;
                    const availability = ele?.availability;
                    const sales = ele?.sales;
                    return (
                      <tr key={id || index}>
                        <td
                          className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <Link
                            to={`${ADMIN.PRODUCT.path}${UPDATE}/${productSlug}`}
                          >
                            <span
                              className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              #{productId}
                            </span>
                          </Link>
                        </td>
                        <td
                          className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <Link
                            to={`${ADMIN.PRODUCT.path}${UPDATE}/${productSlug}`}
                          >
                            <div
                              className={`w-fit d-flex align-items-center gap-2`}
                            >
                              <div
                                className={`w-40 h-40 border common-border-color br-5 overflow-hidden`}
                              >
                                <img
                                  src={
                                    file && file.includes(".mp4")
                                      ? defaultProductImg
                                      : file
                                  }
                                  alt={`product-${productId}`}
                                  className={`w-100 h-100 object-fit-cover`}
                                />
                              </div>
                              <div>
                                <span
                                  className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                >
                                  {productName}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {grandTotal}
                          </span>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {quantity}
                          </span>
                        </td>
                        <td
                          className={`bg-white w-500px px-3 py-10 border-bottom border-end common-border-color`}
                        >
                          <span
                            className={`truncate-line-1 fs-14 lh-base fw-medium text-color-secondary`}
                          >
                            {sales}
                          </span>
                        </td>
                        <td
                          className={`bg-white px-3 py-10 border-bottom common-border-color`}
                        >
                          <Badge
                            className={`w-100`}
                            text={availability ? "in stock" : "out of stock"}
                            type={availability ? "success" : "danger"}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
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
      </CardBody>
      {bestSaleProductArray?.length > 0 ? (
        <div className={`pt-3`}>
          <PaginationDiv
            active={active}
            limit={limit}
            totalItems={bestSaleProductArray?.length}
            size={Math.ceil(bestSaleProductArray?.length / limit)}
            step={1}
            icons={true}
            onlyPagination={xl ? true : false}
            onClickHandler={(value) => activeHandler(value)}
          />
        </div>
      ) : null}
    </Card>
  );
};

export default BestSellingProductCard;
