import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import OtpInput from "react-otp-input";
import * as yup from "yup";
import { useState } from "react";
import OtherAuthMethod from "../../components/common/OtherAuthMethod";
import { setAuthBox, setUserEmail } from "../../store/auth/slice";
import { signUp } from "../../store/actions";

const Register = () => {
  const { loading } = useSelector((store) => store.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // Initial value for the formik
  const initialValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  };

  // Schema for the formik
  const validationSchema = yup.object({
    username: yup.string().min(4).max(20).required("Please enter the username"),
    email: yup.string().email().required("Please enter your email"),
    image: yup.string().required("Please select the file"),
    password: yup
      .string()
      .min(4)
      .max(12)
      .required("Please enter your password"),
    phone: yup
      .string()
      .required("A phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "A phone number must be exactly 10 digits")
      .max(10, "A phone number must be exactly 10 digits"),
  });

  // Validation for the registration
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append("username", values.username);
        bodyFormData.append("email", values.email);
        bodyFormData.append("password", values.password);
        bodyFormData.append("phone", values.phone);
        bodyFormData.append("image", values.image);
        const response = await dispatch(signUp(bodyFormData));
        if (signUp.fulfilled.match(response)) {
          if (response.payload.status === 201) {
            dispatch(setUserEmail(values?.email));
            dispatch(setAuthBox("otp"));
          }
          if (response.payload.status === 200) {
            dispatch(setAuthBox("login"));
          }
        } else if (signUp.rejected.match(response)) {
          if (response.payload.status === 400) {
            dispatch(setAuthBox("login"));
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
          <h2 className={`heading`}>Sign Up</h2>
          <p className={`description w-75 mx-auto`}>
            Sign up to get all the latest fashion news, website updates, offers
            and promos.
          </p>
        </div>
        <div className={`mb-3`}>
          <Form.Label
            className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Username
          </Form.Label>
          <Form.Control
            name="username"
            value={validation.values.username}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="text"
            placeholder="Enter username"
            className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
          />
          {validation.touched.username && validation.errors.username ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.username}
            </p>
          ) : null}
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
            className={`text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Password
          </Form.Label>
          <div className={`position-relative`}>
            <Form.Control
              autoComplete="new-password"
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
          {validation.touched.password && validation.errors.password ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.password}
            </p>
          ) : null}
        </div>
        <div className={`mb-3`}>
          <Form.Label
            className={`text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Phone No.
          </Form.Label>
          <Form.Control
            name="phone"
            value={validation.values.phone}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="number"
            placeholder="Enter phone no."
            className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
          />
          {validation.touched.phone && validation.errors.phone ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.phone}
            </p>
          ) : null}
        </div>
        <div className={`mb-3`}>
          <Form.Label
            className={`text-color-primary fw-medium fs-16 text-capitalize lh-base`}
          >
            Upload Image
          </Form.Label>
          <Form.Control
            name="image"
            // value={validation.values.image}
            onChange={(e) =>
              validation.setFieldValue("image", e.currentTarget.files[0])
            }
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="file"
            className={`form-control-lg input-field-bg br-5 border-0 fw-normal fs-16 lh-base d-block`}
          />
          {validation.touched.image && validation.errors.image ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.image}
            </p>
          ) : null}
          {/* <div>
            <label className="form-label">Default file input example</label>
            <input className="form-control" type="file" id="formFile" />
          </div> */}
        </div>
        <Button
          disabled={loading}
          type="submit"
          className={`fs-16 mt-1 mt-sm-3 mt-md-4 mb-3 w-100 bg-color-primary border-0 br-5 h-45 transition`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <div className="or text-center text-color-primary position-relative fw-semibold fs-15 lh-sm">
          OR
        </div>
        <OtherAuthMethod />
        <div className={`text-center mt-3`}>
          <span className={`text-color-secondary fw-normal fs-16 lh-base`}>
            Already have an account?{" "}
            <Button
              onClick={() => dispatch(setAuthBox("login"))}
              className={`text-decoration-underline fs-16 bg-transparent p-0 border-0 text-color-primary`}
            >
              Sign In
            </Button>
          </span>
        </div>
      </Form>
    </>
  );
};

export default Register;
