import { Button, Modal } from "react-bootstrap";
import Register from "../../../pages/auth/Register";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import OTPVerification from "../../../pages/auth/OTPVerification";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../../pages/auth/Login";
import ForgetPassword from "../../../pages/auth/ForgetPassword";
import ChangePassword from "../../../pages/auth/ChangePassword";
import ResetPassword from "../../../pages/auth/ResetPassword";
import { setAuthBox } from "../../../store/auth/slice";
// import authImage from "/assets/common/auth/authentication-image.webp";

const AuthModal = () => {
  const { authType } = useSelector((store) => store.Auth);
  const [modalShow, setModalShow] = useState(Boolean(authType));
  const dispatch = useDispatch();
  const handleClose = () => {
    setModalShow(false);
    // setTimeout(() => {
    //   dispatch(setAuthBox(""));
    // }, 500);
  };

  useEffect(() => {
    setModalShow(Boolean(authType));
  }, [authType]);

  // useEffect(() => {
  //   switch (authType) {
  //     case "register":
  //       setModalShow(true);
  //       break;
  //     case "otp":
  //       setModalShow(true);
  //       break;
  //     case "login":
  //       setModalShow(true);
  //       break;
  //     case "forget-password":
  //       setModalShow(true);
  //       break;
  //     case "change-password":
  //       setModalShow(true);
  //       break;
  //     case "reset-password":
  //       setModalShow(true);
  //       break;
  //     default:
  //       setModalShow(false);
  //       break;
  //   }
  // }, [authType]);

  return (
    <Modal
      id="loginModals"
      tabIndex="-1"
      backdrop="static"
      centered
      className="auth-modal px-2"
      onHide={handleClose}
      show={modalShow}
      keyboard={false}
    >
      <div
        className={`position-relative br-10 bg-white d-flex flex-wrap align-items-center`}
      >
        <Modal.Body className={`px-3 px-sm-5 py-3 py-sm-4`}>
          <Button
            className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-0 border me-3 mt-3 bg-color-titan-white text-color-black"
            color="transparent"
            onClick={handleClose}
          >
            <i className="ri-close-line fs-18"></i>
          </Button>
          {authType === "register" ? (
            <Register />
          ) : authType === "otp" ? (
            <OTPVerification />
          ) : authType === "login" ? (
            <Login />
          ) : authType === "forget-password" ? (
            <ForgetPassword />
          ) : authType === "reset-password" ? (
            <ResetPassword />
          ) : authType === "change-password" ? (
            <ChangePassword />
          ) : null}
        </Modal.Body>
      </div>
    </Modal>
  );
};

AuthModal.propTypes = {
  authType: PropTypes.any,
};

export default AuthModal;
