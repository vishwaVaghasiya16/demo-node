import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PageHeader from "../../../../components/web/header/PageHeader";
import Stepper from "../Stepper";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  addAddressThunk,
  getAllOrdersAdminThunk,
  getCartThunk,
  getOrderThunk,
} from "../../../../store/actions";
import { toastError } from "../../../../helpers/toastConfig";
import { RazorPayFunction } from "../../../../helpers/customFunctions";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../../../../routes/routesConstants";

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart, loading } = useSelector((store) => store.Cart);
  const { pendingOrders, orders, data } = useSelector((store) => store.Orders);
  const orderItems = data[0]?.items;
  const { user } = useSelector((store) => store.Auth);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  // const cartItems = cart[0]?.items;
  const orderdata = data[0];
  const subTotal = orderdata?.totalAmount + orderdata?.totalSaving;
  const couponDiscount = orderdata?.couponDiscount || 0;
  const totalSaving = orderdata?.totalSaving;
  const totalAmount = orderdata?.totalAmount;
  const savedAmount = orderdata?.savedAmount;
  const totalTaxAmount = orderdata?.totalTaxAmount;
  const withoutDiscountPrice = orderdata?.withoutDiscountPrice;
  // const subTotal = cart[0]?.subTotal;
  const cartId = cart?.[0]?._id;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  // billingValidation
  const validationSchema = yup.object({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .min(10, "Enter valid number")
      .max(10, "Enter valid number")
      .required("phone number is required"),
    addressLine1: yup.string().required("Address is required"),
    postalCode: yup
      .string()
      .min(6, "Enter valid code")
      .max(6, "Enter valid code")
      .required("Postal Code is required"),
    city: yup.string().required("City name is required"),
    state: yup.string().required("State name is required"),
  });

  const billingValidation = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      postalCode: "",
      city: "",
      state: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await dispatch(
          addAddressThunk({
            id: orderdata?._id,
            values: {
              shippingAddress: shippingValidation.values,
              billingAddress: values,
              sameAsShippingAddress: isChecked,
            },
          })
        );
        if (addAddressThunk.fulfilled.match(result)) {
          RazorPayFunction({
            navigate,
            dispatch,
            user,
            orders: orderdata,
            enumsData,
          });
        }
      } catch (error) {
        console.log("[ERROR]: ", error.message);
        return toastError("Something went wrong! Please try again later.");
      } finally {
        resetForm();
        shippingValidation.resetForm();
        setIsChecked(false);
      }
    },
  });

  useEffect(() => {
    if (
      // pendingOrders.length > 0 &&
      orderdata?.billingAddress &&
      orderdata?.shippingAddress
    ) {
      const billingAddData = orderdata.billingAddress;
      const shippingAddData = orderdata.shippingAddress;
      // billing address validation
      billingValidation.setValues({
        name: billingAddData.name,
        email: billingAddData.email,
        city: billingAddData.city,
        state: billingAddData.state,
        phoneNumber: billingAddData.phoneNumber,
        addressLine1: billingAddData.addressLine1,
        postalCode: billingAddData.postalCode,
      });
      // shipping address validation
      shippingValidation.setValues({
        name: shippingAddData.name,
        email: shippingAddData.email,
        city: shippingAddData.city,
        state: shippingAddData.state,
        phoneNumber: shippingAddData.phoneNumber,
        addressLine1: shippingAddData.addressLine1,
        postalCode: shippingAddData.postalCode,
      });
    }
  }, [data]);

  const shippingValidation = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      postalCode: "",
      city: "",
      state: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (isChecked) {
        try {
          const result = await dispatch(
            addAddressThunk({
              id: orderdata?._id,
              values: {
                shippingAddress: values,
                billingAddress: values,
                sameAsShippingAddress: isChecked,
              },
            })
          );

          if (addAddressThunk.fulfilled.match(result)) {
            RazorPayFunction({
              navigate,
              dispatch,
              user,
              orders: orderdata,
              enumsData,
            });
          }
        } catch (error) {
          console.log("[ERROR]: ", error.message);
          return toastError("Something went wrong! Please try again later.");
        } finally {
          resetForm();
          billingValidation.resetForm();
          setIsChecked(false);
        }
      } else {
        billingValidation.handleSubmit();
      }
    },
  });

  // useEffect(() => {
  //   dispatch(getCartThunk());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllOrdersAdminThunk());
  // }, [dispatch]);

  useEffect(() => {
    if (cartId) {
      dispatch(getOrderThunk({ cart: cartId }));
    } else {
      const getData = async () => {
        const response = await dispatch(getCartThunk());
        if (getCartThunk.fulfilled.match(response)) {
          if (response.payload.data && !response.payload.data?.length > 0) {
            navigate(CLIENT.CART);
          }
        }
      };
      getData();
    }
  }, [cartId, user]);

  return (
    <main className="page-content">
      <Container>
        <PageHeader title="Home" pageTitle="Main Cart" />
        <section className="paddingY">
          <Stepper step={1} />
          <Row className="responsive">
            <Col xs={12} lg={8}>
              {/* ==================================== 
                        shipping details 
                ================================== */}
              <div className="border border-color-light-gray br-5 overflow-hidden">
                <h2 className="bg-color-titan-white p-2 m-0 fs-16 text-center p-0 m-0 text-color-primary">
                  Shipping Details
                </h2>
                <div className="p-3 p-md-4">
                  <Form.Label
                    className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                  >
                    Full Name
                  </Form.Label>
                  <Form.Control
                    name="name"
                    value={shippingValidation.values.name}
                    onChange={shippingValidation.handleChange}
                    onReset={shippingValidation.handleReset}
                    onBlur={shippingValidation.handleBlur}
                    type="text"
                    placeholder="Enter Full Name"
                    className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                  />
                  {shippingValidation.touched.name &&
                  shippingValidation.errors.name ? (
                    <p
                      className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                    >
                      {shippingValidation.errors.name}
                    </p>
                  ) : null}
                  <Row className="mt-3 mt-md-4 flex-column flex-md-row gap-3 gap-md-0">
                    <Col>
                      <Form.Label
                        className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                      >
                        Email Address
                      </Form.Label>
                      <Form.Control
                        name="email"
                        value={shippingValidation.values.email}
                        onChange={shippingValidation.handleChange}
                        onReset={shippingValidation.handleReset}
                        onBlur={shippingValidation.handleBlur}
                        type="text"
                        placeholder="Enter Email Address"
                        className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                      />
                      {shippingValidation.touched.email &&
                      shippingValidation.errors.email ? (
                        <p
                          className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                        >
                          {shippingValidation.errors.email}
                        </p>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label
                        className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                      >
                        Phone Number
                      </Form.Label>
                      <div className="d-flex align-items-center text-color-secondary input-field-bg br-5 fw-normal border form-control-border">
                        <p className="m-0 ps-12 fs-14">+91</p>
                        <Form.Control
                          name="phoneNumber"
                          value={shippingValidation.values.phoneNumber}
                          onChange={shippingValidation.handleChange}
                          onReset={shippingValidation.handleReset}
                          onBlur={shippingValidation.handleBlur}
                          type="number"
                          placeholder=""
                          className={` h-45 border-0  placeholder-fs-14 fs-14 bg-transparent border-none`}
                        />
                      </div>
                      {shippingValidation.touched.phoneNumber &&
                      shippingValidation.errors.phoneNumber ? (
                        <p
                          className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                        >
                          {shippingValidation.errors.phoneNumber}
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                  <Form.Label
                    className={`text-color-primary mt-3 mt-md-4 mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                  >
                    Address
                  </Form.Label>
                  <Form.Control
                    name="addressLine1"
                    value={shippingValidation.values.addressLine1}
                    onChange={shippingValidation.handleChange}
                    onReset={shippingValidation.handleReset}
                    onBlur={shippingValidation.handleBlur}
                    type="text"
                    placeholder="Enter Your Address"
                    className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                  />
                  {shippingValidation.touched.addressLine1 &&
                  shippingValidation.errors.addressLine1 ? (
                    <p
                      className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                    >
                      {shippingValidation.errors.addressLine1}
                    </p>
                  ) : null}
                  <Row className="mt-3 mt-md-4 flex-column flex-md-row gap-3 gap-md-0">
                    <Col>
                      <Form.Label
                        className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                      >
                        Postal Code
                      </Form.Label>
                      <Form.Control
                        name="postalCode"
                        value={shippingValidation.values.postalCode}
                        onChange={shippingValidation.handleChange}
                        onReset={shippingValidation.handleReset}
                        onBlur={shippingValidation.handleBlur}
                        type="number"
                        placeholder="Enter Postal Code"
                        className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                      />
                      {shippingValidation.touched.postalCode &&
                      shippingValidation.errors.postalCode ? (
                        <p
                          className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                        >
                          {shippingValidation.errors.postalCode}
                        </p>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label
                        className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                      >
                        City
                      </Form.Label>
                      <Form.Control
                        name="city"
                        value={shippingValidation.values.city}
                        onChange={shippingValidation.handleChange}
                        onReset={shippingValidation.handleReset}
                        onBlur={shippingValidation.handleBlur}
                        type="text"
                        placeholder="Enter City Name"
                        className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                      />
                      {shippingValidation.touched.city &&
                      shippingValidation.errors.city ? (
                        <p
                          className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                        >
                          {shippingValidation.errors.city}
                        </p>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label
                        className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                      >
                        State
                      </Form.Label>
                      <Form.Control
                        name="state"
                        value={shippingValidation.values.state}
                        onChange={shippingValidation.handleChange}
                        onReset={shippingValidation.handleReset}
                        onBlur={shippingValidation.handleBlur}
                        type="text"
                        placeholder="Enter City Name"
                        className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                      />
                      {shippingValidation.touched.state &&
                      shippingValidation.errors.state ? (
                        <p
                          className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                        >
                          {shippingValidation.errors.state}
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                </div>
              </div>

              {/* ==================================== 
                        check-box
                ================================== */}
              <div className="my-3 my-md-4">
                <div className="d-flex gap-2 align-items-center">
                  <input
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                      if (e.target.checked) {
                        billingValidation.setValues(shippingValidation.values);
                      } else {
                        billingValidation.resetForm();
                      }
                    }}
                    type="checkbox"
                  />
                  <p className="m-0 text-color-secondary fs-14">
                    Billing address same as shipping address
                  </p>
                </div>
                {/* <div className="d-flex gap-2 align-items-center mt-2">
                  <input type="checkbox" />
                  <p className="m-0 text-color-secondary fs-14">
                    Sign up to receive Alukas & Co. emails
                  </p>
                </div> */}
              </div>

              {/* ==================================== 
                        billing details 
                ================================== */}
              {!isChecked ? (
                <div className="border border-color-light-gray br-5 overflow-hidden">
                  <h2 className="bg-color-titan-white p-2 m-0 fs-16 text-center p-0 m-0 text-color-primary">
                    Billing Address
                  </h2>
                  <div className="p-3 p-md-4">
                    <Form.Label
                      className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                    >
                      Full Name
                    </Form.Label>
                    <Form.Control
                      name="name"
                      value={billingValidation.values.name}
                      onChange={billingValidation.handleChange}
                      onReset={billingValidation.handleReset}
                      onBlur={billingValidation.handleBlur}
                      type="text"
                      placeholder="Enter Full Name"
                      className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                    />
                    {billingValidation.touched.name &&
                    billingValidation.errors.name ? (
                      <p
                        className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                      >
                        {billingValidation.errors.name}
                      </p>
                    ) : null}
                    <Row className="mt-3 mt-md-4 flex-column flex-md-row gap-3 gap-md-0">
                      <Col>
                        <Form.Label
                          className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                        >
                          Email Address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          value={billingValidation.values.email}
                          onChange={billingValidation.handleChange}
                          onReset={billingValidation.handleReset}
                          onBlur={billingValidation.handleBlur}
                          type="text"
                          placeholder="Enter Email Address"
                          className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                        />
                        {billingValidation.touched.email &&
                        billingValidation.errors.email ? (
                          <p
                            className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                          >
                            {billingValidation.errors.email}
                          </p>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label
                          className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                        >
                          Phone Number
                        </Form.Label>
                        <div className="d-flex align-items-center text-color-secondary input-field-bg br-5 fw-normal border form-control-border">
                          <p className="m-0 ps-12 fs-14">+91</p>
                          <Form.Control
                            name="phoneNumber"
                            value={billingValidation.values.phoneNumber}
                            onChange={billingValidation.handleChange}
                            onReset={billingValidation.handleReset}
                            onBlur={billingValidation.handleBlur}
                            type="number"
                            placeholder=""
                            className={` h-45 border-0  placeholder-fs-14 fs-14 bg-transparent border-none`}
                          />
                        </div>
                        {billingValidation.touched.phoneNumber &&
                        billingValidation.errors.phoneNumber ? (
                          <p
                            className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                          >
                            {billingValidation.errors.phoneNumber}
                          </p>
                        ) : null}
                      </Col>
                    </Row>
                    <Form.Label
                      className={`text-color-primary mt-3 mt-md-4 mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                    >
                      Address
                    </Form.Label>
                    <Form.Control
                      name="addressLine1"
                      value={billingValidation.values.addressLine1}
                      onChange={billingValidation.handleChange}
                      onReset={billingValidation.handleReset}
                      onBlur={billingValidation.handleBlur}
                      type="text"
                      placeholder="Enter Your Address"
                      className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                    />
                    {billingValidation.touched.addressLine1 &&
                    billingValidation.errors.addressLine1 ? (
                      <p
                        className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                      >
                        {billingValidation.errors.addressLine1}
                      </p>
                    ) : null}
                    <Row className="mt-3 mt-md-4 flex-column flex-md-row gap-3 gap-md-0">
                      <Col>
                        <Form.Label
                          className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                        >
                          Postal Code
                        </Form.Label>
                        <Form.Control
                          name="postalCode"
                          value={billingValidation.values.postalCode}
                          onChange={billingValidation.handleChange}
                          onReset={billingValidation.handleReset}
                          onBlur={billingValidation.handleBlur}
                          type="text"
                          placeholder="Enter Postal Code"
                          className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                        />
                        {billingValidation.touched.postalCode &&
                        billingValidation.errors.postalCode ? (
                          <p
                            className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                          >
                            {billingValidation.errors.postalCode}
                          </p>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label
                          className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                        >
                          City
                        </Form.Label>
                        <Form.Control
                          name="city"
                          value={billingValidation.values.city}
                          onChange={billingValidation.handleChange}
                          onReset={billingValidation.handleReset}
                          onBlur={billingValidation.handleBlur}
                          type="text"
                          placeholder="Enter City Name"
                          className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                        />
                        {billingValidation.touched.city &&
                        billingValidation.errors.city ? (
                          <p
                            className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                          >
                            {billingValidation.errors.city}
                          </p>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label
                          className={`text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
                        >
                          State
                        </Form.Label>
                        <Form.Control
                          name="state"
                          value={billingValidation.values.state}
                          onChange={billingValidation.handleChange}
                          onReset={billingValidation.handleReset}
                          onBlur={billingValidation.handleBlur}
                          type="text"
                          placeholder="Enter City Name"
                          className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
                        />
                        {billingValidation.touched.state &&
                        billingValidation.errors.state ? (
                          <p
                            className={`fs-14 text-danger text-capitalize mt-1 mb-0`}
                          >
                            {billingValidation.errors.state}
                          </p>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : null}

              <Button
                className="primary-btn mt-3 mt-md-4 w-100 fs-14"
                type="submit"
                onClick={shippingValidation.handleSubmit}
              >
                Proceed to Payment
              </Button>
            </Col>
            <Col xs={12} lg={4} className="mt-3 mt-md-4 mt-lg-0">
              <div className="br-5 overflow-hidden border border-color-light-gray">
                <h3 className="bg-color-titan-white text-color-primary fs-16 text-center m-0 p-2">
                  Order Summary
                </h3>
                <div className="p-3 p-md-4">
                  <div className="d-flex flex-column gap-4">
                    {orderItems?.map((item, index) => {
                      const thumbnail =
                        (item?.variant?.files?.length > 0 &&
                          item?.variant?.files[0]?.urls) ||
                        (item?.product?.files?.length > 0 &&
                          item?.product?.files[0]?.urls) ||
                        "";
                      const title =
                        item?.product?.title || item?.variant?.title;
                      const qty = item?.quantity;
                      const price = item?.price * qty;
                      let redirecTo;
                      if (item?.product) {
                        redirecTo = item?.product?.slug;
                      } else {
                        redirecTo = `${item?.variant?.product?.slug}?variant=${item?.variant?.slug}`;
                      }
                      return (
                        <div className="d-flex gap-3" key={index}>
                          <Link
                            to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                            target="_blank"
                          >
                            <div className="cart-img">
                              <img
                                src={thumbnail}
                                className="order-img br-10 object-fit-cover"
                                alt=""
                              />
                            </div>
                          </Link>
                          <div>
                            <Link
                              to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                              target="_blank"
                            >
                              <h6 className="fs-14 mb-1 text-color-primary m-0 text-capitalize truncate-line-1">
                                {title}
                              </h6>
                            </Link>
                            {/* <p className="m-0 mb-1 text-color-secondary fs-14 truncate-line-2">
                              18k gold, 4.11 grams Round Diamond, 0.43 Carat,
                              vs-gh
                            </p> */}
                            <p className="m-0 mb-1 text-color-primary fs-14">
                              Quantity: {qty}
                            </p>
                            {/* <p className="m-0 mb-1 text-color-secondary fs-14">
                              Expected Delivery by-23rd Apr 24
                            </p> */}
                            <p className="m-0 fs-16 text-color-primary fw-semibold">
                              {currencyHandler(price)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <ul className="m-0 p-0 mt-4 border-bottom border-color-light-gray">
                      <li className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-color-secondary fs-14 m-0">
                          Cart Subtotal :
                        </p>
                        <p className="text-color-primary fs-14 fw-medium m-0">
                          {currencyHandler(withoutDiscountPrice)}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-color-secondary fs-14 m-0">
                          You Save :
                        </p>
                        <p className="text-color-primary fs-14 fw-medium m-0">
                          -{currencyHandler(savedAmount)}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-color-secondary fs-14 m-0">
                          Coupon Discount :
                        </p>
                        <p className="text-color-primary fs-14 fw-medium m-0">
                          -{currencyHandler(couponDiscount)}
                        </p>
                      </li>
                      <li className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-color-secondary fs-14 m-0">
                          Delivery Charges :
                        </p>
                        <p className="text-color-primary fs-14 fw-medium m-0">
                          Free
                        </p>
                      </li>
                      {/* <li className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-color-secondary fs-14 m-0">
                          Gift Wrap :
                        </p>
                        <p className="text-color-primary fs-14 fw-medium m-0">
                          Free
                        </p>
                      </li> */}
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
                        <p className="mb-2 text-color-secondary fs-14">Tax :</p>
                        <p className="mb-2 text-color-primary fs-14 fw-medium">
                          {currencyHandler(totalTaxAmount)}
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
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default CheckOut;
