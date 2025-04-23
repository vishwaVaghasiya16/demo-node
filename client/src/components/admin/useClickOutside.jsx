import { useEffect } from "react";

const useClickOutside = (classNames, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      const targetElement = event.target;
      const clickedOutside = classNames.some(
        (className) => targetElement.closest(className)
      );
      if (!clickedOutside) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [classNames, callback]);
};

export default useClickOutside;
