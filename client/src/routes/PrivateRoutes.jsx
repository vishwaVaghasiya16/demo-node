import PropTypes from "prop-types";
import { authRequirementEnum } from "../helpers/enum";
import { Navigate } from "react-router-dom";
import { CLIENT } from "./routesConstants";
import { getToken } from "../helpers/api_helper";

const PrivateRoutes = ({ authRequirement, children }) => {
  const token = getToken();

  if (authRequirement === authRequirementEnum.AUTH_REQUIRED && !token) {
    return <Navigate to={CLIENT.INDEX} />;
  }

  return <>{children}</>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.any,
  authRequirement: PropTypes.any,
};

export default PrivateRoutes;
