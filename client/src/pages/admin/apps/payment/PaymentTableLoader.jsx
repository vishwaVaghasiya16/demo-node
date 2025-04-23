import { Placeholder } from "react-bootstrap";
import { tableLoaderDataLength } from "../../../../helpers/enum";

const PaymentTableLoader = () => {
  const lengthArray = Array.from(
    { length: tableLoaderDataLength },
    (a, b) => b
  );
  return (
    <>
      <tbody>
        {lengthArray.map((ele, index) => {
          return (
            <tr key={index}>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div className={`d-flex align-items-center gap-2`}>
                  <div>
                    <div
                      className={`wh-35 border common-border-color rounded-circle overflow-hidden`}
                    >
                      <Placeholder animation="glow">
                        <Placeholder
                          className={`bg-color-secondary br-10 h-100 w-100`}
                          xs={2}
                        />
                      </Placeholder>
                    </div>
                  </div>
                  <div className={`w-100`}>
                    <Placeholder animation="glow">
                      <Placeholder
                        className={`bg-color-secondary br-10 h-100 w-100`}
                        xs={2}
                      />
                    </Placeholder>
                  </div>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom border-end common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
              <td
                className={`bg-white px-3 py-10 border-bottom common-border-color`}
              >
                <div>
                  <Placeholder animation="glow">
                    <Placeholder
                      className={`bg-color-secondary br-10 h-100 w-100`}
                      xs={2}
                    />
                  </Placeholder>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default PaymentTableLoader;
