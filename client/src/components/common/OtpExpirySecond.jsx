import { useEffect, useState } from "react";
import { formatSecondsToMMSS } from "./MomentFun";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const OtpExpirySecond = ({ seconds }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(seconds || 30);

  useEffect(() => {
    setTime(seconds || 30);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, time]);

  return (
    <div className={`text-center`}>
      <span className={`fs-16 lh-base ls-1px fw-normal text-color-primary`}>
        {formatSecondsToMMSS(time, "mm:ss")}
      </span>
    </div>
  );
};

OtpExpirySecond.propTypes = {
  seconds: PropTypes.node,
};

export default OtpExpirySecond;
