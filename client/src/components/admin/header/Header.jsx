import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLightDarkMode, setToggleValue } from "../../../store/filters/slice";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { logOut } from "../../../store/auth/slice";
import { useNavigate } from "react-router-dom";
import { ADMIN as Admin, CLIENT } from "../../../routes/routesConstants";
import AdminModelWrapper from "../../common/modal/AdminModelWrapper";
import InputField from "../inputField/InputField";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  getStaffDetailsThunk,
  updateUserDetails,
  verifyToken,
} from "../../../store/actions";

const Header = () => {
  const dispatch = useDispatch();
  const { isToggle, isDarkMode } = useSelector((store) => store.Filters);
  const { token, user, loading } = useSelector((store) => store.Auth);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const userName = user.username;
  const email = user.email;
  const profileImg = user?.url;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [imageData, setImageData] = useState();
  const handleToggle = () => {
    dispatch(setToggleValue(!isToggle));
  };
  const nav = useNavigate();
  const ADMIN = Admin();
  const [myProfileType] = useState("myProfile");
  const [changePasswordType] = useState("changePassword");

  const handleOutsideClick = (e) => {
    const isInsideDropDown = e.target.closest(".admin-nav-profile");
    const isInsideButton = e.target.closest(".user-popup-button");
    if (!isInsideButton && !isInsideDropDown) {
      setShowUserDetails(false);
    }
  };

  const handleScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleEscapeFromFullScreen = (e) => {
    if (e.key == "Escape" && isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleNavigate = (path) => {
    nav(path);
  };

  const handleModal = (type) => {
    setModalType(type);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    // setModalType("");
    setImageData("");
    validation.resetForm();
  };

  const initialValues =
    modalType === changePasswordType
      ? { oldPassword: "", newPassword: "", confirmPassword: "" }
      : modalType === myProfileType
      ? {
          username: user?.username || "",
          phone: user?.phone || "",
          image: user?.url || "",
        }
      : {};

  const validationSchema = yup.object(
    modalType === changePasswordType
      ? {
          oldPassword: yup.string().required("Old password is required"),
          newPassword: yup.string().when("oldPassword", {
            is: (val) => !!val,
            then: (schema) => schema.required("New password is required"),
            otherwise: (schema) => schema,
          }),
          confirmPassword: yup.string().when("oldPassword", {
            is: (val) => !!val,
            then: (schema) =>
              schema
                .required("Confirm password is required")
                .oneOf([yup.ref("newPassword")], "Passwords must match"),
            otherwise: (schema) => schema,
          }),
        }
      : modalType === myProfileType
      ? {
          username: yup
            .string()
            .min(4)
            .max(20)
            .required("Full name is required"),
          phone: yup
            .string()
            .required("A phone number is required")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .min(10, "A phone number must be exactly 10 digits")
            .max(10, "A phone number must be exactly 10 digits"),
          image: yup.string().required("Please select the file"),
        }
      : {}
  );

  const validation = useFormik({
    name: "authValidation",
    validationSchema,
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const id = user?._id;
        const formData = new FormData();
        for (const key in values) {
          formData.append(`${key}`, values[key]);
        }
        await dispatch(updateUserDetails({ id, values: formData }));
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        if (token) {
          await dispatch(verifyToken({ token }));
        }
        closeModal();
      }
    },
  });

  const handleFilePreview = (input) => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      validation.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeFromFullScreen);
    return () =>
      window.removeEventListener("keydown", handleEscapeFromFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    const handleScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleScreenChange);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("fullscreenchange", handleScreenChange);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header
      className={`z-50 px-20 position-sticky top-0 start-0 d-flex align-items-center justify-content-between h-60 bg-white border-bottom common-border-color common-box-shadow`}
      // style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)" }}
    >
      <div className={`toggle-icon`}>
        <Button
          onClick={handleToggle}
          className={`bg-transparent p-0 m-0 border-0 toggle-btn text-color-primary`}
        >
          <div id="nav-icon4" className={`${isToggle ? "open" : ""}`}>
            <span className="bg-color-primary"></span>
            <span className="bg-color-primary"></span>
            <span className="bg-color-primary"></span>
          </div>
        </Button>
      </div>

      <div className={`d-flex gap-3 gap-md-4 align-items-center h-100`}>
        <Button
          className="p-0 bg-transparent border-0 outline-none"
          onClick={() => dispatch(setLightDarkMode())}
        >
          {isDarkMode ? (
            <i className="ri-sun-line fs-20 text-color-primary"></i>
          ) : (
            <i className="ri-moon-line fs-20 text-color-primary"></i>
          )}
        </Button>
        <Button
          className="p-0 bg-transparent border-0 outline-none"
          onClick={handleScreen}
        >
          {isFullScreen ? (
            <i className="ri-fullscreen-exit-fill fs-20 text-color-primary"></i>
          ) : (
            <i className="ri-fullscreen-fill fs-20 text-color-primary"></i>
          )}
        </Button>
        <div className="position-relative z-2 h-100 d-flex">
          <Button
            className="p-0 border-0 rounded-0 outline-none bg-color-titan-white px-3 d-flex gap-2 h-100 align-items-center justify-content-center user-popup-button transition-background-color-0_3"
            onClick={() => setShowUserDetails(!showUserDetails)}
          >
            <img
              src={profileImg || defaultUserImg}
              className=" bg-white w-35px h-35px object-fit-cover rounded-circle"
              alt=""
            />
            <div className="d-none d-md-block">
              <p className="p-0 m-0 fs-14 fw-medium text-start text-capitalize text-color-primary">
                {userName}
              </p>
              <p className="p-0 m-0 fs-14 fw-normal text-color-secondary text-start">
                {email}
              </p>
            </div>
          </Button>
          <div
            className={`position-absolute end-0 shadow z--1 admin-nav-profile w-200px br-5 overflow-hidden ${
              showUserDetails
                ? "visible opacity-100 scale-1 top-100"
                : "invisible opacity-0 scale-0_9 top-80"
            }`}
          >
            <div className="bg-white py-2 border common-border-color">
              <ul className="m-0 p-0 d-flex flex-column">
                <li
                  className="text-color-secondary px-3 py-1 hover-bg-color-titan-white hover-color-primary cursor-pointer"
                  onClick={() => handleNavigate(CLIENT.INDEX)}
                >
                  <i className="ri-user-shared-2-line fs-18"></i>
                  <span className="fs-14 ms-2 fw-medium">Back to Client</span>
                </li>
                <li
                  className="text-color-secondary px-3 py-1 hover-bg-color-titan-white hover-color-primary cursor-pointer"
                  onClick={() => {
                    if (user?.empId) {
                      handleNavigate(
                        `${ADMIN.STAFF_ACCOUNT_SETTING.path}/${user.empId}`
                      );
                      dispatch(getStaffDetailsThunk({ staff: user.empId }));
                    } else {
                      handleModal(myProfileType);
                    }
                  }}
                >
                  <i className="ri-user-line fs-18"></i>
                  <span className="fs-14 ms-2 fw-medium">My Profile</span>
                </li>
                {user?.authProvider === enumsData?.authProviderEnum?.LOCAL && (
                  <li
                    className="text-color-secondary px-3 py-1 hover-bg-color-titan-white hover-color-primary cursor-pointer"
                    onClick={() => {
                      if (user?.empId) {
                        handleNavigate(
                          `${ADMIN.STAFF_ACCOUNT_SETTING.path}/${user.empId}`
                        );
                        dispatch(getStaffDetailsThunk({ staff: user.empId }));
                      } else {
                        handleModal(changePasswordType);
                      }
                    }}
                  >
                    <i className="ri-lock-password-line fs-18"></i>
                    <span className="fs-14 ms-2 fw-medium">
                      Change Password
                    </span>
                  </li>
                )}
                {/* <li className="text-color-secondary px-3 py-1 hover-bg-color-titan-white hover-color-primary cursor-pointer">
                  <i className="ri-wallet-line fs-18"></i>
                  <span className="fs-14 ms-2 fw-medium">
                    Bal:- {currencyHandler(100000)}
                  </span>
                </li> */}
                <li className="border-top mt-2 common-border-color cursor-pointer">
                  <div
                    className="hover-bg-color-titan-white px-3 mt-2 py-1 hover-color-primary text-color-secondary"
                    onClick={handleLogOut}
                  >
                    <i className="ri-logout-circle-r-line fs-18"></i>
                    <span className="fs-14 ms-2 fw-medium">Log Out</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================ 
                category model 
        ============================ */}
      <AdminModelWrapper
        centered={false}
        loading={loading}
        show={isModal}
        title={modalType === myProfileType ? "my profile" : "change password"}
        onSubmit={validation.handleSubmit}
        onHide={closeModal}
      >
        <Modal.Body>
          <div className="">
            {modalType === myProfileType ? (
              <>
                <div className="mx-auto mt-3">
                  <input
                    type="file"
                    hidden
                    name="image"
                    className="border common-border-color form-control"
                    onChange={(e) => {
                      handleFilePreview(e.target);
                    }}
                    id="uploadFile"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                  />
                  {/* {imageData || user?.url ? (
                    <div className="max-w-fit mx-auto position-relative">
                      <label
                        htmlFor="uploadFile"
                        className="hw-150 client-user-profile-img rounded-circle overflow-hidden position-relative"
                      >
                        <img
                          className="w-100 h-100 object-fit-cover cursor-pointer"
                          src={imageData || user?.url}
                          alt=""
                        />
                      </label>
                      <label htmlFor="uploadFile">
                        {" "}
                        <i className="ri-pencil-fill position-absolute top-0 fs-20 text-color-primary cursor-pointer"></i>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="uploadFile">
                        <div className="bg-color-primary text-white text-center">
                          Choose file
                        </div>
                      </label>
                    </div>
                  )} */}
                  <div className="max-w-fit mx-auto position-relative">
                    <label
                      htmlFor="uploadFile"
                      className="hw-150 client-user-profile-img rounded-circle overflow-hidden position-relative border common-border-color"
                    >
                      <img
                        className="w-100 h-100 object-fit-cover cursor-pointer"
                        src={imageData || user?.url || defaultUserImg}
                        alt="user-image"
                      />
                    </label>
                    <label htmlFor="uploadFile">
                      {" "}
                      <i className="ri-pencil-fill position-absolute top-0 fs-20 text-color-primary cursor-pointer"></i>
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <InputField
                    placeholder={"enter full name"}
                    label="full name *"
                    name="username"
                    id="username"
                    value={validation.values?.username || ""}
                    onChange={validation.handleChange}
                    onReset={validation.handleReset}
                    onBlur={validation.handleBlur}
                    type="text"
                    isValid={
                      validation.touched.username && validation.errors.username
                    }
                    errorMessage={validation.errors.username}
                  />
                </div>
                <div className="mt-3">
                  <InputField
                    readOnly={true}
                    placeholder="example@gmail.com"
                    label="full name *"
                    name="email"
                    id="email"
                    value={user?.email || ""}
                    type="email"
                  />
                </div>
                <div className="mt-3">
                  <InputField
                    label="phone number *"
                    name="phone"
                    id="phone"
                    value={validation.values?.phone || ""}
                    onChange={validation.handleChange}
                    onReset={validation.handleReset}
                    onBlur={validation.handleBlur}
                    type="number"
                    isValid={
                      validation.touched.phone && validation.errors.phone
                    }
                    errorMessage={validation.errors.phone}
                  />
                </div>
              </>
            ) : modalType === changePasswordType ? (
              <>
                <div className="mt-3">
                  <InputField
                    placeholder={"enter old password"}
                    label="old password *"
                    name="oldPassword"
                    id="oldPassword"
                    value={validation.values?.oldPassword || ""}
                    onChange={validation.handleChange}
                    onReset={validation.handleReset}
                    onBlur={validation.handleBlur}
                    type="password"
                    isValid={
                      validation.touched.oldPassword &&
                      validation.errors.oldPassword
                    }
                    errorMessage={validation.errors.oldPassword}
                  />
                </div>
                <div className="mt-3">
                  <InputField
                    placeholder={"enter new password"}
                    label="new password *"
                    name="newPassword"
                    id="newPassword"
                    value={validation.values?.newPassword || ""}
                    onChange={validation.handleChange}
                    onReset={validation.handleReset}
                    onBlur={validation.handleBlur}
                    type="password"
                    isValid={
                      validation.touched.newPassword &&
                      validation.errors.newPassword
                    }
                    errorMessage={validation.errors.newPassword}
                  />
                </div>
                <div className="mt-3">
                  <InputField
                    placeholder={"enter confirm password"}
                    label="confirm password *"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={validation.values?.confirmPassword || ""}
                    onChange={validation.handleChange}
                    onReset={validation.handleReset}
                    onBlur={validation.handleBlur}
                    type="password"
                    isValid={
                      validation.touched.confirmPassword &&
                      validation.errors.confirmPassword
                    }
                    errorMessage={validation.errors.confirmPassword}
                  />
                </div>
              </>
            ) : null}
          </div>
        </Modal.Body>
      </AdminModelWrapper>
    </header>
  );
};

export default Header;
