import React from "react";
import PropTypes from "prop-types";

const DynamicNoData = ({
  //   coverClass = "bg-color-titan-white",
  coverClass = "",
  icon = "msoeawqm",
  title = "Oops ! No Data Yet !",
  subTitle = "You will have to add document to show here",
}) => {
  return (
    <React.Fragment>
      <div
        className={`py-lg-4 w-100 h-100 d-flex align-items-center justify-content-center ${coverClass}`}
      >
        <div className="text-center">
          <div className="mb-1">
            <lord-icon
              src={`https://cdn.lordicon.com/${icon}.json`}
              trigger="loop"
              colors="primary:#405189,secondary:#3695e0"
              style={{
                width: "90px",
                height: "90px",
              }}
            ></lord-icon>
          </div>
          <h5 className={`responsive text-color-primary fs-20 fw-semibold`}>
            {title}
          </h5>
          <p className="mt-2 mb-0 responsive text-color-secondary fs-14 fw-medium">
            {subTitle}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

DynamicNoData.propTypes = {
  coverClass: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  subTitle: PropTypes.any,
};

export default DynamicNoData;
