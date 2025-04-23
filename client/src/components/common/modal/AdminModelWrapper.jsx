import PropTypes from "prop-types";
import ModelWrapper from "../../admin/ModelWrapper";
import { Button, Col, Modal, Row } from "react-bootstrap";

const AdminModelWrapper = ({
  loading,
  show,
  onHide,
  children,
  onSubmit,
  title,
  confirmText = "Save",
  loadingText = "Saving...",
  cancelText = "Cancel",
  size = "md",
  centered = true,
}) => {
  return (
    <ModelWrapper show={show} size={size} centered={centered} onHide={onHide}>
      <Modal.Header className="py-3 fs-12 common-border-color bg-color-titan-white position-relative">
        <Modal.Title className="text-color-primary fs-18  d-flex align-items-center justify-content-center w-100 text-capitalize">
          {title}
          <i
            className="ri-close-circle-line cursor-pointer position-absolute top-50 end-0 translate-middle fs-24"
            onClick={onHide}
          ></i>
        </Modal.Title>
      </Modal.Header>
      {children}
      <Modal.Footer className="common-border-color px-0">
        <Row className={`w-100 px-1`}>
          <Col xs={6} className={`px-2`}>
            <Button
              onClick={onHide}
              className={`border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100`}
            >
              {cancelText}
            </Button>
          </Col>
          <Col xs={6} className={`px-2`}>
            <Button
              onClick={onSubmit}
              type="submit"
              disabled={loading}
              className="d-block admin-primary-btn hover-bg-secondary w-100 fs-14"
            >
              {loading ? loadingText : confirmText}
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </ModelWrapper>
  );
};

AdminModelWrapper.propTypes = {
  children: PropTypes.any,
  show: PropTypes.any,
  onHide: PropTypes.any,
  onSubmit: PropTypes.any,
  title: PropTypes.any,
  loading: PropTypes.any,
  confirmText: PropTypes.any,
  loadingText: PropTypes.any,
  cancelText: PropTypes.any,
  size: PropTypes.any,
  centered: PropTypes.any,
};

export default AdminModelWrapper;
