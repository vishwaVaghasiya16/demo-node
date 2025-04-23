import React from "react";
import { Col, Placeholder, Row } from "react-bootstrap";

const BlogLoader = () => {
  return (
    <Row>
      {[1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index) => {
        return (
          <Col xs={3} key={index} className="mt-20">
            <div className="bg-white p-3 br-5">
              <Placeholder animation="glow">
                <Placeholder className={`w-100 br-5 adminBlogImg`} xs={2} />
              </Placeholder>

              <div>
                <div className="d-flex mt-3 gap-2 align-items-center">
                  <p className="text-white fw-medium fs-14 p-0 m-0 mb-2 text-nowrap text-overflow-ellipsis w-100">
                    <Placeholder animation="glow">
                      <Placeholder
                        className={`bg-color-secondary br-10 h-100 w-100`}
                        xs={2}
                      />
                    </Placeholder>
                  </p>
                  <p className="p-0 m-0 fs-12 fw-medium text-color-secondary"></p>
                </div>
                <div className="d-flex mt-2 justify-content-between align-items-center gap-3">
                  <h3 className="fs-14  mb-0 text-color-primary text-capitalize text-overflow-ellipsis w-100">
                    <Placeholder animation="glow">
                      <Placeholder
                        className={`bg-color-secondary br-10 h-100 w-100`}
                        xs={2}
                      />
                    </Placeholder>
                  </h3>
                </div>
                {/* <p className="fs-14 mt-1 text-color-secondary truncate-line-3">
                      {description}
                    </p> */}
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default BlogLoader;
