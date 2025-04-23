import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Dashboard } from "../../../data/dashboard";
import { useNavigate } from "react-router-dom";
import { currencyHandler } from "../../../helpers/currencyHandler";
import { formatNumber } from "../../../helpers/customFunctions";
import { currency } from "../../../helpers/enum";

const DetailsCards = () => {
  const navigate = useNavigate();
  const { data } = useSelector((store) => store.Dashboard);
  const dashboard = Dashboard();
  const formattedValue = (value) => {
    if (value >= 1000) {
      return {
        formatted: (value / 1000).toFixed(2),
        suffix: "k",
      };
    }
    return {
      formatted: value,
      suffix: "",
    };
  };
  return (
    <>
      <Row className={`px-1`}>
        {dashboard.cardDetails.map((ele, index) => {
          const name = ele.name;
          const iconBackground = ele.iconBackground;
          const iconImage = ele.iconImage;
          const redirect = ele.redirect;
          const state = ele.state;
          const title = ele.title;
          const key = ele.key;
          const { formatted, suffix } = formattedValue(234234.234234);
          return (
            <Col key={index} sm={6} xl={3} className={`px-2 mt-3`}>
              <Button
                onClick={() => {
                  if (state) {
                    navigate(redirect, { state: { status: name } });
                  } else {
                    navigate(redirect);
                  }
                }}
                className={`d-block w-100 p-3 hover-translate-y--5 transition bg-white br-5 border common-border-color`}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className={`hw-50 p-2 br-5 ${iconBackground} d-flex align-items-center justify-content-center`}
                  >
                    {/* <i className="ri-money-dollar-circle-line text-white fw-light fs-2"></i> */}
                    <img
                      src={iconImage}
                      alt="earning-icon"
                      className={`hw-28 object-fit-cover`}
                    />
                  </div>
                  <div className={`text-start`}>
                    <span
                      className={`d-block text-color-secondary fs-13 fw-medium lh-base text-uppercase`}
                    >
                      {title}
                    </span>
                    <span
                      className={`d-block text-color-primary fs-16 fw-semibold lh-base text-uppercase`}
                    >
                      {key === "totalEarning" ? (
                        <span>
                          {data[key] ? currency + formatNumber(data[key]) : 0}
                        </span>
                      ) : data[key] ? (
                        currencyHandler(data[key], false)
                      ) : (
                        0
                      )}
                    </span>
                  </div>
                </div>
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DetailsCards;
