import { Card, CardBody, CardHeader, Col, Row, Table } from "react-bootstrap";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoCallScheduleThunk,
  updateVideoCallScheduleThunk,
} from "../../../../store/actions";
import {
  getMomentDate,
  getMomentTime,
} from "../../../../components/common/MomentFun";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import VideoCallTableLoader from "./VideoCallTableLoader";
import { AppointmentStatusEnum, itemLimitEnum } from "../../../../helpers/enum";
import PaginationDiv from "../../../../components/admin/pagination/PaginationDiv";
import { formatPhoneNumber } from "../../../../helpers/customFunctions";
import SelectTag from "../../../../components/admin/selectTag/SelectTag";

const VideCallScheduleTable = () => {
  const dispatch = useDispatch();
  const { videoCallSchedulesList, videoCallSchedulesPaginationData, loading } =
    useSelector((store) => store.VideoCall);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const appointmentStatusEnum = AppointmentStatusEnum();
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    status: "",
    search: "",
    limit: 10,
  });

  const triggerRoleConfirmation = useConfirmationAlert({
    icon: "info",
    title: "Confirm Status Update",
    text: "Are you sure you want to update the status? This change cannot be undone.",
    confirmButtonText: "Update Status",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",

    successText: "Status has been successfully updated.",
  });

  const handleStatusChange = ({ values, id }) => {
    triggerRoleConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(
          updateVideoCallScheduleThunk({ id, values })
        );
        if (updateVideoCallScheduleThunk.fulfilled.match(response)) {
          dispatch(
            getVideoCallScheduleThunk({ page: 1, limit: searchQuery.limit })
          );
          return true;
        }
        if (updateVideoCallScheduleThunk.rejected.match(response)) {
          dispatch(
            getVideoCallScheduleThunk({ page: 1, limit: searchQuery.limit })
          );
          return false;
        }
      },
    });
  };

  const handleSearch = (input) => {
    const { name, value } = input;
    setSearchQuery((preValue) => ({ ...preValue, [name]: value }));
  };

  useEffect(() => {
    const { status, search } = searchQuery;
    const delayDebounceFn = setTimeout(() => {
      if (status !== "" || search !== "") {
        dispatch(getVideoCallScheduleThunk(searchQuery));
      }
    }, 500);

    if (status === "" && search === "") {
      dispatch(getVideoCallScheduleThunk({ limit: searchQuery.limit }));
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

  const activeHandler = (page) => {
    setActive(page);
    dispatch(getVideoCallScheduleThunk({ page, limit: searchQuery.limit }));
  };

  return (
    <div className={`py-20`}>
      <BreadCrumb title="schedule" pageTitle="video call" />
      {/* <div className="mb-3 w-25">
        <input
          data-provider="timepickr"
          data-default-time="Your Default Time"
          onChange={(e) => console.log(e.target.value)}
          type="time"
          className="form-control"
          value="08:56 AM"
        />
      </div> */}
      <Card
        className={`border common-border-color bg-transparent common-box-shadow br-5 overflow-hidden`}
      >
        {/* <CardHeader
          className={`p-3 border-bottom common-border-color bg-white`}
        >
          <div className={`table-title`}>
            <span
              className={`text-capitalize text-color-primary fs-16 fw-semibold lh-base`}
            >
              products list table
            </span>
          </div>
        </CardHeader> */}
        <CardBody className={`p-0`}>
          <Row
            className={`bg-white align-items-center filter-options p-3 pb-0 border-bottom common-border-color`}
          >
            <Col sm={8} md={6} xl={6} xxl={5} className={`mb-3`}>
              <Row className={`px-1`}>
                <Col xs={12} sm={6} className={`mb-3 mb-sm-0 px-2`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={limit}
                      name="limit"
                      onChange={(e) => handleSearch(e.target)}
                    >
                      {itemLimitEnum?.map((item, key) => {
                        return (
                          <option key={key} value={item}>
                            Show {item} item
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Col>
                <Col xs={12} sm={6} className={`px-2`}>
                  <div
                    className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
                  >
                    <select
                      className={`text-capitalize fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
                      aria-label="Default select example"
                      // value={videoCallStatus}
                      name="status"
                      onChange={(e) => handleSearch(e.target)}
                    >
                      <option value={""}>select status</option>
                      {Object.keys(enumsData)?.length > 0 &&
                        Object.keys(enumsData?.appointmentStatusEnum)?.map(
                          (item, key) => {
                            return (
                              <option
                                key={key}
                                value={enumsData?.appointmentStatusEnum[item]}
                              >
                                {enumsData?.appointmentStatusEnum[item]}
                              </option>
                            );
                          }
                        )}
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              sm={4}
              md={4}
              xl={3}
              className={`ms-auto mb-3 ps-sm-1 ps-md-3`}
            >
              <div
                className={`bg-white h-40 px-3 d-flex align-items-center border common-border-color br-5 overflow-hidden`}
              >
                <i className="ri-search-line search-icon responsive fs-16 text-color-primary text-opacity-75 fw-medium"></i>
                <div className="search-box w-100">
                  <input
                    type="text"
                    name="search"
                    className={`bg-transparent placeholder-secondary focus-border-none form-control border-none ps-2 responsive fs-14 placeholder-fs-14 text-black text-color-primary`}
                    placeholder="Search..."
                    onChange={(e) => {
                      handleSearch(e.target);
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* ======================
            Table Design Start 
          =======================*/}
          <div
            className={`table-responsive   overflow-scroll-design bg-white px-0`}
          >
            {videoCallSchedulesList && videoCallSchedulesList.length > 0 ? (
              <Table className={`align-middle mb-0 table`}>
                <thead>
                  <tr>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        name
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        email
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        language
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        phone no.
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        status
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom border-end common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        schedule date
                      </span>
                    </th>
                    <th
                      className={`px-3 py-10 bg-color-titan-white border-bottom common-border-color`}
                    >
                      <span
                        className={`text-truncate fs-15 lh-base fw-semibold text-color-primary text-capitalize`}
                      >
                        schedule time
                      </span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <VideoCallTableLoader />
                ) : (
                  <tbody>
                    {videoCallSchedulesList.map((ele, index) => {
                      const id = ele._id;
                      const name = ele.name;
                      const email = ele.email;
                      const language = ele.language;
                      const phone = ele.phone;
                      const status = ele.status;
                      const time = ele.time;
                      const date = ele.date;
                      return (
                        <tr key={id || index}>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              // onClick={() => handleProductDetailsPage(slug)}
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {name}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary`}
                            >
                              {email}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {language}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`${
                                phone ? "fw-medium" : "fw-bold"
                              } fs-14 text-truncate lh-base text-color-secondary`}
                            >
                              {phone ? formatPhoneNumber(phone) : "--"}
                            </span>
                          </td>
                          <td
                            className={`w-10 bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <SelectTag
                              type={appointmentStatusEnum[status]}
                              value={status}
                              options={
                                Object.keys(enumsData)?.length > 0 &&
                                Object.keys(
                                  enumsData?.appointmentStatusEnum
                                )?.map((item, key) => {
                                  return (
                                    <option
                                      key={key}
                                      value={
                                        enumsData?.appointmentStatusEnum[item]
                                      }
                                    >
                                      {enumsData?.appointmentStatusEnum[item]}
                                    </option>
                                  );
                                })
                              }
                              onChange={(e) => {
                                handleStatusChange({
                                  values: {
                                    status: e.target.value,
                                  },
                                  id: ele._id,
                                });
                              }}
                            />
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
                          >
                            <span
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {getMomentDate(date, "DD MMM, YYYY")}
                            </span>
                          </td>
                          <td
                            className={`bg-white px-3 py-10 border-bottom common-border-color`}
                          >
                            <span
                              className={`cursor-pointer text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                            >
                              {getMomentTime(time, "hh:mm A")}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
            ) : (
              <div className={`mx-auto`}>
                <DynamicNoData
                  icon="rfgxevig"
                  title="Oops ! No Any schedule Yet !"
                  subTitle="Stay tuned for upcoming updates ahead !"
                />
              </div>
            )}
          </div>
          {videoCallSchedulesPaginationData?.totalItems > 0 && !loading ? (
            <div className={`p-3 bg-white`}>
              <PaginationDiv
                active={active}
                limit={searchQuery.limit}
                totalItems={videoCallSchedulesPaginationData?.totalItems}
                size={videoCallSchedulesPaginationData?.totalPages}
                step={1}
                onClickHandler={(value) => activeHandler(value)}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default VideCallScheduleTable;
