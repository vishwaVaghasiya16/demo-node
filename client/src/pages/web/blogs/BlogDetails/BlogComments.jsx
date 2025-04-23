import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getMomentDate,
  getMomentTime,
} from "../../../../components/common/MomentFun";
import { setAuthBox } from "../../../../store/auth/slice";

const BlogComments = () => {
  const { blogComments } = useSelector((store) => store.Blogs);
  const { user } = useSelector((store) => store.Auth);
  const dispatch = useDispatch()
  return (
    <section className="paddingBottom">
      <Container>
        <div>
          <h4 className="text-center">Comments (8)</h4>
          {blogComments?.map((item, index) => {
            const name = item?.name;
            const createdAt = item?.createdAt;
            const comment = item?.comment;
            return (
              <div
                key={index}
                className="border br-10 border-color-light-gray mt-4 p-4"
              >
                <div className="d-flex gap-3 align-items-start">
                  <div>
                    <img
                      src=""
                      className="w-60 h-60 rounded-circle bg-color-light-gray"
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 className="p-0 m-0 text-color-primary fs-16">{name}</h6>
                    <p className="p-0 m-0 text-color-secondary fs-14 mt-5px mb-2">
                      {getMomentDate(createdAt, "MMM D, YYYY")} at{" "}
                      {getMomentTime(createdAt, "")}
                    </p>
                    <p className="p-0 m-0 text-color-secondary fs-14">
                      {comment}
                    </p>
                    {Object.keys(user).length > 0 ? (
                      <Button className="bg-color-titan-white border-0 text-color-primary fs-14 mt-3 px-3 py-2 fw-medium">
                        Reply to {name}
                      </Button>
                    ) : (
                      <Button className="bg-color-titan-white border-0 text-color-primary fs-14 mt-3 px-3 py-2 fw-medium" onClick={()=>dispatch(setAuthBox("register"))}>
                        Login to reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default BlogComments;
