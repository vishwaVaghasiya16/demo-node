import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ToggleMenu = ({
  children,
  onClick,
  isOpen,
  rootClass = "body",
  margin = "mx-auto",
  iconColor = "text-color-primary",
} = {}) => {
  const [isTopMenu, setIsTopMenu] = useState(false);

  // Memoize the handlePopup function using useCallback
  const handlePopup = (event) => {
    event.preventDefault();
    const clickY = event?.clientY;
    const rootH = document?.querySelector(rootClass);
    const classRect = clickY - rootH?.getBoundingClientRect()?.top;
    const menuH = document?.querySelector(".menu-popup")?.clientHeight + 18;
    const yPos = classRect + menuH > rootH?.clientHeight;
    setIsTopMenu(menuH <= rootH?.clientHeight ? yPos : false);
    onClick(event);
  }; // Include dependencies used in handlePopup

  // Example of using useMemo for computed class name
  const menuPopupClass = useMemo(() => {
    return isOpen
      ? isTopMenu
        ? "visible active-top"
        : "visible active-bottom"
      : "invisible";
  },[isOpen]);

  return (
    <div
      className={`menu-popup-parent max-w-fit ${margin}`}
      onClick={(e) => handlePopup(e)}
    >
      <p className="bg-light bg-opacity-20 border border-color-blue cursor-pointer hover-bg-opacity-30 w-21 h-21 d-flex align-items-center justify-content-center rounded-circle p-0 m-0">
        <i className={`ri-more-fill ${iconColor} fs-12 fw-bold`}></i>
      </p>
      <div
        className={`menu-popup bg-white br-5 border common-border-color py-2 ${menuPopupClass}`}
      >
        {children}
      </div>
    </div>
  );
};

ToggleMenu.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  rootClass: PropTypes.string,
  margin: PropTypes.string,
  iconColor: PropTypes.string,
};

export default ToggleMenu;
