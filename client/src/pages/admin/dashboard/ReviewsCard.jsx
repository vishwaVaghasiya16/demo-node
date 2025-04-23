import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  formatNumber,
  timeElapsedSinceCreatedAt,
} from "../../../helpers/customFunctions";
import defaultUserImg from "/assets/admin/defaultUser.webp";
import ReactStars from "react-stars";
import DynamicNoData from "../../../components/common/dynamicNoData/DynamicNoData";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import { useNavigate } from "react-router-dom";
import { getProductReviewsByIdThunk } from "../../../store/actions";

const ReviewsCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((store) => store.Dashboard);
  const ADMIN = Admin();
  return (
    <Card
      className={`min-h-484 lg-h-0 bg-white border common-border-color br-5 p-3`}
    >
      <CardHeader
        className={`border-0 bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-3 p-0`}
      >
        <div className={`heading`}>
          <span
            className={`text-capitalize text-color-primary fw-medium fs-16 lh-base`}
          >
            best products reviews
          </span>
        </div>
        <div className={`total-count`}>
          <span
            className={`text-capitalize text-color-secondary fw-normal fs-14 lh-base`}
          >
            Total{" "}
            {data?.totalProductReviews
              ? formatNumber(data?.totalProductReviews)
              : 0}{" "}
            reviews
          </span>
        </div>
      </CardHeader>
      <CardBody
        className={`${
          data?.reviewDetails?.length > 0
            ? ""
            : "d-flex align-items-center justify-content-center"
        } p-0`}
      >
        {data?.reviewDetails?.length > 0 ? (
          data?.reviewDetails?.map((ele) => {
            const id = ele?._id;
            const createdAt = ele?.createdAt;
            const userImage = ele?.user?.url;
            const username = ele?.user?.username;
            const rating = ele?.rating;
            const message = ele?.message;
            const customerId = ele?.user?.customerId;
            return (
              <div key={id} className={`mt-3`}>
                <Button
                  onClick={() =>
                    navigate(`${ADMIN.CUSTOMER.path}/${customerId}`)
                  }
                  className={`p-0 m-0 bg-transparent border-0`}
                >
                  <div className={`d-flex align-items-center gap-2`}>
                    <div
                      className={`hw-50 border common-border-color rounded-circle overflow-hidden`}
                    >
                      <img
                        loading="lazy"
                        src={userImage || defaultUserImg}
                        alt={`user-${id}`}
                        className={`w-100 h-100 object-fit-cover`}
                      />
                    </div>

                    <div className={`text-start`}>
                      <span
                        className={`d-flex align-items-center gap-1 text-truncate fs-14 lh-base fw-medium text-color-secondary text-capitalize`}
                      >
                        <span className="text-color-primary">{username}</span>
                      </span>
                      <div className={`d-flex align-items-center gap-2`}>
                        <div style={{ cursor: "pointer" }}>
                          <ReactStars
                            count={5}
                            value={rating}
                            size={14}
                            half={true}
                            edit={false}
                            color2="#24ff00"
                          />
                        </div>
                        <span
                          className={`text-truncate fs-14 lh-base fw-normal text-color-secondary`}
                        >
                          {timeElapsedSinceCreatedAt(createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    dispatch(getProductReviewsByIdThunk(id));
                    navigate(`${ADMIN.REVIEWS.path}/${id}`);
                  }}
                  className="w-100 d-block bg-transparent border-0 rounded-0 text-start p-0 mt-3 pb-3 message border-2 border-bottom common-border-color"
                >
                  <span
                    className={`fs-14 lh-base truncate-line-2 fw-normal text-color-secondary text-capitalize`}
                  >
                    {message}
                  </span>
                </Button>
              </div>
            );
          })
        ) : (
          <div className={`mx-auto`}>
            <DynamicNoData
              icon="vcuhguff"
              title="Oops ! No Any Reviews Yet !"
              subTitle="Stay tuned for reviews !"
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ReviewsCard;
