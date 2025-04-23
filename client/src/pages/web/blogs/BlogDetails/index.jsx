import { useParams } from "react-router-dom";
import BlogComments from "./BlogComments";
import MainBlogDetails from "./MainBlogDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsThunk } from "../../../../store/actions";
import NoRecord from "../../../../components/web/displayMessagePages/NoRecord";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { blogDetails } = useSelector((store) => store.Blogs);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getBlogDetailsThunk({ title: slug }));
  }, [dispatch, slug]);

  return (
    <main className="page-content">
      {blogDetails && Object.keys(blogDetails).length > 0 ? (
        <>
          <MainBlogDetails />
          {/* <BlogComments /> */}
        </>
      ) : (
        <div className={`paddingBottom mt-lg-5`}>
          <NoRecord
            title="blog not found !"
            message="We're sorry, but it looks like there is no blog available matching your search criteria at the moment. Please try again later or explore our other blogs."
          />
        </div>
      )}
    </main>
  );
};

export default BlogDetails;
