import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

const TagField = ({
  isValid = true,
  label,
  name,
  value,
  onChange,
  onValueUpdate,
  defaultValues,
  onReset,
  onBlur,
  type = "text",
  placeholder,
  errorMessage,
  // valid,
  className = "input-field-bg text-color-primary",
  readOnly = false,
  ...props
}) => {
  const [tags, setTags] = useState();
  const [inputValue, setInputValue] = useState();
  const inputRef = useRef();
  const valid = typeof isValid == "boolean" ? Boolean(isValid) : false;

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim(",");
      const values = [...tags, newTag];
      setTags(values);
      setInputValue("");
      onValueUpdate(values);
    }
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveValue = (index) => {
    const values = tags?.filter((_, i) => i !== index);
    setTags(values);
    onValueUpdate(values);
  };

  useEffect(() => {
    setTags(defaultValues || []);
  }, [defaultValues]);
  return (
    <Form.Group className="position-relative admin-input-field ">
      {label && (
        <Form.Label className="truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium mb-1">
          {label}
        </Form.Label>
      )}
      {/* <Form.Control
        id={name}
        type={type}
        name={name}
        value={tags.map((item, index) => {
          return item;
        })}
        // value={value}
        onChange={handleInputValue}
        onKeyDown={handleKeyDown}
        onReset={onReset}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${
          !readOnly
            ? !valid
              ? "input-border-red"
              : "input-border-blue"
            : "opacity-75 input-border-blue"
        } fs-15 ${className} transition-background-color-0_3 input-autofill-color`}
        isInvalid={!valid}
        {...props}
        readOnly={readOnly}
      /> */}
      <div
        className="tag-input br-5 d-flex flex-wrap align-items-center px-2 py-1 gap-1 cursor input-border"
        onClick={() => inputRef.current.focus()}
      >
        {tags?.map((item, index) => {
          return (
            <div
              key={index}
              className="fs-14 me-1 border px-2 br-5 text-capitalize py-0 my-0 text-color-secondary"
            >
              {item}
              <span
                className="ms-2 cursor-pointer"
                onClick={() => handleRemoveValue(index)}
              >
                &times;
              </span>
            </div>
          );
        })}
        <input
          ref={inputRef}
          id={name}
          type={type}
          name={name}
          //   value={tags.map((item, index) => {
          //     return item;
          //   })}
          value={inputValue || ""}
          onChange={handleInputValue}
          onKeyDown={handleKeyDown}
          onReset={onReset}
          onBlur={onBlur}
          placeholder={placeholder}
          className="fs-14 bg-transparent py-1 border-none outline-none border-0 text-color-secondary input-autofill-color"
          //   isInvalid={!valid}
          style={{
            minWidth: `${inputRef?.current?.value?.length * 7 + 25 + "px"}`,
          }}
          {...props}
          readOnly={readOnly}
        />
      </div>
      {!valid && (
        <p className="text-danger mt-1 fs-12 fw-medium text-capitalize">
          {errorMessage}
        </p>
      )}
    </Form.Group>
  );
};

export default TagField;
