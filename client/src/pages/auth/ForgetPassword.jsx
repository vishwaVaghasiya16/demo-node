import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAuthBox } from "../../store/auth/slice";
import * as yup from "yup";
import { forgetPassword } from "../../store/actions";

const ForgetPassword = () => {
  const { loading } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  // Initial value for the formik
  const initialValues = {
    email: "",
  };

  // Schema for the login formik
  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your email"),
  });

  // Validation for the login
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(forgetPassword(values));
        if (forgetPassword.fulfilled.match(response)) {
          dispatch(setAuthBox("reset-password"));
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
          <h2 className={`heading`}>Forgot Password</h2>
          <p className={`description w-75 mx-auto`}>
            Please enter your email address. You will receive a link to create a
            new password via email.
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
        <Button
          disabled={loading}
          type="submit"
          className={`fs-16 mt-1 mt-sm-3 mt-md-4 mb-0 mb-md-3 w-100 bg-color-primary border-0 br-5 h-45 transition`}
        >
          {loading ? "Sending..." : "Send Mail"}
        </Button>{" "}
        <div className={`text-center mt-3`}>
          <span className={`text-color-secondary fw-normal fs-16 lh-base`}>
            Remember your password?{" "}
            <Button
              onClick={() => dispatch(setAuthBox("login"))}
              className={`text-decoration-underline fs-16 bg-transparent p-0 border-0 text-color-primary`}
            >
              Log In
            </Button>
          </span>
        </div>
      </Form>
    </>
  );
};

export default ForgetPassword;
