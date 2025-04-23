import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ContactUsDetails = () => {
  const { call, email, locationDetails } = useSelector(
    (store) => store.ContactUs
  );
  return (
    <Row className={`contact-us align-items-center justify-content-center`}>
      <Col xs={12} md={4} xl={12}>
        <div className={`custom-height common-border px-4 pb-3 br-10 mb-4`}>
          <div className={`logo border rounded-circle bg-color-primary`}>
            <img src={call?.img} alt="call-logo" className={`call-logo`} />
          </div>
          <div className={`text-center`}>
            <h2
              className={`text-color-primary fw-medium fs-18 lh-base mt-2 opacity-75`}
            >
              {call?.title}
            </h2>
            <p className={`fw-normal fs-12 common-text-color mb-0`}>
              {call?.description}
            </p>
            <hr className={`mt-2 mb-3`} />
            <a
              href={`tel:${call.phoneNo}`}
              className={`btn p-0 border-0 cursor-pointer bg-transparent p-0 border-0 text-color-primary fw-medium fs-16 lh-base mx-auto`}
            >
              {call.phoneNo}
            </a>
          </div>
        </div>
      </Col>
      <Col xs={12} md={4} xl={12}>
        <div className={`custom-height common-border px-4 pb-3 br-10 mb-4`}>
          <div className={`logo border rounded-circle bg-color-primary`}>
            <img src={email?.img} alt="email-logo" className={`email-logo`} />
          </div>
          <div className={`text-center`}>
            <h2
              className={`text-color-primary fw-medium fs-18 lh-base mt-2 opacity-75`}
            >
              {email?.title}
            </h2>
            <p className={`fw-normal fs-12 common-text-color mb-0`}>
              {email?.description}
            </p>
            <hr className={`mt-2 mb-3`} />
            <a href={`mailto:${email.emailId}`}
              className={`bg-transparent p-0 border-0 text-color-primary fw-medium fs-16 lh-base mx-auto`}
            >
              {email.emailId}
            </a>
          </div>
        </div>
      </Col>
      <Col xs={12} md={4} xl={12}>
        <div className={`custom-height common-border px-4 pb-3 br-10 mb-4`}>
          <div className={`logo border rounded-circle bg-color-primary`}>
            <img
              src={locationDetails?.img}
              alt="locationDetails-logo"
              className={`locationDetails-logo`}
            />
          </div>
          <div className={`text-center`}>
            <h2
              className={`text-color-primary fw-medium fs-18 lh-base mt-2 opacity-75`}
            >
              {locationDetails?.title}
            </h2>
            <p className={`fw-normal fs-12 common-text-color mb-0`}>
              {locationDetails?.description}
            </p>
            <hr className={`mt-2 mb-3`} />
            <a
              href="https://www.google.com/maps/place/LogicGo+Infotech/@21.2248478,72.8050928,17z/data=!3m1!5s0x3be04e945d9ef9c7:0x90e08d1ce5131b9b!4m16!1m9!3m8!1s0x3be04fb4fd1f8689:0xf0c967ea9e5ac3f4!2sLogicGo+Infotech!8m2!3d21.2248428!4d72.8076677!9m1!1b1!16s%2Fg%2F11gy2s2b5n!3m5!1s0x3be04fb4fd1f8689:0xf0c967ea9e5ac3f4!8m2!3d21.2248428!4d72.8076677!16s%2Fg%2F11gy2s2b5n?entry=ttu"
              target="_blank"
              className={`bg-transparent p-0 border-0 text-color-primary fw-medium fs-16 lh-base mx-auto`}
            >
              {locationDetails.address}
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ContactUsDetails;
