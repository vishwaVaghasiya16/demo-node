import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

const Stepper = ({
  className,
  step = 0,
  steps = ["My Cart", "Delivery", "Payment"],
}) => {
  const [completeStep, setCompleteStep] = useState();
  const sm = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setCompleteStep(step);
  }, [step]);

  return (
    <div className={`stepper ${className}`}>
      <Col xs={12} sm={10} className="d-flex justify-content-evenly align-items-start mx-auto overflow-x-scroll overflow-track-none">
        {steps?.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex flex-column justify-content-center align-items-center w-100 stepper-lines"
            >
              <div
                className={`w-100 d-flex justify-content-center position-relative ${
                  completeStep >= index
                    ? "stepper-progress-line-active"
                    : "stepper-progress-line "
                } `}
              >
                <i
                  className={` w-24px h-24px ${
                    completeStep >= index
                      ? "text-white bg-color-primary ri-check-line"
                      : "text-color-titan-white  bg-color-titan-white border"
                  }  position-relative z-1 d-block mx-auto fs-16 responsive rounded-circle  d-flex align-items-center justify-content-center`}
                ></i>
              </div>
              {(sm ? index == completeStep : true) && <p className="responsive fs-14 text-color-primary mt-1 text-capitalize text-truncate">
                {item}
              </p>}
            </div>
          );
        })}
      </Col>
    </div>
  );
};

Stepper.propTypes = {
  className: PropTypes.string,
  step: PropTypes.number,
};

export default Stepper;
