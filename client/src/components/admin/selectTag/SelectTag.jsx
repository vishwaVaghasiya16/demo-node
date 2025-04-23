import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SelectTag = ({
  type,
  value,
  onChange,
  options,
  disabled,
  name,
  id,
  role = [],
}) => {
  const { user } = useSelector((store) => store.Auth);
  return (
    <>
      <div
        className={`w-fit border border-${type} bg-${type} text-${type} bg-opacity-10 text-capitalize rounded-5 px-2`}
      >
        <select
          // className={`text-capitalize text-${type} border border-${type} border-opacity-50 br-5 remove-focus-visible-outline fs-14 fw-medium bg-transparent`}
          id={id}
          name={name}
          className={`${
            role.length === 0 || role.includes(user?.role) ? "" : "hide-arrow"
          } select-tag bg-transparent border-0 fw-normal fs-13 text-${type} text-capitalize remove-focus-visible-outline`}
          aria-label="Default select example"
          value={value}
          onChange={onChange}
          disabled={
            role.length === 0 || role.includes(user?.role) ? disabled : true
          }
        >
          {options}
        </select>
      </div>
    </>
  );
};

SelectTag.propTypes = {
  type: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  options: PropTypes.any,
  disabled: PropTypes.any,
  name: PropTypes.any,
  id: PropTypes.any,
  role: PropTypes.any,
};

export default SelectTag;
