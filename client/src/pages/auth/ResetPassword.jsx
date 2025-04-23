import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { setAuthBox } from "../../store/auth/slice";
import { useEffect, useState } from "react";
import { resetPassword } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { CLIENT } from "../../routes/routesConstants";
import thumbnail1 from "/assets/web/thumbnail1.webp";

const ResetPassword = () => {
  const { loading } = useSelector((store) => store.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Initial value for the formik
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  // Schema for the formik
  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .min(4)
      .max(12)
      .required("Please enter your password"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  // Validation for the login
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(resetPassword({ token, values }));
        if (resetPassword.fulfilled.match(response)) {
          navigate(CLIENT.INDEX);
        }
      } catch (error) {
        console.log("[ERROR]: ", error);
      } finally {
        resetForm();
      }
    },
  });

  useEffect(() => {
    dispatch(setAuthBox(""));
  }, [dispatch]);
  return (
    <>
      <div
        className="vh-100 min-h-500px d-flex align-items-center bg-cover bg-no-repeat bg-attachment-fixed bg-position-center"
        style={{
          backgroundImage: `url(${thumbnail1})`,
        }}
      >
        <Modal
          id="loginModals"
          tabIndex="-1"
          backdrop="static"
          keyboard={false}
          centered
          className="auth-modal px-2"
          show={true}
        >
          <div
            className={`position-relative br-10 bg-white d-flex flex-wrap align-items-center`}
          >
            <Modal.Body className={`px-3 px-sm-5 py-3 py-sm-4`}>
              <Form onSubmit={validation.handleSubmit}>
                <div className="auth-common-text mb-3 mb-sm-4">
                  <h2 className={`heading`}>Reset Password</h2>
                  <p className={`description w-75 mx-auto`}>
                    Enter your new password below to reset your account's
                    password and regain access.
                  </p>
                </div>
                <div className={`mb-3`}>
                  <Form.Label
                    className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                  >
                    New Password
                  </Form.Label>
                  <div className={`position-relative`}>
                    <Form.Control
                      name="newPassword"
                      value={validation.values.newPassword}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type={showPassword ? `text` : `password`}
                      placeholder="Enter new password"
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
                  {validation.touched.newPassword &&
                  validation.errors.newPassword ? (
                    <p className={`fs-14 text-danger text-capitalize mb-0`}>
                      {validation.errors.newPassword}
                    </p>
                  ) : null}
                </div>
                <div className={`mb-3`}>
                  <Form.Label
                    className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                  >
                    Confirm Password
                  </Form.Label>
                  <div className={`position-relative`}>
                    <Form.Control
                      name="confirmPassword"
                      value={validation.values.confirmPassword}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type={showConfirmPassword ? `text` : `password`}
                      placeholder="Enter confirm password"
                      className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                    />
                    <button
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-color-secondary"
                      type="button"
                      id="password-addon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <i
                        className={`${
                          showConfirmPassword
                            ? `ri-eye-off-line`
                            : `ri-eye-line`
                        } align-middle fs-5 fw-bold`}
                      ></i>
                    </button>
                  </div>
                  {validation.touched.confirmPassword &&
                  validation.errors.confirmPassword ? (
                    <p className={`fs-14 text-danger text-capitalize mb-0`}>
                      {validation.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className={`fs-16 mt-1 mt-sm-3 mt-md-4 mb-1 mb-md-3 w-100 bg-color-primary border-0 br-5 h-45 transition`}
                >
                  {loading ? "Loading..." : "Reset Password"}
                </Button>
              </Form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ResetPassword;
