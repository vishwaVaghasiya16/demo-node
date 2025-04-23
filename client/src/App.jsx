import AuthModal from "./components/common/modal/AuthModal";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setAuthBox } from "./store/auth/slice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getBackendEnums } from "./store/actions";
import { verifyToken } from "./store/actions";
// import lottie from "lottie-web";
import { loadAnimation } from "lottie-web";
// import { defineElement } from "lord-icon-element";
import { defineElement } from "@lordicon/element";
import { useLocation } from "react-router-dom";

// define "lord-icon" custom element with default properties
defineElement(loadAnimation);

function App() {
  const dispatch = useDispatch();
  const { token, user, authType } = useSelector((store) => store.Auth);
  const location = useLocation();
  const capitalizeFirstWord = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  useEffect(() => {
    const openAuthBox = setTimeout(() => {
      if (!token && Object.keys(user).length === 0 && !authType) {
        dispatch(setAuthBox("register"));
      }
    }, 3000);

    return () => clearTimeout(openAuthBox);
  }, [dispatch, token, user, authType]);

  useEffect(() => {
    Aos.init({ once: true, duration: 1000 });
  }, []);

  useEffect(() => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title =
      capitalizeFirstWord(
        location.pathname.split("/").slice(-1)[0].split("-").join(" ") || "Home"
      ) +
      " " +
      "|" +
      " " +
      "Brilliant Earth";
  }, [location.pathname]);

  useEffect(() => {
    const handleStorageChange = async (e) => {
      if (e.key === "token") {
        const response = await dispatch(verifyToken({ token: e.newValue }));
        if (verifyToken.rejected.match(response)) {
          dispatch(logOut());
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(verifyToken({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getBackendEnums());
  }, [dispatch]);

  // const handleClick = () => {};

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AllRoutes />
      <AuthModal />
    </>
  );
}

export default App;
