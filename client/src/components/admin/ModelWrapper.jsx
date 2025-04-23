import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const ModelWrapper = ({ children, show, onHide, className, ...props }) => {
  const { isDarkMode } = useSelector((store) => store.Filters);
  return (
    <Modal
      className={`${isDarkMode ? "dark-layout" : ""} ${className}`}
      show={show}
      onHide={onHide}
      {...props}
    >
      {children}
    </Modal>
  );
};

ModelWrapper.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  props: PropTypes.any,
  className:PropTypes.string
};

export default ModelWrapper;
