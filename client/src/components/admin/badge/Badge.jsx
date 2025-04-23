import PropTypes from "prop-types";

const Badge = ({ text, type, className }) => {
  return (
    <>
      <span
        className={`${className} badge border border-${type} bg-${type} text-${type} bg-opacity-10 text-capitalize rounded-5 fw-normal fs-13 text-center`}
      >
        {String(text)}
      </span>
    </>
  );
};

Badge.propTypes = {
  text: PropTypes.any,
  type: PropTypes.any,
  className: PropTypes.any,
};

export default Badge;
