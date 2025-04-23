import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const InstagramPost = ({ data }) => {
  const instaData = data?.files?.slice(0, 9);
  const smWidth = useMediaQuery({ query: "(max-width: 575px)" });

  if (instaData?.length > 0) {
    return (
      <section className="paddingBottom">
        <Container>
          <TextHoverAnimation content="Follow us on instagram" word="i" />
          <div>
            <Row>
              <Col xs={12}>
                <div
                  className={`${
                    smWidth
                      ? "instagram-post-grid-container-3"
                      : "instagram-post-grid-container-5"
                  } d-grid gap-3 instagram-posts`}
                >
                  {instaData?.map((item, index) => {
                    const redirectUrl = item?.redirectUrl;
                    return (
                      <div
                        key={index}
                        className={`grid-item br-10 ${
                          (
                            smWidth
                              ? index == 6 || index == 4
                              : index == 5 || index == 3
                          )
                            ? "large-item"
                            : ""
                        }`}
                      >
                        <Link to={redirectUrl} target="_blank">
                          <img
                            src={item?.urls}
                            alt=""
                            className="img-fluid bg-color-titan-white"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    );
  }
};

export default InstagramPost;
