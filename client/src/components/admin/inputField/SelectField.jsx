import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  children,
  isValid = true,
  errorMessage,
  className,
  textTransform = "text-capitalize",
  ...props
}) => {
  const valid = typeof isValid == "boolean" ? Boolean(isValid) : false;
  return (
    <Form.Group className="admin-input-field">
      {label && (
        <Form.Label className="truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium mb-1">
          {label}
        </Form.Label>
      )}
      <div className="position-relative">
        <select
          {...props}
          // isInvalid={!valid}
          className={`border w-100 br-5 input-field-bg text-color-secondary fs-14 ${
            !valid
              ? "input-border-red is-invalid"
              : "input-border-blue common-border-color"
          } custom-select position-relative outline-none shadow-none transition-background-color-0_3 ${className} ${textTransform}`}
        >
          {children}
        </select>
        <div className="d-flex select-tag-icons gap-1">
          {!valid && <i className="ri-error-warning-line text-danger"></i>}
          <i className="ri-arrow-down-s-line text-color-primary fw-bold"></i>
        </div>
      </div>

      {!valid && (
        <p className="text-danger fs-12 fw-medium mt-1 mb-0 text-capitalize">
          {errorMessage}
        </p>
      )}
    </Form.Group>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  isValid: PropTypes.any,
  textTransform: PropTypes.any,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
};

export default SelectField;
