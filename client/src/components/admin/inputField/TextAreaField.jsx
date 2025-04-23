import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const TextAreaField = ({
  id,
  label = "enter message",
  isValid = true,
  errorMessage,
  className = "input-field-bg text-color-primary",
  rows,
  ...props
}) => {
  const valid = typeof isValid == "boolean" ? Boolean(isValid) : false;
  return (
    <Form.Group className="mb-3 admin-input-field">
      <Form.Label className="truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium mb-1">
        {label}
      </Form.Label>
      <Form.Control
        rows={rows}
        id={id}
        as="textarea"
        isInvalid={!valid}
        className={`${
          !valid ? "input-border-red" : "input-border-blue"
        } ${className} placeholder-secondary text-color-secondary textarea transition-background-color-0_3 fs-15`}
        {...props}
      />
      {!valid && (
        <p className="text-danger mt-1 mb-0 fs-12 fw-medium text-capitalize">
          {errorMessage}
        </p>
      )}
    </Form.Group>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  isValid: PropTypes.any,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default TextAreaField;
