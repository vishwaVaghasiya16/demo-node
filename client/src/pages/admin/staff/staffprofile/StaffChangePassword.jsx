import { FilePond } from "react-filepond";
import Layout from "./Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUserDetails } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";
import { useEffect, useState } from "react";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { useNavigate } from "react-router-dom";

const StaffChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staffDetails, user, loading } = useSelector((store) => store.Auth);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const ADMIN = Admin();
  const [editUrl, setEditUrl] = useState();

  const initialValues = {
    // image: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    image: yup.mixed(),
    // .required("An image is required")
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.size <= FILE_SIZE
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
    // ),
    oldPassword: yup.string(),
    newPassword: yup.string().when("oldPassword", {
      is: (val) => val?.length > 0,
      then: (schema) => schema.required("New password is required"),
      otherwise: (schema) => schema,
    }),
    confirmPassword: yup.string().when("oldPassword", {
      is: (val) => val?.length > 0, // Check if oldPassword is filled
      then: (schema) =>
        schema
          .required("Confirm password is required")
          .oneOf([yup.ref("newPassword")], "Passwords must match"),
      otherwise: (schema) => schema,
    }),
  });

  const validation = useFormik({
    name: "staff-change-password",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const id = staffDetails?._id;
      const bodyFormData = new FormData();
      bodyFormData.append("image", values.image);
      bodyFormData.append("oldPassword", values.oldPassword);
      bodyFormData.append("newPassword", values.newPassword);
      bodyFormData.append("confirmPassword", values.confirmPassword);
      const result = await dispatch(
        updateUserDetails({ id, values: bodyFormData })
      );
      if (updateUserDetails.fulfilled.match(result)) {
        resetForm();
      }
    },
  });

  useEffect(() => {
    setEditUrl(staffDetails?.url);
    validation.setValues({
      image: staffDetails?.url,
    });
  }, [staffDetails]);

  return (
    <Layout>
      <Form>
        <div>
          <Form.Label className="truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium mb-1">
            your photo
          </Form.Label>
          <div className={`border common-border-color br-5`}>
            <MyFilePondComponent
              onlyImage={true}
              validation={validation}
              previewUrl={editUrl || ""}
              name="image"
            />
          </div>
          {/* <div
            className={`br-5 overflow-hidden border ${
              validation.errors.image ? "is-invalid" : "common-border-color"
            }`}
          >
            <FilePond
              onaddfile={(error, file) => {
                handleStaffAccountImage(file.file);
              }}
              onremovefile={() => {
                validation.setFieldValue("image", "");
              }}
              acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
              maxFiles={1}
              name="backgroundImage"
              className="filepond filepond-input-multiple"
            />
          </div> */}
          {validation.touched.image && validation.errors.image && (
            <p className="text-danger mt-1 fs-12 fw-medium text-capitalize">
              {validation.errors.image}
            </p>
          )}
        </div>
        <Row className={`mt-3`}>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="oldPassword"
              type="password"
              id="oldPassword"
              label="old password *"
              placeholder="enter old password"
              value={validation.values.oldPassword || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.oldPassword && validation.errors.oldPassword
              }
              errorMessage={validation.errors.oldPassword}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="newPassword"
              type="password"
              id="newPassword"
              label="new password *"
              placeholder="enter new password"
              value={validation.values.newPassword || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.newPassword && validation.errors.newPassword
              }
              errorMessage={validation.errors.newPassword}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              label="confirm password *"
              placeholder="enter confirm password"
              value={validation.values.confirmPassword || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.confirmPassword &&
                validation.errors.confirmPassword
              }
              errorMessage={validation.errors.confirmPassword}
            />
          </Col>
        </Row>
        <Row className={`mt-lg-5`}>
          <Col>
            {/* <Button className="admin-primary-btn bg-color-secondary w-100 fs-14"> */}
            <Button
              onClick={() => navigate(ADMIN.STAFF.path)}
              className={`border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100`}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              onClick={validation.handleSubmit}
              type="submit"
              disabled={
                staffDetails?.role === enumsData?.userRoleEnum?.ADMIN &&
                user?.role !== staffDetails?.role
                  ? true
                  : loading
              }
              className="admin-primary-btn w-100 fs-14"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default StaffChangePassword;
