import PropTypes from "prop-types";

const BreadCrumb = ({ title, pageTitle, subPageTitle }) => {
  const arrow = ">";
  return (
    <>
      <ul
        className={`bread-crumb m-0 p-0 d-flex align-items-center justify-content-center gap-1 flex-wrap`}
      >
        {title ? (
          <li
            className={`text-capitalize fw-normal lh-base responsive fs-14 ls-1px text-color-secondary`}
          >
            {" "}
            <div className="truncate-line-1">{title}</div>
            {/* <span> {arrow}</span> */}
          </li>
        ) : null}

        {pageTitle ? (
          <li
            className={`text-capitalize fw-normal lh-base responsive fs-14 ls-1px text-color-secondary`}
          >
            <div className="truncate-line-1">
              <span> {arrow} </span>
              {pageTitle}
            </div>
          </li>
        ) : null}

        {subPageTitle ? (
          <li
            className={`text-capitalize fw-normal lh-base responsive fs-14 ls-1px text-color-secondary`}
          >
            {" "}
            <div className="truncate-line-1">
              <span> {arrow} </span>
              {subPageTitle}
            </div>
          </li>
        ) : null}
      </ul>
    </>
  );
};

BreadCrumb.propTypes = {
  title: PropTypes.any,
  pageTitle: PropTypes.any,
  subPageTitle: PropTypes.any,
};

export default BreadCrumb;
