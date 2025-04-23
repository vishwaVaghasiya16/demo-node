import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductReviewsByIdThunk } from "../../../../store/actions";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { Col, Row } from "react-bootstrap";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import { getMomentDate } from "../../../../components/common/MomentFun";
import ReactStars from "react-stars";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";

const ReviewDetailsPage = () => {
  const dispatch = useDispatch();
  const { singleReviewDetails, reviewLoading } = useSelector(
    (store) => store.ProductDetails
  );
  const { reviewid } = useParams();
  useEffect(() => {
    if (Object.keys(singleReviewDetails).length === 0) {
      dispatch(getProductReviewsByIdThunk(reviewid));
    }
  }, [dispatch, reviewid, singleReviewDetails]);

  return (
    <>
      {!reviewLoading && Object.keys(singleReviewDetails).length === 0 ? (
        <div className={`mx-auto`}>
          <DynamicNoData
            icon="vcuhguff"
            title="Oops ! No Any Review Details !"
            subTitle="Provide a proper details to show review details !"
          />
        </div>
      ) : (
        <div className={`py-20`}>
          <BreadCrumb
            title="apps"
            pageTitle="reviews list"
            subPageTitle="review details"
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
                      src={singleReviewDetails?.user?.url || defaultUserImg}
                      className="object-fit-cover h-100 w-100"
                      alt="profile-image"
                    />
                  </div>
                  <h4
                    className={`mt-2 mb-1 fs-16 lh-base fw-medium text-color-primary text-capitalize text-center`}
                  >
                    {singleReviewDetails?.user?.username}
                  </h4>
                  <span
                    className={`text-center text-truncate d-block fs-14 lh-base fw-normal text-color-secondary`}
                  >
                    {singleReviewDetails?.user?.email}
                  </span>
                </div>
                <div className={`user-extra-details pt-3`}>
                  <div className={`mb-3`}>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      rating
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      <ReactStars
                        count={5}
                        value={singleReviewDetails?.rating}
                        size={14}
                        half={true}
                        edit={false}
                        color2="#24ff00"
                      />
                    </span>
                  </div>
                  <div className={`mb-3`}>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      review title
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      {singleReviewDetails?.title || "--"}
                    </span>
                  </div>{" "}
                  <div>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      product id
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base mb-3`}
                    >
                      {singleReviewDetails?.product?.sku || "--"}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      product name
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base mb-3`}
                    >
                      {singleReviewDetails?.product?.title || "--"}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                    >
                      written at
                    </span>
                    <span
                      className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                    >
                      {singleReviewDetails?.createdAt
                        ? getMomentDate(
                            singleReviewDetails?.createdAt,
                            "DD MMM, YYYY"
                          )
                        : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={8} xxl={9}>
              <div className={`br-5 bg-white border common-border-color p-3`}>
                {" "}
                <div>
                  <span
                    className={`d-block mb-1 text-capitalize fs-14 fw-medium text-color-primary lh-base`}
                  >
                    message
                  </span>
                  <span
                    className={`d-block fs-14 fw-normal text-color-secondary lh-base`}
                  >
                    {singleReviewDetails?.message || "--"}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ReviewDetailsPage;
