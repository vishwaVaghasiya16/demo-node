import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({
  isValid = true,
  label,
  name,
  value,
  onChange,
  onReset,
  onBlur,
  type = "text",
  placeholder,
  errorMessage,
  className = "input-field-bg",
  readOnly = false,
  iconImage = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const valid = typeof isValid == "boolean" ? Boolean(isValid) : false;
  return (
    <>
      {name === "phone" ? (
        <>
          {label && (
            <Form.Label
              className={`truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium ${
                iconImage ? "mb-2" : "mb-1"
              }`}
            >
              <div className={`d-flex align-items-center gap-2`}>
                {iconImage ? (
                  <div className={`input-label-icon`}>
                    <img
                      className={`w-100 h-100 object-fit-cover`}
                      src={iconImage}
                      alt="label-image"
                    />
                  </div>
                ) : null}
                <span>{label}</span>
              </div>
            </Form.Label>
          )}
          <div
            className={`d-flex align-items-center border-danger form-control-border border br-5 blue-border-focus-within ${
              !readOnly
                ? !valid
                  ? "input-border-red is-invalid"
                  : "input-border-blue"
                : "opacity-75"
            } fs-15 ${className} transition-background-color-0_3`}
          >
            <p className="m-0 ps-12 fs-15 text-color-secondary">+91</p>
            <Form.Control
              readOnly={readOnly}
              id={name}
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              onReset={onReset}
              onBlur={onBlur}
              placeholder={placeholder}
              isInvalid={!valid}
              autoComplete="off"
              className={`ps-2 focus-border-none border-0 fs-15 bg-transparent border-none input-autofill-color placeholder-secondary text-color-secondary transition-background-color-0_3 text-color-secondary`}
            />
          </div>
          {!valid && (
            <p className="text-danger mt-1 mb-0 fs-12 fw-medium text-capitalize">
              {errorMessage}
            </p>
          )}
        </>
      ) : type === "password" ? (
        <Form.Group className="position-relative admin-input-field">
          {label && (
            <Form.Label
              className={`truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium ${
                iconImage ? "mb-2" : "mb-1"
              }`}
            >
              <div className={`d-flex align-items-center gap-2`}>
                {iconImage ? (
                  <div className={`input-label-icon`}>
                    <img
                      className={`w-100 h-100 object-fit-cover`}
                      src={iconImage}
                      alt="label-image"
                    />
                  </div>
                ) : null}
                <span>{label}</span>
              </div>
            </Form.Label>
          )}
          <div className={`position-relative`}>
            <Form.Control
              readOnly={readOnly}
              id={name}
              type={showPassword ? "text" : type}
              name={name}
              value={value}
              onChange={onChange}
              onReset={onReset}
              onBlur={onBlur}
              placeholder={placeholder}
              className={`${
                !readOnly
                  ? !valid
                    ? "input-border-red"
                    : "input-border-blue"
                  : "opacity-75 input-border"
              } ${className} text-color-secondary placeholder-secondary transition-background-color-0_3 input-autofill-color`}
              {...props}
              autoComplete="new-password"
            />
            <button
              className="transition-none btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-color-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`${
                  showPassword ? `ri-eye-off-line` : `ri-eye-line`
                } align-middle fs-5 fw-bold`}
              ></i>
            </button>
          </div>
          {!valid && (
            <p className="text-danger mt-1 mb-0 fs-12 fw-medium text-capitalize">
              {errorMessage}
            </p>
          )}
        </Form.Group>
      ) : (
        <Form.Group className="position-relative admin-input-field">
          {label && (
            <Form.Label
              className={`truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium ${
                iconImage ? "mb-2" : "mb-1"
              }`}
            >
              <div className={`d-flex align-items-center gap-2`}>
                {iconImage ? (
                  <div className={`input-label-icon`}>
                    <img
                      className={`w-100 h-100 object-fit-cover`}
                      src={iconImage}
                      alt="label-image"
                    />
                  </div>
                ) : null}
                <span>{label}</span>
              </div>
            </Form.Label>
          )}
          <Form.Control
            readOnly={readOnly}
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onReset={onReset}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${
              !readOnly
                ? !valid
                  ? "input-border-red"
                  : "input-border-blue"
                : "opacity-75 input-border"
            } fs-15 ${className} text-color-secondary placeholder-secondary transition-background-color-0_3 input-autofill-color`}
            isInvalid={!valid}
            {...props}
            autoComplete="new-password"
          />
          {!valid && (
            <p className="text-danger mt-1 mb-0 fs-12 fw-medium text-capitalize">
              {errorMessage}
            </p>
          )}
        </Form.Group>
      )}
    </>
  );
};

InputField.propTypes = {
  isValid: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.any,
  iconImage: PropTypes.any,
  readOnly: PropTypes.any,
};

export default InputField;
