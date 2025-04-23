import { Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const ChangePassword = ({ validation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className={`mb-3`}>
        <Form.Label
          className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
        >
          Old Password
        </Form.Label>
        <div className={`position-relative`}>
          <Form.Control
            key="oldPassword"
            name="oldPassword"
            value={validation.values.oldPassword}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type={showPassword ? `text` : `password`}
            placeholder="Enter old password"
            className={`pt-2 input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
            autoComplete="new-password"
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
        {validation.touched.oldPassword && validation.errors.oldPassword ? (
          <p className={`fs-14 text-danger text-capitalize mb-0`}>
            {validation.errors.oldPassword}
          </p>
        ) : null}
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
            type={showNewPassword ? `text` : `password`}
            placeholder="Enter new password"
            className={`pt-2 input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
          />
          <button
            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-color-secondary"
            type="button"
            id="password-addon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <i
              className={`${
                showNewPassword ? `ri-eye-off-line` : `ri-eye-line`
              } align-middle fs-5 fw-bold`}
            ></i>
          </button>
        </div>
        {validation.touched.newPassword && validation.errors.newPassword ? (
          <p className={`fs-14 text-danger text-capitalize mb-0`}>
            {validation.errors.newPassword}
          </p>
        ) : null}
      </div>
      <div>
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
            className={`pt-2 input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
          />
          <button
            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-color-secondary"
            type="button"
            id="password-addon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i
              className={`${
                showConfirmPassword ? `ri-eye-off-line` : `ri-eye-line`
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
    </>
  );
};

ChangePassword.propTypes = {
  validation: PropTypes.any,
};

export default ChangePassword;
