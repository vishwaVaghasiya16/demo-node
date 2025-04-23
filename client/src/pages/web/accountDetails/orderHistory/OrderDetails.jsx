import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../../../store/actions";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../../../components/web/header/PageHeader";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
  getMomentDate,
  getMomentTime,
} from "../../../../components/common/MomentFun";
import Stepper from "../../cart/Stepper";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import NoRecord from "../../../../components/web/displayMessagePages/NoRecord";
import { CLIENT } from "../../../../routes/routesConstants";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const { data, loading } = useSelector((store) => store.Orders);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const [currentStatus, setCurrentStatus] = useState(0);
  const { id } = useParams();
  const orderStatusEnum = enumsData?.orderStatusEnum;
  const status = data[0]?.status;
  const createdAt = data[0]?.createdAt;
  const subTotal = data[0]?.totalAmount;
  const savedAmount = data[0]?.savedAmount;
  const totalSaving = data[0]?.totalSaving;
  const tax = data[0]?.totalTaxAmount;
  const totalAmount = data[0]?.totalAmount;
  const couponDiscount = data[0]?.couponDiscount || 0;
  const userData = data[0]?.user;
  const shippingAddress = data[0]?.shippingAddress || {};
  const billingAddress = data[0]?.billingAddress || {};
  const isPaid = data[0]?.isPaid;
  const withoutDiscountPrice = data[0]?.withoutDiscountPrice;

  const downloadInvoice = () => {
    const pdfUrl =
      "https://guardianshot.blr1.digitaloceanspaces.com/jewellery/product/415db2f2-3138-498f-a766-7aa382345b89.pdf";
    // const file = new Blob(pdfUrl, { type: "pdf" });
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild("link");
  };

  useEffect(() => {
    switch (status) {
      case orderStatusEnum?.PENDING:
        if (isPaid) {
          setCurrentStatus(1);
        } else {
          setCurrentStatus(0);
        }
        break;
      case orderStatusEnum?.PICKED:
        setCurrentStatus(2);
        break;
      case orderStatusEnum?.PLACED:
        setCurrentStatus(3);
        break;
      case orderStatusEnum?.SHIPPING:
        setCurrentStatus(4);
        break;
      case orderStatusEnum?.DELIVERED:
        setCurrentStatus(5);
        break;
      case orderStatusEnum?.RETURNED:
        setCurrentStatus(0);
        break;
      case orderStatusEnum?.REFUNDED:
        setCurrentStatus(1);
        break;
      default: setCurrentStatus(0)
    }
  }, [data]);

  useEffect(() => {
    if (user?._id && id) {
      dispatch(getOrderThunk({ user: user?._id, orderId: id }));
    }
  }, [user]);

  return (
    <section className="page-content responsive">
      <Container>
        <PageHeader
          title="Home"
          pageTitle="Order History"
          subPageTitle="Order Details"
        />
        {data?.length > 0 && (
          <div>
            <div className="paddingTop">
              <h2 className="text-color-primary text-capitalize fs-26">{`#${id}`}</h2>
              <p className="text-color-secondary fs-14">
                Home &gt; Order History &gt; Order Details &gt; {id} -{" "}
                {getMomentDate(createdAt, "MMMM DD, YYYY")} at{" "}
                {getMomentTime(createdAt)}
              </p>
            </div>
            {orderStatusEnum?.orderStatusEnum?.RETURNED ||
            orderStatusEnum?.orderStatusEnum?.REFUNDED ? (
              <Stepper
                step={currentStatus}
                steps={[orderStatusEnum?.RETURNED, orderStatusEnum?.REFUNDED]}
                className="mt-4"
              />
            ) : (
              <Stepper
                step={currentStatus}
                steps={[
                  orderStatusEnum?.PENDING,
                  "Payment Completed",
                  orderStatusEnum?.PICKED,
                  orderStatusEnum?.PLACED,
                  orderStatusEnum?.SHIPPING,
                  orderStatusEnum?.DELIVERED,
                ]}
                className="mt-4"
              />
            )}

            <div className="mb-4 mt-4">
              <Row>
                <Col xs={12} lg={8}>
                  <div>
                    <h3 className="text-color-primary fs-24">Products</h3>
                    <Table
                      responsive="xxl"
                      bordered
                      className="text-center responsive"
                    >
                      <thead className="">
                        <tr>
                          <td className="bg-color-titan-white fs-14 fw-medium text-color-primary text-center">
                            Product Image
                          </td>
                          <td className="bg-color-titan-white fs-14 fw-medium text-color-primary text-center">
                            Product Name
                          </td>
                          <td className="bg-color-titan-white fs-14 fw-medium text-color-primary text-center">
                            Quantity
                          </td>
                          <td className="bg-color-titan-white fs-14 fw-medium text-color-primary text-center">
                            Price
                          </td>
                          <td className="bg-color-titan-white fs-14 fw-medium text-color-primary text-center">
                            Discount
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data[0]?.items?.length > 0 &&
                          data[0]?.items?.map((item, index) => {
                            const thumbnail =
                              (item?.variant?.files?.length > 0 &&
                                item?.variant?.files[0]?.urls) ||
                              (item?.product?.files?.length > 0 &&
                                item?.product?.files[0]?.urls) ||
                              "";
                            const title =
                              item?.product?.title || item?.variant?.title;
                            const qty = item?.quantity;
                            const price = item?.unitPrice;
                            const savedAmount = item?.savedAmount;
                            let redirecTo;
                            if (item?.product) {
                              redirecTo = item?.product?.slug;
                            } else {
                              redirecTo = `${item?.variant?.product?.slug}?variant=${item?.variant?.slug}`;
                            }
                            return (
                              <tr key={index}>
                                <td>
                                  <Link
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                    target="_blank"
                                  >
                                    <div className="order-img mx-auto">
                                      <img
                                        src={thumbnail}
                                        className="w-100 h-100 br-5 object-fit-cover"
                                        alt=""
                                      />
                                    </div>
                                  </Link>
                                </td>
                                <td className="align-middle text-capitalize">
                                  <Link
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                    target="_blank"
                                  >
                                    <p className="p-0 m-0 text-color-primary fw-medium fs-14">
                                      {title}
                                    </p>
                                  </Link>
                                </td>
                                <td className="align-middle text-capitalize ">
                                  <p className="p-0 m-0 text-color-primary fw-medium fs-14">
                                    {qty}
                                  </p>
                                </td>
                                <td className="align-middle text-capitalize">
                                  <p className="p-0 m-0 text-color-primary fw-medium fs-14">
                                    {currencyHandler(price)}
                                  </p>
                                </td>
                                <td className="align-middle text-capitalize">
                                  <p className="p-0 m-0 text-color-primary fw-medium fs-14">
                                    {currencyHandler(savedAmount)}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col xs={12} lg={4}>
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="text-color-primary fs-24">Payment</h3>
                      {isPaid && !enumsData?.orderStatusEnum?.REFUNDED && (
                        <Button
                          onClick={downloadInvoice}
                          className="bg-color-titan-white text-color-primary border-0 fs-14 fw-medium mb-2"
                        >
                          {" "}
                          <span>
                            <i className="ri-download-2-line fs-16 me-1"></i>
                          </span>{" "}
                          Download Invoice
                        </Button>
                      )}
                    </div>
                    <div className="mb-3 mb-md-4">
                      <div className="border border-color-light-gray br-10 overflow-hidden">
                        <h6 className="m-0 bg-color-titan-white w-100 p-3 fs-14 text-color-primary text-center">
                          Order Summery
                        </h6>
                        <div className=" p-3">
                          <ul className="border-bottom m-0 p-0 border-color-light-gray">
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                Cart subTotal :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                {currencyHandler(withoutDiscountPrice)}
                              </p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                You Save :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                -{currencyHandler(savedAmount)}
                              </p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                Coupon Discount :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                -{currencyHandler(couponDiscount)}
                              </p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                Delivery Charges :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                Free
                              </p>
                            </li>
                          </ul>
                          <ul className="m-0 p-0 mt-2">
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                Total Saving :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                {currencyHandler(totalSaving)}
                              </p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-2 text-color-secondary fs-14">
                                Tax :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                {currencyHandler(tax)}
                              </p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                              <p className="mb-0 text-color-secondary fs-14">
                                Total Amount (Inc of all taxes) :
                              </p>
                              <p className="mb-0 text-color-primary fs-14 fw-medium">
                                {currencyHandler(totalAmount)}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-color-primary fs-24">
                      Customer Information
                    </h3>
                    <div className="mb-3 mb-md-4">
                      <div className="border border-color-light-gray br-10 overflow-hidden">
                        <h6 className="m-0 bg-color-titan-white w-100 p-3 fs-14 text-color-primary text-center">
                          General Information
                        </h6>
                        <div className=" p-3">
                          <ul className="m-0 p-0">
                            <li className="d-flex align-items-center gap-2">
                              <p className="mb-2 text-color-secondary fs-14">
                                Name :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                {userData?.username}
                              </p>
                            </li>
                            <li className="d-flex align-items-center gap-2">
                              <p className="mb-2 text-color-secondary fs-14">
                                E-mail :
                              </p>
                              <p className="mb-2 text-color-primary fs-14 fw-medium">
                                {userData?.email}
                              </p>
                            </li>
                            {/* <li className="d-flex align-items-center justify-content-between">
                          <p className="mb-2 text-color-secondary fs-14">
                            Phone :
                          </p>
                          <p className="mb-2 text-color-primary fs-14 fw-medium">
                            -{currencyHandler(couponDiscount)}
                          </p>
                        </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {Object?.keys(shippingAddress)?.length > 0 && (
                      <div className="mb-3 mb-md-4">
                        <div className="border border-color-light-gray br-10 overflow-hidden">
                          <h6 className="m-0 bg-color-titan-white w-100 p-3 fs-14 text-color-primary text-center">
                            Shipping Address
                          </h6>
                          <div className=" p-3">
                            <ul className="m-0 p-0">
                              <li className="">
                                <p className="mb-2 text-color-primary text-capitalize fs-14 fw-medium">
                                  {shippingAddress?.addressLine1 +
                                    ", " +
                                    shippingAddress?.city +
                                    ", " +
                                    shippingAddress?.state +
                                    ", " +
                                    shippingAddress?.postalCode}
                                </p>
                              </li>
                              <li className="d-flex align-items-center gap-2">
                                <p className="mb-2 text-color-secondary fs-14">
                                  Phone :
                                </p>
                                <p className="mb-2 text-color-primary fs-14 fw-medium">
                                  {shippingAddress?.phoneNumber}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {Object?.keys(billingAddress)?.length > 0 && (
                      <div className="mb-3 mb-md-4">
                        <div className="border border-color-light-gray br-10 overflow-hidden">
                          <h6 className="m-0 bg-color-titan-white w-100 p-3 fs-14 text-color-primary text-center">
                            Billing Address
                          </h6>
                          <div className=" p-3">
                            <ul className="m-0 p-0">
                              <li className="">
                                <p className="mb-2 text-color-primary text-capitalize fs-14 fw-medium">
                                  {billingAddress?.addressLine1 +
                                    ", " +
                                    billingAddress?.city +
                                    ", " +
                                    billingAddress?.state +
                                    ", " +
                                    billingAddress?.postalCode}
                                </p>
                              </li>
                              <li className="d-flex align-items-center gap-2">
                                <p className="mb-2 text-color-secondary fs-14">
                                  Phone :
                                </p>
                                <p className="mb-2 text-color-primary fs-14 fw-medium">
                                  {billingAddress?.phoneNumber}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {!loading && !data?.length > 0 && (
          <div className={`paddingBottom mb-3 mb-md-0 mt-lg-5`}>
            <NoRecord
              title="No order found !"
              message="Order not valid. Start shopping now to fill it up with your favorite items !"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default OrderDetails;
