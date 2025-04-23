import PropTypes from "prop-types";

const TextHoverAnimation = ({ content, word }) => {
  return (
    <div>
      {/* <div className="position-relative fill-text-hover-parent max-w-fit mx-auto col-6 ">
        <div className="m-0 p-0 d-fex justify-content-center align-items-center h-200px responsive ">
          <h2
            data-text={word}
            className="ff-sorts  fs-fill-text fill-text-hover fw-normal text-center "
          >
            {word}
          </h2>
        </div>
        <p
          className="mb-0 mb-md-3 text-center position-absolute bottom--30px start-50 translate-middle fs-3 fw-medium text-color-black text-capitalize text-nowrap"
          data-aos="fade-right"
        >
          {content}
        </p>
      </div> */}
      <div
        className={`fill-text-hover-parent position-relative max-w-fit mx-auto`}
      >
        <div className=" w-fit mx-auto">
          <h2
            data-text={word}
            className="fill-text-hover overflow-hidden  ff-sorts fw-normal fs-fill-text lh-1 mt-3 "
          >
            {word}
          </h2>
        </div>
        <span
          className={`fs-3 fw-medium text-capitalize text-nowrap content position-absolute mt-3 top-50 start-50 translate-middle z-3 fill-text-hover-parent text-color-primary `}
        >
          {content}
        </span>
      </div>
    </div>
  );
};

TextHoverAnimation.propTypes = {
  content: PropTypes.node,
  word: PropTypes.node,
};

export default TextHoverAnimation;
