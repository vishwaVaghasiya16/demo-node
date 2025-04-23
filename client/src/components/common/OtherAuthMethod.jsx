import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toastError } from "../../helpers/toastConfig";
import { setAuthBox } from "../../store/auth/slice";
import { signInWithGoogle } from "../../store/actions";

const OtherAuthMethod = () => {
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    dispatch(signInWithGoogle({ token: credentialResponse?.credential }));
    dispatch(setAuthBox(""));
  };

  const handleError = (error) => {
    toastError("Login Failed");
  };
  return (
    <div
      className={`other-auth-method d-flex align-items-center justify-content-center mt-3 mt-md-4 gap-2`}
    >
      <GoogleOAuthProvider clientId="1011647367180-o2uddotdufum1t0ft5k91gja69oge3je.apps.googleusercontent.com">
        <GoogleLogin
          type="icon"
          shape="pill"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default OtherAuthMethod;
