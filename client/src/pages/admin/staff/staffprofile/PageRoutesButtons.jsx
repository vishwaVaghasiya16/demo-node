import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ADMIN as Admin } from "../../../../routes/routesConstants";

const PageRoutesButtons = () => {
  const ADMIN = Admin();
  const { employeeid } = useParams();
  return (
    <div className={`options mt-2`}>
      <Row className={`px-1 gap-2`}>
        <Col className={`mb-20 col-auto px-1`}>
          <Link
            to={`${ADMIN.STAFF_ACCOUNT_SETTING.path}/${employeeid}`}
            className={`page-routes-button px-3 py-2 border border-color-primary fs-14 fw-medium lh-base br-5 text-capitalize transition ${
              location.pathname.includes(ADMIN.STAFF_ACCOUNT_SETTING.path)
                ? "bg-color-primary text-color-titan-white"
                : "bg-transparent hover-bg-primary hover-titan-color-white  text-color-primary"
            }`}
          >
            account setting
          </Link>
        </Col>
        <Col className={`mb-20 col-auto px-1`}>
          <Link
            to={`${ADMIN.STAFF_CHANGE_PASSWORD.path}/${employeeid}`}
            className={`page-routes-button px-3 py-2 border border-color-primary fs-14 fw-medium lh-base br-5 text-capitalize transition ${
              location.pathname.includes(ADMIN.STAFF_CHANGE_PASSWORD.path)
                ? "bg-color-primary text-color-titan-white"
                : "bg-transparent hover-bg-primary hover-titan-color-white  text-color-primary"
            }`}
          >
            change password
          </Link>
        </Col>
        <Col className={`mb-20 col-auto px-1`}>
          <Link
            to={`${ADMIN.STAFF_CONNECTIONS.path}/${employeeid}`}
            className={`page-routes-button px-3 py-2 border border-color-primary fs-14 fw-medium lh-base br-5 text-capitalize transition ${
              location.pathname.includes(ADMIN.STAFF_CONNECTIONS.path)
                ? "bg-color-primary text-color-titan-white"
                : "bg-transparent hover-bg-primary hover-titan-color-white  text-color-primary"
            }`}
          >
            connections
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default PageRoutesButtons;
