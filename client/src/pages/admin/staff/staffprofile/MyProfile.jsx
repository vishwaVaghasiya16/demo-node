import Layout from "./Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../../../../components/admin/inputField/SelectField";
import TextAreaField from "../../../../components/admin/inputField/TextAreaField";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../helpers/customFunctions";
import {
  getStaffDetailsThunk,
  updateUserDetails,
} from "../../../../store/actions";
import { useParams } from "react-router-dom";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enumsData } = useSelector((store) => store?.EnumsSlice);
  const { staffDetails, user, loading } = useSelector((store) => store.Auth);
  const { employeeid } = useParams();
  const ADMIN = Admin();
  const [editUrl, setEditUrl] = useState();

  const initialValues = {
    image: "",
    username: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
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
    username: yup.string().min(4).max(20).required("Please enter the username"),
    gender: yup.string().required("Please select gender"),
    dob: yup.date().required("Date of Birth is required"),
    phone: yup
      .string()
      .required("A phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "A phone number must be exactly 10 digits")
      .max(10, "A phone number must be exactly 10 digits"),
    address: yup
      .string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters long")
      .max(100, "Address must be less than 100 characters long"),
  });

  const validation = useFormik({
    name: "staff-account-details",
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const bodyFormData = new FormData();
      bodyFormData.append("image", values.image);
      bodyFormData.append("username", values.username);
      bodyFormData.append("phone", values.phone);
      bodyFormData.append("dob", values.dob);
      bodyFormData.append("gender", values.gender);
      bodyFormData.append("address", values.address);
      const id = staffDetails?._id;
      const result = await dispatch(
        updateUserDetails({ id, values: bodyFormData })
      );
      if (updateUserDetails.fulfilled.match(result)) {
        dispatch(getStaffDetailsThunk({ staff: employeeid }));
      }
    },
  });

  useEffect(() => {
    setEditUrl(staffDetails?.url);
    validation.setValues({
      image: staffDetails?.url,
      username: staffDetails?.username,
      phone: staffDetails?.phone,
      dob: formatDate(staffDetails?.dob),
      gender: staffDetails?.gender,
      address: staffDetails?.address,
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
              validation.touched.image && validation.errors.image
                ? "is-invalid"
                : "common-border-color"
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
              name="image"
              className="filepond filepond-input-multiple"
              isValid={false}
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
              name="username"
              id="username"
              label="Name *"
              placeholder="Enter Name"
              value={validation.values.username || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.username && validation.errors.username
              }
              errorMessage={validation.errors.username}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="phone"
              id="phone"
              label="phone number *"
              value={validation.values.phone || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={validation.touched.phone && validation.errors.phone}
              errorMessage={validation.errors.phone}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              readOnly={true}
              name="email"
              type="email"
              id="email"
              label="email address *"
              value={staffDetails?.email || ""}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              readOnly={true}
              name="joiningDate"
              id="joiningDate"
              type="date"
              label="joining date *"
              value={formatDate(staffDetails?.joiningDate) || ""}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="dob"
              type="date"
              id="dob"
              label="date of birth *"
              value={validation.values.dob || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={validation.touched.dob && validation.errors.dob}
              errorMessage={validation.errors.dob}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <SelectField
              name="gender"
              id="gender"
              label="gender"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              onReset={validation.handleReset}
              value={validation.values.gender || ""}
              isValid={validation.touched.gender && validation.errors.gender}
              errorMessage={validation.errors.gender}
            >
              <option value="">select gender</option>
              {Object.keys(enumsData)?.length > 0 &&
                Object.keys(enumsData?.genderTypeEnum)?.map((item, key) => {
                  return (
                    <option key={key} value={enumsData?.genderTypeEnum[item]}>
                      {enumsData?.genderTypeEnum[item]}
                    </option>
                  );
                })}
            </SelectField>
          </Col>
          <Col xs={12}>
            <TextAreaField
              rows={1}
              name="address"
              id="address"
              label="address"
              placeholder="enter address"
              value={validation.values.address || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={validation.touched.address && validation.errors.address}
              errorMessage={validation.errors.address}
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
              {loading ? "Updating..." : "Update"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default MyProfile;
