import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import Stepper from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { currencyHandler } from "../../../helpers/currencyHandler";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CLIENT } from "../../../routes/routesConstants";
import { useEffect, useState } from "react";
import {
  applyCouponThunk,
  deleteCartItemThunk,
  getCartThunk,
  getWishlistThunk,
  moveCartToWishlistThunk,
  removeCouponThunk,
  updateCartItemThunk,
} from "../../../store/actions";
import { getCouponThunk } from "../../../store/actions";
import useConfirmationAlert from "../../../components/common/sweetAlerts/ConfirmationAlert";
import NoRecord from "../../../components/web/displayMessagePages/NoRecord";

const CartDetails = () => {
  const { cart, loading, deleteLoading } = useSelector((store) => store.Cart);
  const { user } = useSelector((store) => store.Auth);
  const { data: couponData } = useSelector((store) => store.Coupon);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState();
  const triggerConfirmation = useConfirmationAlert({
    icon: "question",
    confirmButtonText: "Remove",
    cancelButtonText: "Move to Wish list",
  });
  const calculateTotal = (items) => {
    return items?.reduce((total, item) => {
      const grandTotal =
        item?.product?.grandTotal ?? item?.variant?.grandTotal ?? 0;
      const quantity = item?.quantity ?? 0;
      return total + grandTotal * quantity; // Increment the total by the cost of this item
    }, 0); // Start with a total of 0
  };

  // const subTotal = calculateTotal(cartData?.items);
  const cartData = cart?.[0];
  const items = cartData?.items;
  const id = cartData?._id;
  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  const [showModel, setShowModel] = useState(false);
  const [successCoupon, setSuccessCoupon] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const savedAmount = cartData?.savedAmount || 0;
  const totalSaving = cartData?.totalSaving || 0;
  const subTotal = cartData?.subTotal || 0;
  const totalCost = cartData?.totalCost || 0;
  const couponDiscount = cartData?.couponDiscount || 0;
  const couponCode = cartData?.couponCode || {};
  const withoutDiscountPrice = cartData?.withoutDiscountPrice;
  const totalTaxAmount = cartData?.totalTaxAmount;

  useEffect(() => {
    if (Object.keys(user)?.length > 0) {
      // dispatch(getCartThunk());
    }
    dispatch(getCouponThunk());
  }, [user]);

  useEffect(() => {
    if (!selectedCoupon) {
      setSelectedCoupon(couponData[0]);
    }
  }, [couponData, couponCode]);

  const handleApplyCoupon = () => {
    const value = document.getElementsByName("apply")[0].value;
    const filter = couponData?.filter(
      (item) => item?.code.toUpperCase() == value.toUpperCase()
    );
    if (filter?.length > 0) {
      setSelectedCoupon(filter[0]);
      setShowModel(false);
    }
  };

  const handleApplyCouponOnCart = async () => {
    const response = await dispatch(
      applyCouponThunk({ id, values: { couponCode: selectedCoupon._id } })
    );
    if (applyCouponThunk.fulfilled.match(response)) {
      setSuccessCoupon(true);
    }
  };
  const handleRemoveCouponOnCart = async () => {
    await dispatch(removeCouponThunk({ id }));
  };

  const handleRemoveCartItem = async (productId) => {
    triggerConfirmation({
      dispatchFunction: async () => {
        {
          const response = await dispatch(
            deleteCartItemThunk({ id, productId })
          );
          if (deleteCartItemThunk.fulfilled.match(response)) {
            return true;
          }
          return false;
        }
      },
      // thunkProvider: deleteCartItemThunk,
      cancelDispatchFunction: async () => {
        const response = await dispatch(
          moveCartToWishlistThunk({ id, removeId: productId })
        );
        if (moveCartToWishlistThunk.fulfilled.match(response)) {
          dispatch(getWishlistThunk());
          return true;
        }
        return false;
      },
    });
  };

  const handleQuantity = async (type, editId, quantity, price) => {
    if (!loading) {
      setSelectedId(editId);
      if (type == "inc") {
        await dispatch(
          updateCartItemThunk({
            id: cartData?._id,
            editId,
            values: { quantity: quantity + 1 },
          })
        );
      } else {
        if (quantity > 1) {
          await dispatch(
            updateCartItemThunk({
              id: cartData?._id,
              editId,
              values: { quantity: quantity - 1 },
            })
          );
        }
      }
    }
  };

  return (
    <section className="">
      <Container>
        {items && items?.length > 0 ? (
          <>
            <PageHeader title="Home" pageTitle="Main Cart" />

            {/* ================================ 
                stepper 
          ================================ */}
            <Stepper className="paddingTop" />
            <div className="paddingBottom pt-0 pt-md-3 cart">
              <Row className="gap-3 gap-lg-0">
                {/* ================================= 
            product details table 
              ================================= */}

                <Col xs={12} lg={8}>
                  {isLargeScreen ? (
                    <Table responsive="xxl" bordered className="text-center">
                      <thead className="">
                        <tr>
                          <td className="bg-color-titan-white text-color-primary text-center">
                            Remove
                          </td>
                          <td className="bg-color-titan-white text-color-primary text-center">
                            Product Image
                          </td>
                          <td className="bg-color-titan-white text-color-primary text-center">
                            Product Name
                          </td>
                          <td className="bg-color-titan-white text-color-primary text-center">
                            Quantity
                          </td>
                          <td className="bg-color-titan-white text-color-primary text-center">
                            Price
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {items &&
                          items?.map((items, index) => {
                            let thumbnail =
                              (items?.variant?.files?.length > 0 &&
                                items?.variant?.files[0]?.urls) ||
                              (items?.product?.files?.length > 0 &&
                                items?.product?.files[0]?.urls) ||
                              "";
                            let productId;
                            const title =
                              items?.product?.title || items?.variant?.title;
                            let quantity = items?.quantity;
                            let grandTotal;
                            let redirecTo;
                            if (items.product?._id) {
                              productId = items?.product?._id;
                              grandTotal = items?.product?.grandTotal;
                              redirecTo = items?.product?.slug;
                            } else {
                              productId = items?.variant?._id;
                              grandTotal = items?.variant?.grandTotal;
                              redirecTo = `${items?.variant?.product?.slug}?variant=${items?.variant?.slug}`;
                            }
                            return (
                              <tr
                                key={index}
                                className={`${
                                  deleteLoading && selectedId == productId
                                    ? "opacity-loading"
                                    : ""
                                }`}
                              >
                                <td className="align-middle  w-150px ">
                                  <i
                                    className="ri-close-circle-line fs-24 text-color-secondary cursor-pointer"
                                    onClick={() =>
                                      handleRemoveCartItem(productId)
                                    }
                                  ></i>
                                </td>
                                <td className=" w-180px">
                                  <Link
                                    target="_blank"
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                  >
                                    <div className="cart-img br-5 overflow-hidden">
                                      <img
                                        src={thumbnail}
                                        alt=""
                                        className="h-100 w-100 object-fit-cover"
                                      />
                                    </div>
                                  </Link>
                                </td>
                                <td className="align-middle min-w-200px">
                                  <Link
                                    target="_blank"
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                  >
                                    <h6 className="fs-14 text-capitalize fw-medium text-color-primary fw-normal mb-1">
                                      {title}
                                    </h6>
                                  </Link>
                                  {/* <p className="fs-14 text-color-secondary fw-normal m-0">
                                    18k gold, 4.11 grams Round Diamond, 0.43
                                    Carat, vs-gh
                                  </p> */}
                                </td>
                                <td className="align-middle w-150px">
                                  <div
                                    className={`d-flex align-items-center justify-content-center ${
                                      loading && selectedId == productId
                                        ? "opacity-loading"
                                        : ""
                                    }`}
                                  >
                                    <i
                                      className={`ri-indeterminate-circle-line fs-24 text-color-secondary cursor-pointer ${
                                        quantity <= 1 ? "opacity-50" : ""
                                      }`}
                                      onClick={() =>
                                        handleQuantity(
                                          "dec",
                                          productId,
                                          quantity,
                                          grandTotal
                                        )
                                      }
                                    ></i>
                                    <span>
                                      <p className="m-0 mx-2">{quantity}</p>
                                    </span>
                                    <i
                                      className="ri-add-circle-line fs-24 text-color-secondary cursor-pointer"
                                      onClick={() =>
                                        handleQuantity(
                                          "inc",
                                          productId,
                                          quantity,
                                          grandTotal
                                        )
                                      }
                                    ></i>
                                  </div>
                                </td>
                                <td className="align-middle w-150px">
                                  <p className="text-color-primary m-0 fw-medium">
                                    {currencyHandler(grandTotal * quantity)}
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  ) : (
                    <div>
                      {items &&
                        items?.map((items, index) => {
                          let thumbnail =
                            (items?.variant?.files?.length > 0 &&
                              items?.variant?.files[0]?.urls) ||
                            (items?.product?.files?.length > 0 &&
                              items?.product?.files[0]?.urls) ||
                            "";
                          let productId;
                          const title =
                            items?.product?.title || items?.variant?.title;
                          let quantity = items?.quantity;
                          let grandTotal;
                          let redirecTo;
                          if (items.product?._id) {
                            productId = items?.product?._id;
                            grandTotal = items?.product?.grandTotal;
                            redirecTo = items?.product?.slug;
                          } else {
                            productId = items?.variant?._id;
                            grandTotal = items?.variant?.grandTotal;
                            redirecTo = `${items?.variant?.product?.slug}?variant=${items?.variant?.slug}`;
                          }
                          return (
                            <div key={index} className="mb-3">
                              <div className="d-flex">
                                <Col xs={4} sm={3}>
                                  <Link
                                    target="_blank"
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                  >
                                    <div className="border border-color-light-gray p-2 p-sm-3 cart-img-sm">
                                      <img
                                        src={thumbnail}
                                        className="object-fit-cover w-100 br-5"
                                        alt=""
                                      />
                                    </div>
                                  </Link>
                                </Col>
                                <Col xs={8} sm={9} className="ps-3">
                                  <div className="border border-color-light-gray">
                                    <div className="border-bottom border-color-light-gray py-2 px-3">
                                      <Link
                                        target="_blank"
                                        to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                      >
                                        <h6 className="mb-1 text-color-primary fw-medium text-capitalize fs-12">
                                          {title}
                                        </h6>
                                      </Link>
                                      {/* <p className="m-0 text-color-secondary fs-12 truncate-line-2">
                                        18k gold, 4.11 grams Round Diamond, 0.43
                                        Carat, vs-gh
                                      </p> */}
                                    </div>
                                    <div className="border-bottom border-color-light-gray py-2 px-3">
                                      <i
                                        onClick={() =>
                                          handleRemoveCartItem(productId)
                                        }
                                        className="ri-close-circle-line fs-20 text-color-secondary cursor-pointer"
                                      ></i>
                                    </div>
                                    <div className="border-bottom border-color-light-gray py-2 px-3 d-flex align-items-center fw-medium justify-content-between">
                                      <p className="m-0 fs-12">Quantity</p>
                                      <div className="d-flex align-items-center justify-content-center">
                                        <i
                                          onClick={() =>
                                            handleQuantity(
                                              "dec",
                                              productId,
                                              quantity,
                                              grandTotal
                                            )
                                          }
                                          className={`ri-indeterminate-circle-line fs-20 text-color-secondary cursor-pointer ${
                                            quantity <= 1 && "opacity-50"
                                          }`}
                                        ></i>
                                        <span>
                                          <p className="m-0 mx-1 fs-12">
                                            {quantity}
                                          </p>
                                        </span>
                                        <i
                                          onClick={() =>
                                            handleQuantity(
                                              "inc",
                                              productId,
                                              quantity,
                                              grandTotal
                                            )
                                          }
                                          className="ri-add-circle-line fs-20 text-color-secondary cursor-pointer"
                                        ></i>
                                      </div>
                                    </div>
                                    <div className="py-2 px-3 d-flex align-items-center justify-content-between fw-medium">
                                      <p className="m-0 fs-12 text-color-primary">
                                        Price
                                      </p>
                                      <p className="m-0 fs-12 text-color-primary fw-medium">
                                        {currencyHandler(grandTotal)}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}

                  <div className="d-flex ms-auto responsive">
                    <p className="ms-auto m-0 bg-color-titan-white px-4 w-150px text-center border py-2 fs-14 fw-medium">
                      Total
                    </p>
                    <p className="m-0 bg-color-titan-white w-150px px-4 border py-2 fs-14 fw-medium text-center">
                      {currencyHandler(subTotal)}
                    </p>
                  </div>
                </Col>

                {/* ================================= 
            coupon & cart summery
              ================================= */}

                <Col xs={12} lg={4} className="responsive">
                  {couponData?.length > 0 && (
                    <div className="w-100 mb-3 mb-md-4">
                      <div className="bg-color-titan-white border border-color-light-gray br-5 overflow-hidden">
                        <div className="border-start border-3 border-color-primary p-3">
                          <div className="d-flex gap-2 justify-content-between align-items-center">
                            <div className="d-flex gap-3">
                              <i className="ri-scissors-line fs-24 text-color-secondary"></i>
                              <div>
                                <h6 className="mb-1 text-color-primary fs-14 fw-medium">
                                  {selectedCoupon?.code}
                                </h6>
                                <p className="m-0 text-color-secondary fw-normal truncate-line-1 fs-14">
                                  {selectedCoupon?.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              className="m-0 text-decoration-underline bg-transparent border-0 text-color-primary text-nowrap fs-14"
                              onClick={() => setShowModel(true)}
                            >
                              View Coupon
                            </Button>
                          </div>
                        </div>
                      </div>
                      {Object.keys(couponCode)?.length ? (
                        <Button
                          className="primary-btn w-100 mt-3 mt-md-2 fs-14 cursor-pointer"
                          onClick={handleRemoveCouponOnCart}
                        >
                          {`Remove Applied Coupon`}
                        </Button>
                      ) : (
                        <Button
                          className="primary-btn w-100 mt-3 mt-md-2 fs-14 cursor-pointer"
                          onClick={handleApplyCouponOnCart}
                        >
                          Apply a Coupon
                        </Button>
                      )}
                    </div>
                  )}
                  {/* ================================= 
                  cart summery
                  ================================= */}
                  <div className="mb-3 mb-md-4">
                    <div className="border border-color-light-gray br-10 overflow-hidden">
                      <h6 className="m-0 bg-color-titan-white w-100 p-3 fs-14 text-color-primary">
                        Cart Summery
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
                              {currencyHandler(totalTaxAmount)}
                            </p>
                          </li>
                          <li className="d-flex align-items-center justify-content-between">
                            <p className="mb-0 text-color-secondary fs-14">
                              Total Amount (Inc of all taxes) :
                            </p>
                            <p className="mb-0 text-color-primary fs-14 fw-medium">
                              {currencyHandler(totalCost)}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-100 primary-btn fs-14"
                    onClick={() => cart?.length > 0 && nav(CLIENT.CHECK_OUT)}
                  >
                    Check Out
                  </Button>
                  <Button onClick={()=>nav(`${CLIENT.CATEGORY}`)} className="w-100 primary-btn fs-14 mt-3 mt-md-2">
                    Continue Shopping
                  </Button>
                </Col>
              </Row>
            </div>

            {/* ================================ 
           coupon model 
================================ */}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showModel}
              className="modal-600px"
              onHide={() => setShowModel(false)}
            >
              <Modal.Header
                closeButton
                className="position-relative btn-close-none bg-color-primary"
              >
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="mx-auto fs-20 text-white fw-medium responsive"
                >
                  Apply Coupon
                  <Button
                    className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-50 translate-middle border  bg-color-titan-white text-color-black"
                    color="transparent"
                    type="button"
                    onClick={() => setShowModel(false)}
                  >
                    <i className="ri-close-line fs-18"></i>
                  </Button>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0 max-h-420px overflow-y-scroll overflow-track-none responsive">
                <div className="bg-white p-4">
                  <Form.Label className="text-color-primary fs-14 fw-medium">
                    Have a coupon code?
                  </Form.Label>
                  <div className="d-flex input-field-bg border border-color-light-gray br-5">
                    <Form.Control
                      name="apply"
                      id="apply"
                      type="text"
                      placeholder="Enter Coupon Code"
                      className="fs-14 border-none text-color-secondary bg-transparent placeholder-secondary p-2 px-3 rounded-0"
                    />
                    <Button
                      className="primary-btn w-fit fs-14"
                      onClick={handleApplyCoupon}
                    >
                      APPLY
                    </Button>
                  </div>
                </div>
                <div className="bg-color-light-gray p-4 d-flex flex-column gap-4 br-bottom-10 overflow-hidden">
                  {couponData?.map((item, index) => {
                    const code = item?.code;
                    const description = item?.description;
                    return (
                      <div key={index} className="br-5 overflow-hidden">
                        <div className="bg-color-secondary text-white p-2 d-flex align-items-center justify-content-between px-3">
                          <h6 className="p-0 m-0 fs-14">{code}</h6>
                          <Button
                            className="p-0 m-0 fs-14 p-0 bg-transparent border-0"
                            onClick={() => {
                              setSelectedCoupon(item), setShowModel(false);
                            }}
                          >
                            APPLY
                          </Button>
                        </div>
                        <div className="bg-white p-3 coupon-description-div position-relative">
                          <p className="p-0 m-0 fs-14 text-color-secondary">
                            {" "}
                            - {description}
                          </p>
                          <p className="p-0 m-0 fs-14 text-color-secondary">
                            {" "}
                            - To be applied in payment step at Checkout
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Modal.Body>
            </Modal>

            {/* ========================================
                          coupon applied model
            ============================================*/}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={successCoupon}
              className="modal-600px"
              onHide={() => setSuccessCoupon(false)}
            >
              <Modal.Header
                closeButton
                className="position-relative btn-close-none bg-color-primary"
              >
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="mx-auto fs-20 text-white fw-medium responsive"
                >
                  Applied Coupon
                  <Button
                    className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-50 translate-middle border  bg-color-titan-white text-color-black"
                    color="transparent"
                    type="button"
                    onClick={() => setSuccessCoupon(false)}
                  >
                    <i className="ri-close-line fs-18"></i>
                  </Button>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0 max-h-420px overflow-y-scroll overflow-track-none br-10 responsive">
                <div className="text-center p-4">
                  <p className="p-0 m-0 text-color-secondary fs-14">
                    {selectedCoupon?.code || "coupon"} Applied
                  </p>
                  <p className="p-0 m-0 text-color-primary fs-20 fw-medium mb-3 mt-2 text-capitalize">
                    {currencyHandler(selectedCoupon?.savedAmount)} saved with
                    this coupon
                  </p>
                  <Button
                    className="border-0 py-2 bg-color-secondary w-100 fs-14 text-capitalize"
                    onClick={() => setSuccessCoupon(false)}
                  >
                    Wohoo! your coupon is successfully applied!
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <div className={`paddingBottom mb-3 mb-md-0 mt-lg-5`}>
            <NoRecord
              title="Cart is Empty !"
              message="Your cart is currently empty. Start shopping now to fill it up with your favorite items !"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default CartDetails;
