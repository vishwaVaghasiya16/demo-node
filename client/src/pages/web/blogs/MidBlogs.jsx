import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";
import { getMomentDate } from "../../../components/common/MomentFun";

const MidBlogs = () => {
  const { imageBlog } = useSelector((store) => store.Blogs);
  const nav = useNavigate();
  const data = Array.isArray(imageBlog) ? imageBlog.slice(3, 9) : [];
  if (data?.length > 0) {
    return (
      <section className="paddingBottom mid-blogs">
        <Container>
          <div className="d-grid grid-cols-3 gap-3 gap-md-4">
            {data.map((item, index) => {
              const thumbnail = item?.url;
              const date = item?.createdAt;
              const title = item.title;
              const description = item?.description;
              const comment = item?.commentCount;
              return (
                <div key={index}>
                  <div className="zoom-hover responsive">
                    <div
                      className="max-h-420px h-1_3-1 bg-color-primary br-10 overflow-hidden cursor-pointer"
                      onClick={() => nav(`${CLIENT.BLOG_DETAILS}/${title}`)}
                    >
                      <img
                        className="h-100 zoom transition-transform w-100 object-fit-cover"
                        src={thumbnail}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="d-none d-sm-flex flex-wrap align-items-center mt-3">
                        <p className="d-flex align-items-center text-color-secondary p-0 m-0 fs-14 me-3">
                          <i className="ri-calendar-2-line fs-24 me-2"></i>
                          {getMomentDate(date, "MMMM DD, YYYY")}
                        </p>
                        {/* <p className="d-flex align-items-center text-color-secondary p-0 m-0 fs-14">
                          <i className="ri-message-2-line fs-24 me-2"></i>
                          {comment} COMMENTS
                        </p> */}
                      </div>
                      <h2 className="fs-20 fs-md-5 text-color-primary mt-2">
                        {title}
                      </h2>
                      <p className="fs-14 text-color-secondary truncate-line-3">
                        {description}
                      </p>
                      <Button
                        className={`primary-btn fs-14 mt-3 mt-sm-4`}
                        onClick={() => nav(`${CLIENT.BLOG_DETAILS}/${title}`)}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }
};

export default MidBlogs;
