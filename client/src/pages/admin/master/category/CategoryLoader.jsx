import { Col, Placeholder } from "react-bootstrap";
import { tableLoaderDataLength } from "../../../../helpers/enum";

const CategoryLoader = () => {
  const lengthArray = Array.from(
    { length: tableLoaderDataLength },
    (a, b) => b
  );
  return (
    <>
      {lengthArray.map((index) => {
        return (
          <Col xs={12} sm={4} xl={3} key={index} className=" mb-3 px-2 abc">
            <div className="p-3 bg-white br-5 d-flex flex-column gap-3 border common-border-color">
              <div className="card-img br-5 overflow-hidden">
                <Placeholder animation="glow">
                  <Placeholder
                    className={`bg-color-secondary br-5 h-100 w-100`}
                    xs={2}
                  />
                </Placeholder>
              </div>
              <div className="">
                <div>
                  <p className="text-white fw-medium fs-14 p-0 m-0 mb-2 text-nowrap text-overflow-ellipsis">
                    <Placeholder animation="glow">
                      <Placeholder
                        className={`bg-color-secondary br-10 h-100 w-100`}
                        xs={2}
                      />
                    </Placeholder>
                  </p>
                  <p className="text-white fw-medium fs-14 p-0 m-0 mb-2 text-capitalize text-overflow-ellipsis">
                    <Placeholder animation="glow">
                      <Placeholder
                        className={`bg-color-secondary br-10 h-100 w-100`}
                        xs={2}
                      />
                    </Placeholder>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
};

export default CategoryLoader;
