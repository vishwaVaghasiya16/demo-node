import PropTypes from "prop-types";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { Col, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../helpers/customFunctions";
import { getMomentDate } from "../../../../components/common/MomentFun";
import PageRoutesButtons from "./PageRoutesButtons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffDetailsThunk } from "../../../../store/actions";
import { useParams } from "react-router-dom";
import defaultUserImg from "/assets/admin/defaultUser.webp";

const Layout = ({ children }) => {
  const subPageTitle = location.pathname.split("/")[3].split("-").join(" ");
  const { staffDetails, loading } = useSelector((store) => store.Auth);
  const { employeeid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(staffDetails).length === 0) {
      dispatch(getStaffDetailsThunk({ staff: employeeid }));
    }
  }, [dispatch, employeeid, staffDetails]);
  return (
    <div className={`py-20`}>
      <BreadCrumb
        title="admin panel"
        pageTitle="staff"
        subPageTitle={subPageTitle}
      />
      <Row>
        <Col xl={4} xxl={3}>
          <div
            className={`bg-white border common-border-color mb-3 mb-xl-0 p-3 br-5`}
          >
            <div
              className={`user-details border-bottom common-border-color pb-3`}
            >
              <div
                className={`border common-border-color wh-150 rounded-circle overflow-hidden mx-auto`}
              >
                <img
                  src={
                    loading
                      ? defaultUserImg
                      : staffDetails?.url || defaultUserImg
                  }
                  className="object-fit-cover h-100 w-100"
                  alt="profile-image"
                />
              </div>
              <h4
                className={`mt-2 mb-1 fs-16 lh-base fw-medium text-color-primary text-capitalize text-center`}
              >
                {staffDetails?.username}
              </h4>
              <span
                className={`text-truncate text-center d-block fs-14 lh-base fw-normal text-color-secondary`}
              >
                {staffDetails?.email}
              </span>
            </div>
            <div className={`user-extra-details pt-3`}>
              <div className={`mb-3`}>
                <span
                  className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                >
                  EMP ID
                </span>
                <span
                  className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                >
                  #{staffDetails?.empId}
                </span>
              </div>
              <div className={`mb-3`}>
                <span
                  className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                >
                  phone
                </span>
                <span
                  className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                >
                  {staffDetails?.phone
                    ? formatPhoneNumber(staffDetails?.phone)
                    : "--"}
                </span>
              </div>
              <div className={`mb-3`}>
                <span
                  className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                >
                  address
                </span>
                <span
                  className={`d-block text-capitalize fs-14 fw-normal text-color-secondary lh-base`}
                >
                  {staffDetails?.address || "--"}
                </span>
              </div>
              <div className={`mb-3`}>
                <span
                  className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                >
                  Date of Birth
                </span>
                <span
                  className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                >
                  {staffDetails?.dob
                    ? getMomentDate(staffDetails?.dob, "DD MMMM YYYY")
                    : "--"}
                </span>
              </div>
              <div>
                <span
                  className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                >
                  joining date
                </span>
                <span
                  className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                >
                  {staffDetails?.joiningDate
                    ? getMomentDate(staffDetails?.joiningDate, "DD MMMM YYYY")
                    : "--"}
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={8} xxl={9}>
          <div className={`br-5 bg-white border common-border-color p-3`}>
            <PageRoutesButtons />
            <div className={``}>{children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
