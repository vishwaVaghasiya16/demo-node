import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import {
  getOrderThunk,
  returnOrderRequestThunk,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { getMomentDate } from "../../../../components/common/MomentFun";
import { currencyHandler } from "../../../../helpers/currencyHandler";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../../routes/routesConstants";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import * as yup from "yup";
import { useFormik } from "formik";
import { isWithinDays } from "../../../../helpers/customFunctions";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.Auth);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const { data, loading, returnOrderLoading } = useSelector(
    (store) => store.Orders
  );
  const [isModel, setIsModel] = useState(false);

  const filteredOrder = data?.filter(
    (item) =>
      item.isPaid == true &&
      item?.status == enumsData?.orderStatusEnum?.DELIVERED &&
      isWithinDays(item?.createdAt)
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(getOrderThunk({ user: user?._id, limit: 0 }));
    }
  }, [user]);

  const validationSchema = yup.object({
    reason: yup
      .string()
      .min(25, "min 25 latters are required")
      .required("reason is requried"),
    orderId: yup.string().required("order is is required"),
  });

  const initialValues = {
    reason: "",
    orderId: "",
  };

  const validation = useFormik({
    validationSchema,
    name: "return order reason",
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      const response = await dispatch(returnOrderRequestThunk(values));
      if (returnOrderRequestThunk.fulfilled.match(response)) {
        setIsModel(false);
        resetForm();
      }
    },
  });

  return (
    <Layout>
      <div className={`border br-10 bg-white p-3 p-md-4`}>
        {data?.length > 0 && (
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className={`mb-0 responsive fs-16 fw-medium text-color-primary`}>Order History</h6>
            <Button
              className="primary-btn fs-14"
              onClick={() => setIsModel(true)}
            >
              Return order
            </Button>
          </div>
        )}
        {data?.length > 0 && (
          <Table
            responsive="lg"
            bordered
            className="text-center responsive align-middle m-0"
          >
            <thead className="">
              <tr>
                <td className="bg-color-titan-white text-color-primary text-center">
                  Date
                </td>
                <td className="bg-color-titan-white text-color-primary text-center">
                  Order Id
                </td>
                <td className="bg-color-titan-white text-color-primary text-center">
                  Items
                </td>
                <td className="bg-color-titan-white text-color-primary text-center">
                  Status
                </td>
                <td className="bg-color-titan-white text-color-primary text-center">
                  Price
                </td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.length > 0 &&
                data?.map((item, index) => {
                  const orderId = item?.orderId || "-";
                  const date = getMomentDate(item?.createdAt, "DD MMMM, YYYY");
                  const items = item?.items || [];
                  const totalAmount = item?.totalAmount || 0;
                  const status = item?.status;
                  const orderDate = item?.createdAt;
                  return (
                    <tr key={index}>
                      <td className=" w-180p">
                        <p className="p-0 m-0 text-color-secondary fw-medium fs-14">
                          {date}
                        </p>
                      </td>
                      <td className=" w-180p">
                        <Link to={`${CLIENT.ORDER_DETAILS}/${orderId}`}>
                          <p className="cursor-pointer p-0 m-0 text-color-primary fw-medium fs-14">
                            {orderId}
                          </p>
                        </Link>
                      </td>
                      <td className=" w-180p">
                        <p className="p-0 m-0 text-color-secondary fw-medium fs-14">
                          {items?.length}
                        </p>
                      </td>
                      <td className=" w-180p">
                        <p className="p-0 m-0 text-color-secondary fw-medium fs-14">
                          {status}
                        </p>
                      </td>
                      <td className=" w-180px">
                        <p className="p-0 m-0  text-color-secondary fw-medium fs-14">
                          {currencyHandler(totalAmount)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isModel}
          className="modal-600px"
          onHide={() => setIsModel(false)}
        >
          <Modal.Header
            closeButton
            className="position-relative btn-close-none bg-color-primary"
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="mx-auto fs-20 text-white fw-medium responsive text-capitalize"
            >
              request to return order
              <Button
                className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-50 translate-middle border  bg-color-titan-white text-color-black"
                color="transparent"
                type="button"
                onClick={() => setIsModel(false)}
              >
                <i className="ri-close-line fs-18"></i>
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0  overflow-y-scroll overflow-track-none br-10 responsive">
            <div className="p-4">
              <div className="mb-3">
                <Form.Label
                  className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                >
                  Select order id
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="input-field-bg border-0 text-color-secondary shadow-none text-capitalize"
                  name="orderId"
                  isInvalid={
                    validation.touched.orderId && validation.errors.orderId
                  }
                  value={validation.values.orderId}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                >
                  <option>Select order id</option>
                  {filteredOrder?.map((ele, index) => {
                    return (
                      <option key={index} value={ele?._id}>
                        {ele?.orderId}
                      </option>
                    );
                  })}
                </Form.Select>
                {validation.touched.orderId && validation.errors.orderId ? (
                  <p className={`fs-14 text-danger text-capitalize mt-1`}>
                    {validation.errors.orderId}
                  </p>
                ) : null}
              </div>
              <div>
                <Form.Label
                  className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
                >
                  Reason for return order
                </Form.Label>
                <Form.Control
                  name="reason"
                  value={validation.values.reason}
                  onChange={validation.handleChange}
                  onReset={validation.handleReset}
                  onBlur={validation.handleBlur}
                  as="textarea"
                  placeholder="write your review here"
                  className={`input-field-bg br-5 text-color-secondary h-45 border-0 fw-normal fs-16 lh-base`}
                  isInvalid={Boolean(
                    validation.touched.reason && validation.errors.reason
                  )}
                />
                {validation.touched.reason && validation.errors.reason ? (
                  <p className={`fs-14 text-danger text-capitalize mt-1`}>
                    {validation.errors.reason}
                  </p>
                ) : null}
              </div>
              <div className="">
                <span className="text-color-primary fs-14 fw-medium mt-3 mb-1 d-block">
                  Return Request Eligibility:
                </span>
                <ul className="list-style-circle fs-12 text-color-secondary m-0 ps-3">
                  <li>
                    Return Request Eligibility: You can request a return within
                    7 days from the date your order was created.
                  </li>
                  <li>Order must be deliverd</li>
                </ul>
                <span className="text-color-primary fs-14 fw-medium mt-3 mb-1 d-block">
                  Return Conditions:
                </span>
                <ul className="list-style-circle fs-12 text-color-secondary m-0 ps-3">
                  <li>
                    The item(s) must be unused, in their original condition, and
                    with all original packaging and tags intact.
                  </li>
                  <li>
                    Items that are damaged, worn, or altered may not be eligible
                    for return.
                  </li>
                </ul>
                <span className="text-color-primary fs-14 fw-medium mt-3 mb-1 d-block">
                  Refund Process:
                </span>
                <ul className="list-style-circle fs-12 text-color-secondary m-0 ps-3">
                  <li>
                    Once we receive and inspect the returned item(s), we will
                    process your refund. The refund will be issued to your
                    original payment method within 7 business days if return
                    order request accept by managment.
                  </li>
                </ul>
                <span className="text-color-primary fs-14 fw-medium mt-3 mb-1 d-block">
                  Need Assistance?
                </span>
                <ul className="list-style-circle fs-12 text-color-secondary m-0 ps-3">
                  <li>
                    For any questions or concerns regarding your return, please
                    do not hesitate to contact our customer support team. We are
                    here to assist you and ensure a smooth return process.
                  </li>
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Row className="w-100">
              <Col>
                <Button
                  className="border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100 btn btn-primary"
                  onClick={() => setIsModel(false)}
                  // onClick={validation.handleSubmit}
                  // disabled={loading ? true : false}
                >
                  Cancel{" "}
                  {/* {loading ? "Loading..." : "SCHEDULE A VIDEO CALL"} */}
                </Button>
              </Col>
              <Col>
                <Button
                  className="border-0 bg-color-primary fs-14 px-4 py-2 d-block w-100 btn btn-primary"
                  onClick={validation.handleSubmit}
                  disabled={returnOrderLoading ? true : false}
                >
                  {returnOrderLoading ? "Submitting..." : "Submit"}
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

        {!loading && !data?.length > 0 && (
          <div className={`mx-auto`}>
            <DynamicNoData
              icon="odavpkmb"
              title="Oops ! No Order History Yet !"
              subTitle="Stay tuned for updates on our dedicated team members !"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
