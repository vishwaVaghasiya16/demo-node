import { Route, Routes } from "react-router-dom";
import { AdminRoutes as Admin } from "./AdminRoutes";
import { Layout as AdminLayout } from "../pages/admin/Layout";
import { Layout as WebLayout } from "../pages/web/Layout";
import { WebRoutes as Web } from "./WebRoutes";
import { AUTH } from "./routesConstants";
import ResetPassword from "../pages/auth/ResetPassword";
import { useSelector } from "react-redux";
import RoleProtectedRoutes from "./RoleProtectedRoutes";
import PrivateRoutes from "./PrivateRoutes";
import NoPage from "../components/web/displayMessagePages/NoPage";

const AllRoutes = () => {
  const { user, token } = useSelector((store) => store.Auth);
  const AdminRoutes = Admin();

  // const { hash } = useLocation();

  // useEffect(() => {
  //   if (hash) {
  //     const element = document.querySelector(hash);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [hash]);

  return (
    <Routes>
      {/* ====================================================================Admin routes ====================================================================*/}
      {AdminRoutes?.map((item, index) => {
        return (
          <Route
            key={index}
            path={item?.path}
            element={
              <RoleProtectedRoutes role={item.role}>
                <AdminLayout>{item.component}</AdminLayout>
              </RoleProtectedRoutes>
            }
          />
        );
      })}
      {/* ====================================================================Web routes ====================================================================*/}
      {Web.map((item, index) => {
        return (
          <Route
            key={index}
            path={item?.path}
            element={
              <PrivateRoutes authRequirement={item.authRequirement}>
                <WebLayout>{item?.component}</WebLayout>
              </PrivateRoutes>
            }
          />
        );
      })}
      {/* ========================================================Other routes with different layout =========================================================*/}
      <Route path={AUTH.RESET_PASSWORD} element={<ResetPassword />} />
      <Route
        path="/*"
        element={Object.keys(user).length > 0 && token && <NoPage />}
      />
    </Routes>
  );
};

export default AllRoutes;
