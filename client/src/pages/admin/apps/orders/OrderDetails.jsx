import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllOrdersAdminThunk } from "../../../../store/actions";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import { capitalize } from "lodash";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import {
  getMomentDate,
  getMomentTime,
} from "../../../../components/common/MomentFun";
import { Col, Row, Table } from "react-bootstrap";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import OrderDetailsTableLoader from "./OrderDetailsTableLoader";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import defaultProductImg from "/assets/admin/defaultProduct.webp";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { UPDATE } from "../../../../routes/AdminRoutes";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((store) => store.Orders);
  const orderDetails = orders[0];
  const { orderid } = useParams();
  const ADMIN = Admin();

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk({ orderId: orderid }));
  }, [orderid, dispatch]);

  return (
    <>
      {orders && orders?.length > 0 ? (
        <div className={`py-20`}>
          <BreadCrumb
            defaultTitle={`#${orderDetails.orderId} - ${getMomentDate(
              orderDetails.createdAt,
              "MMMM, DD YYYY"
            )} ${"at"} ${getMomentTime(orderDetails.createdAt)}`}
            title="apps"
            pageTitle="orders"
            subPageTitle="order details"
          />
          <Row>
            <Col lg={9} className={`mb-3 mb-lg-0`}>
              <div className={`br-5 bg-white border common-border-color p-3`}>
                {/* ======================
                  Table Design Start 
                ======================*/}
                <div
                  className={`table-responsive border-bottom-0 border common-border-color overflow-scroll-design bg-white px-0`}
                >
                  {orders && orderDetails?.items?.length > 0 ? (
                    <Table className={`align-middle mb-0`}>
                      <thead>
                        <tr>
                          <th
                            className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                            >
                              product id
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
                            className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                            >
                              discount
                            </span>
                          </th>
                          <th
                            className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                            >
                              quantity
                            </span>
                          </th>
                          <th
                            className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                          >
                            <span
                              className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                            >
                              total
                            </span>
                          </th>
                        </tr>
                      </thead>
                      {loading ? (
                        <OrderDetailsTableLoader />
                      ) : (
                        <tbody>
                          {orders && orderDetails?.items?.length > 0
                            ? orderDetails?.items.map((ele, index) => {
                                const id = ele?._id;
                                const productId =
                                  ele?.product?.sku || ele?.variant?.slug;
                                const productSlug =
                                  ele?.product?.slug || ele?.variant?.slug;
                                const url =
                                  ele?.product?.files[0]?.urls ||
                                  ele?.variant?.files[0]?.urls;
                                const productName =
                                  ele?.product?.title || ele?.variant?.title;
                                const quantity = ele?.quantity;
                                const discountValue =
                                  ele?.savedAmount / quantity;
                                const subTotalPrice =
                                  ele?.withoutDiscountPrice / quantity;
                                const totalPrice = ele?.price;
                                const redirectUrl = ele?.variant
                                  ? ADMIN.VARIANT.path +
                                    UPDATE +
                                    "/" +
                                    productSlug
                                  : ADMIN.PRODUCT.path +
                                    UPDATE +
                                    "/" +
                                    productSlug;
                                return (
                                  <tr key={id || index}>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <Link to={redirectUrl}>
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
                                      <Link to={redirectUrl}>
                                        <div
                                          className={`w-fit d-flex align-items-center gap-2`}
                                        >
                                          <div
                                            className={`wh-35 border common-border-color br-5 overflow-hidden`}
                                          >
                                            <img
                                              src={
                                                url && url.includes(".mp4")
                                                  ? defaultProductImg
                                                  : url
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
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {currencyHandler(
                                          Math.ceil(subTotalPrice)
                                        )}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                                      >
                                        {currencyHandler(
                                          Math.ceil(discountValue)
                                        )}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                      >
                                        {quantity}
                                      </span>
                                    </td>
                                    <td
                                      className={`bg-white px-3 py-10 border-bottom common-border-color`}
                                    >
                                      <span
                                        className={`text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                                      >
                                        {currencyHandler(Math.ceil(totalPrice))}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      )}
                    </Table>
                  ) : (
                    <div className={`mx-auto`}>
                      <DynamicNoData
                        icon="odavpkmb"
                        title="Oops ! No Any Orders Yet !"
                        subTitle="Keep an eye on upcoming orders !"
                      />
                    </div>
                  )}
                </div>
                {/* {ordersPaginationData?.totalItems > 0 && !loading ? (
                  <div className={`p-3 bg-white`}>
                    <PaginationDiv
                      active={active}
                      limit={searchQuery.limit}
                      totalItems={ordersPaginationData?.totalItems}
                      size={ordersPaginationData?.totalPages}
                      step={1}
                      onClickHandler={(value) => activeHandler(value)}
                    />
                  </div>
                ) : null} */}
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <Link
                  to={`${ADMIN.CUSTOMER.path}/${orderDetails?.user?.customerId}`}
                >
                  <div
                    className={`br-5 bg-white border common-border-color p-3 mb-3`}
                  >
                    <h6 className="m-0 mb-3 fs-14 text-color-primary">
                      Customer
                    </h6>
                    {orders && orderDetails?.user ? (
                      <div>
                        <div className={`d-flex align-items-center gap-2`}>
                          <div
                            className={`wh-35 border common-border-color rounded-circle overflow-hidden`}
                          >
                            <img
                              src={orderDetails?.user?.url || defaultUserImg}
                              // alt={`user-${id}`}
                              className={`w-100 h-100 object-fit-cover`}
                            />
                          </div>

                          <div>
                            {/* <span
                          className={`d-flex align-items-center gap-2 text-truncate fs-14 lh-base fw-medium text-color-primary text-capitalize`}
                        >
                          {orderDetails?.user?.username}
                        </span> */}
                            <p className="p-0 m-0 fs-14 fw-medium text-start text-capitalize text-color-primary">
                              {orderDetails?.user?.username}
                            </p>
                            <p className="p-0 m-0 fs-14 fw-normal text-color-secondary text-start">
                              {orderDetails?.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`mx-auto mt-3`}>
                        <DynamicNoData
                          icon="bgebyztw"
                          title="No Customer Details Provided !"
                          subTitle={`The customer hasn't provided any details. !`}
                        />
                      </div>
                    )}
                  </div>
                </Link>
                <div
                  className={`br-5 bg-white border common-border-color p-3 mb-3`}
                >
                  <h6 className="m-0 mb-3 mb-lg-4 fs-14 text-color-primary">
                    Order Summery
                  </h6>
                  <div>
                    <ul className="border-bottom common-border-color p-0 pb-3 m-0">
                      <li className="d-flex align-items-center justify-content-between">
                        <p className="mb-2 text-color-secondary fs-14">
                          Cart SubTotal:
                        </p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          {/* {orderDetails?.totalAmount &&
                          orderDetails?.totalSaving
                            ? currencyHandler(
                                orderDetails?.totalAmount +
                                  orderDetails?.totalSaving
                              )
                            : "--"} */}
                          {orderDetails?.withoutDiscountPrice
                            ? currencyHandler(
                                Math.ceil(orderDetails?.withoutDiscountPrice)
                              )
                            : "--"}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <p className="mb-2 text-color-secondary fs-14">
                          You Save:
                        </p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          -
                          {orderDetails?.savedAmount
                            ? currencyHandler(
                                Math.ceil(orderDetails?.savedAmount)
                              )
                            : "--"}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <p className="mb-2 text-color-secondary fs-14">
                          Coupon Discount:
                        </p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          -
                          {orderDetails?.couponDiscount
                            ? currencyHandler(orderDetails?.couponDiscount)
                            : "--"}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <p className="mb-2 text-color-secondary fs-14">
                          Shipping Charges:
                        </p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          Free
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                        <p className="mb-2 text-color-secondary fs-14">Tax:</p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          {orderDetails?.totalTaxAmount
                            ? currencyHandler(orderDetails?.totalTaxAmount)
                            : "--"}
                        </p>
                      </li>
                    </ul>
                    <ul className="m-0 p-0 mt-2">
                      <li className="d-flex align-items-center justify-content-between mt-3">
                        <p className="mb-0 text-color-secondary fs-14">
                          Total Amount (Inc of all taxes):
                        </p>
                        <p className="mb-0 text-color-primary fs-14 fw-medium">
                          {orderDetails?.totalAmount
                            ? currencyHandler(
                                Math.ceil(orderDetails?.totalAmount)
                              )
                            : "--"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`br-5 bg-white border common-border-color p-3 pb-1 mb-3`}
                >
                  <h6 className="m-0 mb-3 mb-lg-4 fs-14 text-color-primary">
                    Shipping Details
                  </h6>
                  {orders && orderDetails?.shippingAddress ? (
                    <div>
                      <ul className="p-0 m-0">
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Phone:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.shippingAddress?.phoneNumber}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Address:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.shippingAddress?.addressLine1}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Pincode:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.shippingAddress?.postalCode}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-capitalize text-color-secondary fs-14">
                            City:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.shippingAddress?.city}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-capitalize text-color-secondary fs-14">
                            State:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.shippingAddress?.state}
                          </p>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className={`mx-auto mt-3`}>
                      <DynamicNoData
                        icon="surcxhka"
                        title="No Shipping Address Provided !"
                        subTitle={`The user hasn't provided a shipping address. !`}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`br-5 bg-white border common-border-color p-3 pb-1`}
                >
                  <h6 className="m-0 mb-3 mb-lg-4 fs-14 text-color-primary">
                    Billing Details
                  </h6>
                  {orders && orderDetails?.billingAddress ? (
                    <div>
                      <ul className="p-0 m-0">
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Phone:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.billingAddress?.phoneNumber}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Address:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.billingAddress?.addressLine1}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            Pincode:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.billingAddress?.postalCode}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-color-secondary fs-14">
                            City:
                          </p>
                          <p className="mb-2 text-capitalize text-color-primary fs-14 fw-medium">
                            {orderDetails?.billingAddress?.city}
                          </p>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <p className="mb-2 text-capitalize text-color-secondary fs-14">
                            State:
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            {orderDetails?.billingAddress?.state}
                          </p>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className={`mx-auto mt-3`}>
                      <DynamicNoData
                        icon="surcxhka"
                        title="No Billing Address Provided !"
                        subTitle={`The user hasn't provided a billing address. !`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div className={`mx-auto mt-3`}>
          <DynamicNoData
            icon="odavpkmb"
            title="Order Details Not Found !"
            subTitle={`We couldn't find any details for the order with ID: ${capitalize(
              orderid
            )}. Please check the order ID and try again. !`}
          />
        </div>
      )}
    </>
  );
};

export default OrderDetails;
