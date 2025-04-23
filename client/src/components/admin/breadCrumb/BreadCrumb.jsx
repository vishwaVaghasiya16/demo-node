import PropTypes from "prop-types";

const BreadCrumb = ({ title, pageTitle, subPageTitle, defaultTitle = "" }) => {
  const arrow = <i className="ri-arrow-right-double-line"></i>;
  return (
    <div
      className={`mb-3 gap-2 d-flex flex-wrap align-items-center justify-content-between`}
    >
      {defaultTitle ? (
        <div
          className={`text-color-primary responsive fs-18 fw-medium lh-base`}
        >
          {defaultTitle}
        </div>
      ) : (
        <div
          className={`text-color-primary responsive fs-18 fw-medium text-capitalize lh-base`}
        >
          {subPageTitle || pageTitle || title}
        </div>
      )}
      <div>
        {" "}
        <ul
          className={`bread-crumb m-0 p-0 d-flex align-items-center gap-1 text-truncate`}
        >
          {title ? (
            <li
              className={`text-capitalize lh-base responsive fs-14 fw-medium text-color-secondary`}
            >
              {title}
              {/* <span> {arrow}</span> */}
            </li>
          ) : null}

          {pageTitle ? (
            <li
              className={`text-capitalize lh-base responsive fs-14 fw-medium text-color-secondary transition-none`}
            >
              <span>{arrow} </span>
              <span
                className={`${
                  pageTitle && !subPageTitle
                    ? "text-color-primary fw-semibold"
                    : "text-color-secondary fw-medium"
                }`}
              >
                {pageTitle}
              </span>
            </li>
          ) : null}

          {subPageTitle ? (
            <li
              className={`text-capitalize lh-base responsive fs-14 fw-medium text-color-secondary transition-none`}
            >
              <span>{arrow}</span>{" "}
              <span
                className={`${
                  subPageTitle
                    ? "text-color-primary fw-semibold"
                    : "text-color-secondary fw-medium"
                }`}
              >
                {subPageTitle}
              </span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

BreadCrumb.propTypes = {
  defaultTitle: PropTypes.any,
  title: PropTypes.any,
  pageTitle: PropTypes.any,
  subPageTitle: PropTypes.any,
};

export default BreadCrumb;
