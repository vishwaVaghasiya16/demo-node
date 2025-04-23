import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/web/header/PageHeader";
import { getMomentDate } from "../../../../components/common/MomentFun";
import { useSelector } from "react-redux";

const MainBlogDetails = () => {
  const { blogDetails } = useSelector((store) => store.Blogs);
  const title = blogDetails?.title;
  const htmlString = blogDetails?.html;
  const date = blogDetails?.createdAt;
  const image = blogDetails?.url;
  const description = blogDetails?.description;

  return (
    <section>
      <Container>
        <PageHeader pageTitle="Blog" displayTitle="Our Blog" title="Home" />
      </Container>
      <div className="paddingY blogContainer">
        <div>
          <p className="d-flex align-items-center p-0 m-0 opacity-75 fs-14">
            <span className="me-2">
              <i className="ri-calendar-2-line fs-16"></i>
            </span>
            {getMomentDate(date, "MMMM D, YYYY")}
          </p>
          <h2 className="mt-2 text-capitalize">{title}</h2>
          <p className="fs-14 mb-5 text-color-primary">{description}</p>
          {image && <img src={image} alt="" className="blog-main-img mb-3" />}
          <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </div>
      </div>
    </section>
  );
};

export default MainBlogDetails;
