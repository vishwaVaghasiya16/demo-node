import Layout from "./Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import gmail from "/assets/admin/gmail.webp";
import facebook from "/assets/admin/facebook.webp";
import instagram from "/assets/admin/instagram.webp";
import linkedin from "/assets/admin/linkedin.webp";
import twitter from "/assets/admin/twitter.webp";
import { updateUserDetails } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ADMIN as Admin } from "../../../../routes/routesConstants";
import { useNavigate } from "react-router-dom";

const StaffConnections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staffDetails, user, loading } = useSelector((store) => store.Auth);
  const ADMIN = Admin();
  const { enumsData } = useSelector((store) => store.EnumsSlice);

  const initialValues = {
    gmail: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  };

  const validationSchema = yup.object({
    gmail: yup.string().required(),
    facebook: yup.string().required(),
    instagram: yup.string().required(),
    linkedin: yup.string().required(),
    twitter: yup.string().required(),
  });

  const validation = useFormik({
    name: "staff-account-details",
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const id = staffDetails?._id;
      dispatch(updateUserDetails({ id, values }));
    },
  });

  useEffect(() => {
    validation.setValues({
      gmail: staffDetails?.gmail || "",
      facebook: staffDetails?.facebook || "",
      instagram: staffDetails?.instagram || "",
      linkedin: staffDetails?.linkedin || "",
      twitter: staffDetails?.twitter || "",
    });
  }, [staffDetails]);

  return (
    <Layout>
      <Form>
        <Row>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="gmail"
              type="email"
              id="gmail"
              label="gmail"
              placeholder="example@gmail.com"
              value={validation.values.gmail || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={validation.touched.gmail && validation.errors.gmail}
              errorMessage={validation.errors.gmail}
              iconImage={gmail}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="facebook"
              id="facebook"
              label="facebook"
              placeholder="enter facebook URL"
              value={validation.values.facebook || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.facebook && validation.errors.facebook
              }
              errorMessage={validation.errors.facebook}
              iconImage={facebook}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="instagram"
              id="instagram"
              label="instagram"
              placeholder="enter instagram URL"
              value={validation.values.instagram || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.instagram && validation.errors.instagram
              }
              errorMessage={validation.errors.instagram}
              iconImage={instagram}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="linkedin"
              id="linkedin"
              label="linkedin"
              placeholder="enter linkedin URL"
              value={validation.values.linkedin || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={
                validation.touched.linkedin && validation.errors.linkedin
              }
              errorMessage={validation.errors.linkedin}
              iconImage={linkedin}
            />
          </Col>
          <Col sm={6} className={`mb-3`}>
            <InputField
              name="twitter"
              id="twitter"
              label="twitter"
              placeholder="enter twitter URL"
              value={validation.values.twitter || ""}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              isValid={validation.touched.twitter && validation.errors.twitter}
              errorMessage={validation.errors.twitter}
              iconImage={twitter}
            />
          </Col>
        </Row>
        <Row className={`mt-lg-5`}>
          <Col>
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
              {loading ? "Saving" : "Save"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default StaffConnections;
