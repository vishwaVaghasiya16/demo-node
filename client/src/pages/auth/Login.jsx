import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import OtherAuthMethod from "../../components/common/OtherAuthMethod";
import { useState } from "react";
import { setAuthBox, setUserEmail } from "../../store/auth/slice";
import { otpResend, signIn } from "../../store/actions";

const Login = () => {
  const { loading } = useSelector((store) => store.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  // Initial value for the formik
  const initialValues = {
    email: "",
    password: "",
  };

  // Schema for the login formik
  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .min(4)
      .max(12)
      .required("Please enter your password"),
  });

  // Validation for the login
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(signIn(values));
        if (signIn.fulfilled.match(response)) {
          dispatch(setAuthBox(""));
        } else if (signIn.rejected.match(response)) {
          // if (response.payload.status === 400) {
          //   dispatch(setAuthBox("register"));
          // } else
          if (
            response.payload.status === 403 &&
            response.payload.message !== "Your account is not active."
          ) {
            dispatch(setAuthBox("otp"));
            dispatch(otpResend({ email: values.email }));
            dispatch(setUserEmail(values.email));
          }
        }
      } catch (error) {
        console.log("[ERROR]: ", error);
      } finally {
        resetForm();
      }
    },
  });
  return (
    <>
      <Form onSubmit={validation.handleSubmit}>
        <div className="auth-common-text mb-3 mb-sm-4">
          <h2 className={`heading`}>Sign In</h2>
          <p className={`description w-75 mx-auto`}>
            Sign in to stay updated with the latest fashion news, website
            updates, offers, and promotions.
          </p>
        </div>

        <div className={`mb-3`}>
          <Form.Label
            className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Email Address
          </Form.Label>
          <Form.Control
            name="email"
            value={validation.values.email}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="email"
            placeholder="example@gmail.com"
            className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
          />
          {validation.touched.email && validation.errors.email ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.email}
            </p>
          ) : null}
        </div>
        <div className={`mb-3`}>
          <Form.Label
            className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Password
          </Form.Label>
          <div className={`position-relative`}>
            <Form.Control
              name="password"
              value={validation.values.password}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type={showPassword ? `text` : `password`}
              placeholder="Enter password"
              className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
            />
            <button
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-color-secondary"
              type="button"
              id="password-addon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`${
                  showPassword ? `ri-eye-off-line` : `ri-eye-line`
                } align-middle fs-5 fw-bold`}
              ></i>
            </button>
          </div>
          <div
            className={`mt-1 d-flex fle-wrap align-items-center justify-content-between`}
          >
            {validation.touched.password && validation.errors.password ? (
              <p className={`fs-14 text-danger text-capitalize mb-0`}>
                {validation.errors.password}
              </p>
            ) : null}
            <Button
              onClick={() => dispatch(setAuthBox("forget-password"))}
              className={`bg-transparent text-color-secondary p-0 border-0 ms-auto d-block fs-14 fw-normal ls-1px lh-base`}
            >
              Forget Password?
            </Button>
          </div>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className={`fs-16 mt-1 mt-sm-3 mt-md-4 mb-3 w-100 bg-color-primary border-0 br-5 h-45 transition`}
        >
          {loading ? "Loading..." : "Sign In"}
        </Button>
        <div className="or text-center text-color-primary position-relative fw-semibold fs-15 lh-sm">
          OR
        </div>
        <OtherAuthMethod />
        <div className={`text-center mt-3`}>
          <span className={`text-color-secondary fw-normal fs-16 lh-base`}>
            Don&apos;t have an account?{" "}
            <Button
              onClick={() => dispatch(setAuthBox("register"))}
              className={`text-decoration-underline fs-16 bg-transparent p-0 border-0 text-color-primary`}
            >
              Sign Up
            </Button>
          </span>
        </div>
      </Form>
    </>
  );
};

export default Login;
