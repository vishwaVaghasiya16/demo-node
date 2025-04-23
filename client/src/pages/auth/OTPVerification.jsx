import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { setAuthBox, setUserEmail } from "../../store/auth/slice";
import OtpExpirySecond from "../../components/common/OtpExpirySecond";
import { otpResend, otpVerify } from "../../store/actions";

const OTPVerification = () => {
  const { email, loading } = useSelector((store) => store.Auth);
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  // Initial value for the formik
  const initialValues = {
    otp: "",
  };

  // Schema for the formik
  const validationSchema = yup.object({
    otp: yup.number(),
  });

  // Validation for the login
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(otpVerify({ ...values, email }));
        if (otpVerify.fulfilled.match(response)) {
          dispatch(setAuthBox("login"));
          dispatch(setUserEmail(""));
        }
      } catch (error) {
        console.log("[ERROR]: ", error);
      } finally {
        resetForm();
      }
    },
  });

  const handleResendOtp = () => {
    dispatch(otpResend({ email }));
    setKey(!key);
  };

  useEffect(() => {
    if (!email) {
      dispatch(setAuthBox("register"));
    }
  }, [email, dispatch]);

  return (
    <>
      <Form onSubmit={validation.handleSubmit}>
        <div className="auth-common-text mb-2 mb-md-4">
          <h2 className={`heading`}>Verified Your Email Address</h2>
          <p className={`description w-75 mx-auto mb-0`}>
            Enter the verification code we just sent on your
          </p>
        </div>
        <div className={`text-center`}>
          <span className={`text-color-primary fw-normal fs-16 lh-base`}>
            OTP Sent on {email || "dummy@gmail.com"}
          </span>
        </div>
        <div className={`my-40`}>
          <div className="otp">
            <OtpInput
              name="otp"
              value={validation.values.otp}
              onChange={(otp) => validation.setFieldValue("otp", otp)}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              numInputs={4}
              inputMode="number"
              renderInput={(props) => {
                return (
                  <Form.Control
                    {...props}
                    inputMode="number"
                    autoComplete="on"
                    type="number"
                  />
                );
              }}
            />
          </div>
        </div>
        <OtpExpirySecond key={key} />
        <div className="mt-0 mt-md-1 text-center">
          <span className={`text-color-secondary fw-normal fs-16 lh-base`}>
            Didn&apos;t receive a code?{" "}
            <Button
              onClick={handleResendOtp}
              className={`text-decoration-underline fs-16 bg-transparent p-0 border-0 text-color-primary`}
            >
              Resend
            </Button>
          </span>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className={`fs-16 mt-2 mt-sm-3 mt-md-4 mb-0 mb-md-3 w-100 bg-color-primary border-0 br-5 h-45 transition`}
        >
          {loading ? "Loading..." : "Verify"}
        </Button>
      </Form>
    </>
  );
};

export default OTPVerification;
