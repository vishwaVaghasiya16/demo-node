import { Placeholder } from "react-bootstrap";

const ContactUsLoader = () => {
  return (
    <div
      className={`border common-border-color common-box-shadow contact-us-box bg-color-primary br-10 p-3 position-relative`}
    >
      <div className={`d-flex align-items-start justify-content-between`}>
        <div className={`w-75`}>
          <div className={`w-50`}>
            <Placeholder animation="glow">
              <Placeholder
                className={`bg-color-secondary br-10 h-100 w-100`}
                xs={2}
              />
            </Placeholder>
          </div>
          <div className={`w-75`}>
            <Placeholder animation="glow">
              <Placeholder
                className={`bg-color-secondary br-10 h-100 w-100`}
                xs={2}
              />
            </Placeholder>
          </div>
        </div>
        <div className={`w-25`}>
          <Placeholder animation="glow">
            <Placeholder
              className={`bg-color-secondary br-10 h-100 w-100`}
              xs={2}
            />
          </Placeholder>
        </div>
      </div>
      <div className="contact-us-message">
        <div>
          <Placeholder animation="glow">
            <Placeholder
              className={`bg-color-secondary br-10 py-5 mt-3 h-100 w-100`}
              xs={2}
            />
          </Placeholder>
        </div>
      </div>
    </div>
  );
};

export default ContactUsLoader;
