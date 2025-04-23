import { Container } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import LatestBlogs from "./LatestBlogs";
import MidBlogs from "./MidBlogs";
import AllBlogs from "./AllBlogs";
import BlogVideos from "./BlogVideos";

const Blogs = () => {
  return (
    <main className="page-content">
      <Container>
        <PageHeader title="home" pageTitle="Blog"  />
      </Container>
      <LatestBlogs/>
      <MidBlogs/>
      <BlogVideos/>
      <AllBlogs/>
    </main>
  );
};

export default Blogs;
