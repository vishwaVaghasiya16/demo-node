import PropTypes from "prop-types";
import { getToken } from "../helpers/api_helper";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CLIENT } from "./routesConstants";

const RoleProtectedRoutes = ({ role, children }) => {
  const token = getToken();
  const { user } = useSelector((store) => store.Auth);
  const { loading } = useSelector((store) => store.EnumsSlice);

  if (!token) {
    return <Navigate to={CLIENT.INDEX} />;
  } else if (
    !loading &&
    user?.role &&
    !role.includes(user?.role) &&
    role.length > 0
  ) {
    return <Navigate to={CLIENT.INDEX} />;
  } else {
    return <>{children}</>;
  }

  // return <>{children}</>;
};

RoleProtectedRoutes.propTypes = {
  children: PropTypes.any,
  role: PropTypes.any,
};

export default RoleProtectedRoutes;
