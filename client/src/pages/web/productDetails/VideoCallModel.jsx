import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Img from "/assets/web/home/video-call-bg.webp";
import { createVideoCallScheduleThunk } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const VideoCallModel = (props) => {
  const languages = ["English", "Hindi", "Gujarati"];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.VideoCall);

  const initialValues = {
    language: "gujarati",
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    // message: "",
  };

  const validationSchema = yup.object({
    language: yup.string().required("language is required"),
    name: yup.string().required("full name is required"),
    email: yup
      .string()
      .email("Enter valid email address")
      .required("email is required"),
    phone: yup
      .string("Enter valid number")
      .min(10, "Enter valid number")
      .max(10, "Enter valid number")
      .required("Phone number is required"),
    date: yup.string().required("date is required"),
    time: yup.string().required("time is required"),
  });

  const validation = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await dispatch(createVideoCallScheduleThunk(values));
      if (createVideoCallScheduleThunk.fulfilled.match(response)) {
        props.onHide();
      }
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="position-relative btn-close-none bg-color-titan-white"
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="mx-auto fs-20 text-color-primary fw-medium"
        >
          Schedule a Video Call
          <Button
            className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-50 translate-middle border  bg-color-titan-white text-color-black"
            color="transparent"
            type="button"
            onClick={() => props.onHide()}
          >
            <i className="ri-close-line fs-18"></i>
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=" p-3 p-md-4 pb-0 ">
        <Form onSubmit={validation.handleSubmit}>
          <p className="mb-1 mb-md-2 text-color-primary fs-16 fw-medium mt-md-2">
            Select Language
          </p>
          <div className="d-flex gap-2 gap-md-3 flex-wrap">
            {languages.map((item, index) => {
              return (
                <Button
                  type="button"
                  onClick={() => setSelectedLanguage(item)}
                  key={index}
                  className={`${
                    selectedLanguage == item
                      ? "bg-color-primary text-white"
                      : "bg-color-titan-white text-color-primary"
                  } fs-14 py-2 px-3 br-5 border border-color-light-gray`}
                >
                  {item}
                </Button>
              );
            })}
          </div>
          {validation.touched.language && validation.errors.language ? (
            <p className={`fs-14 text-danger text-capitalize mt-1`}>
              {validation.errors.language}
            </p>
          ) : null}
          <Form.Label
            className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
          >
            Full Name
          </Form.Label>
          <Form.Control
            name="name"
            value={validation.values.name}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="text"
            placeholder="Enter full name"
            className={`input-field-bg br-5 h-45 fw-normal placeholder-fs-14 fs-14 text-color-secondary border-4`}
          />
          {validation.touched.name && validation.errors.name ? (
            <p className={`fs-14 text-danger text-capitalize mt-1 mb-0`}>
              {validation.errors.name}
            </p>
          ) : null}
          <Form.Label
            className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
          >
            Emil Address
          </Form.Label>
          <Form.Control
            name="email"
            value={validation.values.email}
            onChange={validation.handleChange}
            onReset={validation.handleReset}
            onBlur={validation.handleBlur}
            type="text"
            placeholder="example@gmail.com"
            className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
          />
          {validation.touched.email && validation.errors.email ? (
            <p className={`fs-14 text-danger text-capitalize mt-1 mb-0`}>
              {validation.errors.email}
            </p>
          ) : null}
          <Form.Label
            className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
          >
            Phone Number
          </Form.Label>
          <div className="d-flex align-items-center text-color-secondary input-field-bg br-5 fw-normal border form-control-border">
            <p className="m-0 ps-12 fs-14">+91</p>
            <Form.Control
              name="phone"
              value={validation.values.phone}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type="number"
              className={`h-45 focus-border-none placeholder-fs-14 fs-14 bg-transparent border-none border-full-none`}
            />
          </div>
          {validation.touched.phone && validation.errors.phone ? (
            <p className={`fs-14 text-danger text-capitalize mt-1 mb-0`}>
              {validation.errors.phone}
            </p>
          ) : null}

          <Row className="">
            <Col xs={6}>
              <Form.Label
                className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
              >
                Date
              </Form.Label>
              <Form.Control
                name="date"
                value={validation.values.date}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                type="date"
                placeholder="Select date"
                className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
              />
              {validation.touched.date && validation.errors.date ? (
                <p className={`fs-14 text-danger text-capitalize mt-1 mb-0`}>
                  {validation.errors.date}
                </p>
              ) : null}
            </Col>
            <Col xs={6}>
              <Form.Label
                className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
              >
                Time
              </Form.Label>
              <Form.Control
                name="time"
                value={validation.values.time}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                type="time"
                placeholder="Select time"
                className={`input-field-bg br-5 h-45 border-0 fw-normal placeholder-fs-14 fs-14  text-color-secondary`}
              />
              {validation.touched.time && validation.errors.time ? (
                <p className={`fs-14 text-danger text-capitalize mt-1 mb-0`}>
                  {validation.errors.time}
                </p>
              ) : null}
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label
              className={`mt-3 mt-md-4 text-color-primary mb-1 mb-md-2 fw-medium fs-16 text-capitalize lh-base`}
            >
              Phone Message
            </Form.Label>
            <Form.Control
              placeholder="Enter Message"
              className="input-field-bg fs-14 placeholder-fs-14 p-12"
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
        <img className="mx-auto d-block video-call-img w-75" src={Img} alt="" />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          type="submit"
          className="primary-btn w-100 fs-14"
          onClick={validation.handleSubmit}
          disabled={loading ? true : false}
        >
          {" "}
          {loading ? "Loading..." : "SCHEDULE A VIDEO CALL"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

VideoCallModel.propTypes = {
  onHide: PropTypes.any,
};

export default VideoCallModel;
