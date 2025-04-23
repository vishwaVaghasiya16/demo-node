import { useFormik } from "formik";
import * as yup from "yup";
import Layout from "../Layout";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postContactUsThunk } from "../../../../store/actions";
// import ContactUsDetails from "../../../../components/web/ContactUsDetails";

const ContactUs = () => {
  const { loading } = useSelector((store) => store.ContactUs);
  const dispatch = useDispatch();

  // Initial value for the formik
  const initialValues = {
    name: "",
    email: "",
    message: "",
    phone: "",
  };

  // Schema for the formik
  const validationSchema = yup.object({
    name: yup.string().min(4).max(20).required("Name is required"),
    email: yup.string().email().required("Email is required"),
    message: yup.string().required("Message is required"),
    phone: yup
      .string()
      .required("A phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "A phone number must be exactly 10 digits")
      .max(10, "A phone number must be exactly 10 digits"),
  });

  // Validation for the registration
  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(postContactUsThunk(values));
      resetForm();
    },
  });

  return (
    <Layout>
      <div className={`border br-10 bg-white p-3 p-md-4`}>
        <div className={`mb-1 mb-md-3`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1765185772697!2d72.80508741134128!3d21.22484778093245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fb4fd1f8689%3A0xf0c967ea9e5ac3f4!2sLogicGo%20Infotech!5e0!3m2!1sen!2sin!4v1712055220016!5m2!1sen!2sin"
            width="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`map-iframe filter-grayscale br-5 border`}
          ></iframe>
        </div>
        <div>
          <h2 className={`ls-1px lh-sm fs-20 text-color-primary mb-1 mb-md-3`}>
            Get in Touch
          </h2>
          <Form
            className={`account-details-form contact-us-form`}
            onSubmit={validation.handleSubmit}
          >
            <div className={`br-10 bg-white`}>
              <div className={`d-flex flex-wrap align-items-center mb-3`}>
                <Col xs={12} md={4} className={`px-12 mb-3 mb-md-0`}>
                  <div>
                    <Form.Label
                      className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                    >
                      Name
                    </Form.Label>
                    <Form.Control
                      name="name"
                      value={validation.values.name}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type="text"
                      placeholder="Enter name"
                      className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                      isInvalid={Boolean(
                        validation.touched.name && validation.errors.name
                      )}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4} className={`px-12 mb-3 mb-md-0`}>
                  <div>
                    <Form.Label
                      className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                    >
                      Email Address
                    </Form.Label>
                    <Form.Control
                      name="email"
                      value={validation.values.email}
                      onChange={validation.handleChange}
                      onReset={validation.handleReset}
                      onBlur={validation.handleBlur}
                      type="email"
                      placeholder="example@gmail.com"
                      className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                      isInvalid={Boolean(
                        validation.touched.email && validation.errors.email
                      )}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4} className={`px-12`}>
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
                  </div>
                </Col>
              </div>
              <div>
                <Form.Label
                  className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                >
                  Message
                </Form.Label>
                <Form.Control
                  name="message"
                  value={validation.values.message}
                  onChange={validation.handleChange}
                  onReset={validation.handleReset}
                  onBlur={validation.handleBlur}
                  as="textarea"
                  placeholder="Enter message"
                  className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                  isInvalid={Boolean(
                    validation.touched.message && validation.errors.message
                  )}
                />
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className={`mt-3 mt-md-4 w-100 bg-color-primary border-0 br-5 h-45 transition fs-16`}
            >
              {loading ? "Loading..." : "Send Message"}
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
