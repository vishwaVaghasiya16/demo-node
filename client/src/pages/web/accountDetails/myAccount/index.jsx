import Layout from "../Layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import ChangePassword from "../../../auth/ChangePassword";
import { updateUserDetails } from "../../../../store/actions";
import { useEffect, useState } from "react";
import defaultUserImg from "/assets/admin/defaultUser.webp";

const MyAccount = () => {
  const { user, loading } = useSelector((store) => store?.Auth);
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const [imageData, setImageData] = useState();
  const dispatch = useDispatch();

  // Initial value for the formik
  const initialValues = {
    username: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Schema for the formik
  const validationSchema = yup.object({
    username: yup.string().min(4).max(20).required("Full name is required"),
    phone: yup
      .string()
      .required("A phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "A phone number must be exactly 10 digits")
      .max(10, "A phone number must be exactly 10 digits"),
    oldPassword: yup.string(),
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
  });

  // Validation for the registration
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.oldPassword) {
          const formData = new FormData();
          for (const key in values) {
            formData.append(`${key}`, values[key]);
          }
          dispatch(updateUserDetails({ id: user?._id, values: formData }));
        } else {
          delete values.oldPassword;
          delete values.newPassword;
          delete values.confirmPassword;

          const formData = new FormData();
          for (const key in values) {
            formData.append(`${key}`, values[key]);
          }

          dispatch(updateUserDetails({ id: user?._id, values: formData }));
        }
      } catch (error) {
        console.log("[ERROR]:", error);
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
    if (Object.keys(user).length > 0) {
      validation.setFieldValue("username", user?.username || "");
      validation.setFieldValue("phone", user?.phone || "");
    }
  }, [user]);

  return (
    <Layout>
      <Form
        className={`account-details-form`}
        onSubmit={validation.handleSubmit}
      >
        <div className={`border br-10 bg-white p-3 p-md-4 circle-file-pond`}>
          <div className="mx-auto ">
            <input
              type="file"
              hidden
              name="image"
              className="form-control"
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

          <div className={`mb-3`}>
            <Form.Label
              className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
            >
              Full Name
            </Form.Label>
            <Form.Control
              name="username"
              value={validation.values.username}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type="text"
              placeholder="Enter full name"
              className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
              isInvalid={Boolean(
                validation.touched.username && validation.errors.username
              )}
            />
            {validation.touched.username && validation.errors.username ? (
              <p className={`fs-14 text-danger text-capitalize mt-1`}>
                {validation.errors.username}
              </p>
            ) : null}
          </div>
          <div className={`mb-3`}>
            <Form.Label
              className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
            >
              Email Address
            </Form.Label>
            <Form.Control
              name="email"
              value={user?.email || ""}
              readOnly
              type="email"
              placeholder="example@gmail.com"
              className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
            />
          </div>
          <div>
            <Form.Label
              className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
            >
              Phone No.
            </Form.Label>
            <div className="d-flex align-items-center text-color-secondary input-field-bg br-5 fw-normal border form-control-border common-border-color">
              <p className="m-0 ps-12 fs-16">+91</p>
              <Form.Control
                name="phone"
                value={validation.values.phone}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                type="text"
                placeholder=""
                className={`focus-border-none h-45 border-0 fs-16 bg-transparent border-none`}
                isInvalid={Boolean(
                  validation.touched.phone && validation.errors.phone
                )}
              />
            </div>
            {/* <Form.Control
              name="phone"
              value={validation.values.phone}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type="number"
              placeholder="Enter phone no."
              className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
            /> */}
            {validation.touched.phone && validation.errors.phone ? (
              <p className={`fs-14 text-danger text-capitalize mt-1`}>
                {validation.errors.phone}
              </p>
            ) : null}
          </div>
          {enumsData?.authProviderEnum &&
          user.authProvider === enumsData?.authProviderEnum.LOCAL ? (
            <div className={`mt-3 mt-md-4`}>
              <h2
                className={`text-center text-color-primary fw-medium fs-5 lh-base ls-1px mb-2 mb-md-3`}
              >
                Password Change
              </h2>
              <ChangePassword validation={validation} />
            </div>
          ) : null}
          <Button
            disabled={loading}
            type="submit"
            className={`mt-3 mt-md-4 w-100 bg-color-primary border-0 br-5 h-45 transition fs-16`}
          >
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default MyAccount;
