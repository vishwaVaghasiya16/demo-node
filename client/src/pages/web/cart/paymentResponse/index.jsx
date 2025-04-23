import { Card, CardBody, Col, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "/src/data/lottie/errorAnimation.json";
import checkAnimation from "/src/data/lottie/checkAnimation.json";
import PageHeader from "../../../../components/web/header/PageHeader";
import Stepper from "../Stepper";
import { CLIENT } from "../../../../routes/routesConstants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "../../../../store/cart/slice";

const PaymentResponse = () => {
  const navigate = useNavigate();
  const { razorpayid } = useParams();
  const { paymentCaptureData, message, paymentCaptureLoading, success } =
    useSelector((store) => store.Payment);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!razorpayid || paymentCaptureData?.razorpayOrderId !== razorpayid) {
      navigate(CLIENT.CATEGORY);
    }
    dispatch(clearCart());
  }, [paymentCaptureData, navigate, razorpayid]);
  return (
    <div className={`payment-response page-content`}>
      <Container>
        <PageHeader title="Home" pageTitle="Payment" />
      </Container>
      <div className="paddingTop">
        <Stepper step={2} />
        <Container>
          <div className="paddingY">
            <Col md={8} lg={6} xxl={5} className={`mx-auto`}>
              <Card
                className={`bg-color-titan-white border br-10 overflow-hidden border-0 p-md-2`}
              >
                <CardBody>
                  <div className="text-center">
                    {!paymentCaptureLoading && success && message ? (
                      <>
                        <Lottie
                          className="w-180px mx-auto"
                          animationData={checkAnimation}
                        />
                        <div className="mt-3 mt-sm-4">
                          <h4
                            className={`responsive fs-3 fw-semibold text-success`}
                          >
                            Your Payment is Successful!
                          </h4>
                          <p className="text-color-primary responsive fw-normal responsive fs-14 mx-xl-3 mt-2">
                            Your payment for exquisite jewelry has been
                            successfully processed. Get ready to adorn yourself
                            with timeless elegance and make a statement that
                            reflects your unique style.
                          </p>
                          <div className="mt-4">
                            <Link
                              to={CLIENT.CATEGORY}
                              className="btn m-0 responsive fs-16 bg-color-primary text-white w-100"
                            >
                              Back to Home
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Lottie
                          className="w-180px mx-auto"
                          animationData={errorAnimation}
                        />
                        <div className="mt-3 mt-sm-4">
                          <h4
                            className={`responsive fs-3 fw-semibold text-danger`}
                          >
                            Payment Failed!
                          </h4>
                          <p className="text-color-primary responsive fw-normal responsive fs-14 mx-xl-3 mt-2">
                            We regret to inform you that your payment attempt
                            was unsuccessful. Please ensure that all information
                            provided is accurate and try again to complete your
                            purchase. If the issue persists, consider checking
                            your payment method or contacting customer support
                            for assistance.
                          </p>
                          <div className="mt-4">
                            <Link
                              to={CLIENT.CATEGORY}
                              className="btn m-0 responsive fs-16 bg-color-primary text-white w-100"
                            >
                              Back to Home
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PaymentResponse;
