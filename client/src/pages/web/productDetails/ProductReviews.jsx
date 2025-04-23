import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../../../components/web/Ratings";
import { useEffect, useState } from "react";
import {
  getProductReviewsThunk,
  postProductReviewThunk,
} from "../../../store/actions";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import * as yup from "yup";
import { useFormik } from "formik";

const ProductReviews = ({ productId }) => {
  const {
    reviews,
    reviewPaginationData,
    reviewLoading,
    reviewPaginationLoading,
  } = useSelector((store) => store.ProductDetails);
  const dispatch = useDispatch();
  // const productId = reviews[0]?.product?._id;
  const [showFullReviewIds, setShowFullReviewsIds] = useState([]);
  const [isReviewModel, setIsReviewModel] = useState();

  const showFullReview = (id) => {
    if (!showFullReviewIds.includes(id)) {
      setShowFullReviewsIds((showFullReviewIds) => [...showFullReviewIds, id]);
    } else {
      setShowFullReviewsIds((showFullReviewIds) =>
        showFullReviewIds.filter((item) => item !== id)
      );
    }
  };

  const handlePagination = async () => {
    await dispatch(
      getProductReviewsThunk({
        productId: productId,
        page: reviewPaginationData.page + 1,
      })
    );
  };

  const handleReviewModel = () => {
    setIsReviewModel(!isReviewModel);
  };

  const initialValues = {
    title: "",
    rating: 0,
    message: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("title is required"),
    message: yup.string().required("review is required"),
  });

  const validation = useFormik({
    name: "review vlaidation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("rating", values.rating);
      formData.append("message", values.message);
      formData.append("product", productId);
      const response = await dispatch(postProductReviewThunk(formData));
      if (postProductReviewThunk.fulfilled.match(response)) {
        resetForm();
        handleReviewModel();
      }
    },
  });

  const handleRatingChange = (newRating) => {
    validation.setFieldValue("rating", newRating);
  };

  useEffect(() => {
    dispatch(getProductReviewsThunk({ product: productId, page: 1 }));
  }, []);

  return (
    <section className="bg-color-titan-white paddingY">
      <Container className="responsive">
        {reviews?.length > 0 && (
          <div className="d-flex justify-content-between">
            <h2 className="fs-28 text-center mb-0 align-items-center">
              What Our Customers Say ?
            </h2>
            <Button onClick={handleReviewModel} className="primary-btn fs-14">
              Write A Review
            </Button>
          </div>
        )}
        <div className="d-flex flex-column gap-3 gap-md-4 pt-3">
          {reviews?.length > 0 ? (
            reviews?.map((item, index) => {
              const profileImg = item?.user?.url || defaultUserImg;
              const name = item?.user?.username;
              const rating = item?.rating;
              const time = item?.time;
              const review = item?.message;
              const id = item?._id;
              return (
                <div
                  key={index}
                  className="bg-white p-4 border border-color-light-gray br-5"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={profileImg}
                      className="border h-60 w-60 rounded-circle object-fit-cover"
                      alt=""
                    />
                    <div>
                      <h6 className="fs-16 text-color-primary m-0 mb-1">
                        {name}
                      </h6>
                      <div className="d-flex align-items-center gap-2">
                        <Ratings
                          ratings={rating}
                          size={15}
                          onChange={handleRatingChange}
                        />
                        <p className="m-0 fs-14 text-color-secondary">{time}</p>
                      </div>
                    </div>
                  </div>
                  <p
                    // className={`${
                    //   showFullReviewIds.includes(id) ? "" : "truncate-line-3"
                    // } m-0 mt-3 fs-14 text-color-secondary`}
                    className={`m-0 mt-3 fs-14 text-color-secondary`}
                  >
                    {review}
                  </p>
                  {/* <Button
                    onClick={() => showFullReview(id)}
                    className="p-0 fs-14 mt-2 bg-transparent text-color-secondary border-0 outline-none shadow-none"
                  >
                    {showFullReviewIds.includes(id) ? "View Less" : "Load More"}
                  </Button> */}
                </div>
              );
            })
          ) : (
            <div>
              <h2 className="fs-28 text-center mb-0 align-items-center">
                What Our Customers Say ?
              </h2>
              <div className="py-3 py-lg-0">
                <DynamicNoData
                  icon="vcuhguff"
                  title="Oops ! No Reviews Yet !"
                  subTitle="Be the first to leave your valuable review !"
                />
              </div>
              <Button
                onClick={handleReviewModel}
                className="primary-btn fs-14 mx-auto"
              >
                Write A Review
              </Button>
            </div>
          )}
        </div>
        {reviewPaginationData?.page < reviewPaginationData?.totalPages && (
          <Button
            className="primary-btn mx-auto mt-3 fs-14 mt-md-4"
            disabled={reviewPaginationLoading ? true : false}
            onClick={() => handlePagination()}
          >
            {reviewPaginationLoading ? "Loading..." : "Load More"}
          </Button>
        )}
      </Container>

      {/* review model */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isReviewModel}
        onHide={handleReviewModel}
      >
        <Modal.Header
          closeButton
          className="position-relative btn-close-none bg-color-titan-white"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="mx-auto fs-20 text-color-primary fw-medium"
          >
            Write A Review
            <Button
              className="modal-close-btn hw-25 p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute end-0 top-50 translate-middle border  bg-color-titan-white text-color-black"
              color="transparent"
              type="button"
              onClick={handleReviewModel}
            >
              <i className="ri-close-line fs-18"></i>
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" p-3 p-md-4 pb-0">
          <form action="" onSubmit={validation.handleSubmit}>
            <h6 className="text-center mb-1">Rating</h6>
            <div className="d-flex justify-content-center">
              <Ratings
                value={validation.values.rating}
                size={24}
                edit
                color2="#1F1A5E"
                onChange={handleRatingChange}
              />
            </div>
            {validation.touched.rating && validation.errors.rating && (
              <p
                className={`fs-14 text-danger text-capitalize mt-1 text-center`}
              >
                {validation.errors.rating}
              </p>
            )}
            <div className={`mb-3`}>
              <Form.Label
                className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
              >
                Review Title
              </Form.Label>
              <Form.Control
                name="title"
                value={validation.values.title}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                type="text"
                placeholder="Enter Review Title"
                className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                isInvalid={Boolean(
                  validation.touched.title && validation.errors.title
                )}
              />
              {validation.touched.title && validation.errors.title ? (
                <p className={`fs-14 text-danger text-capitalize mt-1`}>
                  {validation.errors.title}
                </p>
              ) : null}
            </div>
            <div>
              <Form.Label
                className={`ls-1px text-color-primary fw-medium fs-16 text-capitalize lh-base`}
              >
                review
              </Form.Label>
              <Form.Control
                name="message"
                value={validation.values.message}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                as="textarea"
                placeholder="write your review here"
                className={`input-field-bg br-5 h-45 border-0 fw-normal fs-16 lh-base`}
                isInvalid={Boolean(
                  validation.touched.message && validation.errors.message
                )}
              />
              {validation.touched.message && validation.errors.message ? (
                <p className={`fs-14 text-danger text-capitalize mt-1`}>
                  {validation.errors.message}
                </p>
              ) : null}
            </div>
            <p className="p-0 m-0 fs-14 text-color-secondary mt-3">
              How we use your data: We’ll only contact you about the review you
              left, and only if necessary. By submitting your review, you agree
              to Judge.me’s terms and conditions and privacy policy.
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Row className="w-100">
            <Col>
              <Button
                className="border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100 btn btn-primary"
                onClick={handleReviewModel}
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
                disabled={reviewLoading ? true : false}
              >
                {reviewLoading ? "Submitting..." : "Submit"}
                {/* {loading ? "Loading..." : "SCHEDULE A VIDEO CALL"} */}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ProductReviews;
