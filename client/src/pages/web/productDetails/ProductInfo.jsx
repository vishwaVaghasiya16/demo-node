import { Container, Tab, Table, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currencyHandler } from "../../../helpers/currencyHandler";
import image1 from "/assets/web/1.webp";
import image3 from "/assets/web/3.webp";

const ProductInfo = () => {
  const { productDetails } = useSelector((store) => store.ProductDetails);
  const cost = productDetails?.cost;
  const goldCost = cost?.filter((item) => item?.costType == "gold");
  const diamondCost = cost?.filter((item) => item?.costType == "diamond");
  const gemstoneCost = cost?.filter((item) => item?.costType == "gemstone");

  const otherCost = cost?.filter((item) => !item.costType);
  const savedAmount = productDetails?.savedAmount || 0;
  const discountValue = productDetails?.discountValue;
  const discountType = productDetails?.discountType;
  // const taxValue = 10;
  const totalCost = productDetails?.totalCost;
  const taxValue = productDetails?.taxValue;
  const sku = productDetails?.sku;
  const price = productDetails?.price;
  const childSku = productDetails?.childSku;
  const description =
    productDetails?.shortDescription || productDetails?.description || "";
  const width = productDetails?.width;
  const height = productDetails?.height;
  const weight = productDetails?.weight;
  const purity = productDetails?.purity;
  const metalColor = productDetails?.metalColor;
  const attributes = productDetails?.attributes;
  const diamondAttr = attributes?.filter((item) => item?.attTitle == "diamond");
  const gemStoneAttr = attributes?.filter(
    (item) => item?.attTitle == "gemstone"
  );
  let allGoldValues = [];
  let allGoldFinalValue = [];
  let allDiamondValues = [];
  let allDiamondFinalValue = [];
  let allGemstoneValues = [];
  let allGemstoneFinalValue = [];

  const countTax = (amount = 0) => {
    const total = (taxValue * amount) / 100;
    return total;
  };

  const countDiscount = (
    amount = 0,
    value = discountValue,
    type = discountType
  ) => {
    if (type == "percentage") {
      return (amount * value) / 100;
    }
    return value;
  };

  const calculateArray = (arg = [], decrease = 0, increase = 0) => {
    if (arg?.length > 0) {
      const total = arg.reduce((acc, cur) => acc + cur) + increase - decrease;
      return total;
    }
  };

  const calculateAllCostValues = (decrease = 0, increase = 0) => {
    return calculateArray(
      allGoldValues.concat(allDiamondValues, allGemstoneValues),
      decrease,
      increase
    );
  };

  const calculateAllCostFinalValues = (decrease = 0, increase = 0) => {
    return calculateArray(
      allGoldFinalValue.concat(allDiamondFinalValue, allGemstoneFinalValue),
      decrease,
      increase
    );
  };

  const currencyFunction = (value) => {
    if (typeof value == "number") {
      return value > 0 ? currencyHandler(Math.ceil(value)) : "-";
    }
    return "-";
  };

  return (
    <section className="paddingY">
      <Container>
        <div className="border br-5 p-3 p-md-4">
          <Tabs
            defaultActiveKey="product-details"
            id="uncontrolled-tab-example"
            className=" mb-3 mb-md-4 custom-tab responsive fs-16 gap-1 bg-color-titan-white br-5 p-1 border border-color-light-gray"
          >
            {/* ================ product details tab ================ */}

            <Tab
              eventKey="product-details"
              title="Product Details"
              className=""
            >
              <div className="">
                <p className="fs-14 text-color-primary fw-normal">
                  SKU: {childSku ? childSku : sku}
                </p>
                <p className="fs-14 text-color-secondary truncate-line-3">
                  {description}
                </p>
              </div>
              {/* <div className="d-flex flex-column flex-sm-row gap-3 gap-md-4">
                <div className="bg-color-titan-white border border-color-light-gray br-5 overflow-hidden mx-auto mx-sm-0 sm-w-100">
                  <div className="border-start border-color-primary border-3 p-3 min-w-200px h-100 text-nowrap">
                    <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                      Dimensions
                    </h6>
                    <ul className="m-0 p-0">
                      <li className="text-color-secondary fs-14 line-height-1_7">
                        width - {width}
                      </li>
                      <li className="text-color-secondary fs-14 line-height-1_7">
                        height - {height}
                      </li>
                      {size && (
                        <li className="text-color-secondary fs-14 line-height-1_7">
                          size - {size}
                        </li>
                      )}
                      {length && (
                        <li className="text-color-secondary fs-14 line-height-1_7">
                          length - {length}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="bg-color-titan-white border border-color-light-gray br-5 overflow-hidden mx-auto mx-sm-0 sm-w-100">
                  <div className="border-start border-color-primary border-3 p-3 min-w-200px h-100">
                    <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                      Weight
                    </h6>
                    <p className="p-0 m-0 fs-14 text-color-secondary">
                      {weight}
                    </p>
                  </div>
                </div>
                <div className="bg-color-titan-white border border-color-light-gray br-5 overflow-hidden mx-auto mx-sm-0 sm-w-100">
                  <div className="border-start border-color-primary border-3 p-3 min-w-200px h-100">
                    <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                      Purity
                    </h6>
                    <p className="p-0 m-0 fs-14 text-color-secondary">
                      {purity}
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="bg-color-titan-white p-3 br-5 d-sm-inline-block">
                <h3 className="p-0 m-0 fs-16 text-color-primary text-center bg-white p-2 br-5 px-5">
                  DESIGN SPECIFICATION
                </h3>
                <p className="fs-14 text-color-primary fw-normal text-center mt-2">
                  SKU: {childSku ? childSku : sku}
                </p>
                <div className="flex-col flex-sm-row d-flex flex-wrap gap-3 justify-content-center">
                  <div className="w-sm-auto">
                    <div className="bg-white border-color-primary border-top border-3 br-5 p-2">
                      <img
                        src={image3}
                        className="mx-auto d-block w-70px h-70px "
                        alt=""
                      />
                      <p className="m-0 p-0 fs-14 text-center text-color-primary fw-medium">
                        {purity}
                      </p>
                      <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                        {metalColor}
                      </p>
                      <div className="bg-color-titan-white br-5 p-2 mt-2 px-5">
                        <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                          Weight
                        </p>
                        <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                          {weight}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-white border-color-primary border-top border-3 br-5 p-2">
                      <img
                        src={image1}
                        className="mx-auto d-block w-70px h-70px p-2"
                        alt=""
                      />
                      <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                        Product
                      </p>
                      <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                        Dimensions
                      </p>
                      <div className="d-flex gap-2">
                        <div className="bg-color-titan-white br-5 p-2 mt-2 px-4 px-sm-5">
                          <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                            Height
                          </p>
                          <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                            {height}
                          </p>
                        </div>
                        <div className="bg-color-titan-white br-5 p-2 mt-2 px-4 px-sm-5">
                          <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                            Width
                          </p>
                          <p className="m-0 p-0 fs-14 text-center text-capitalize text-color-primary fw-medium">
                            {width}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {(diamondAttr?.length > 0 || gemStoneAttr?.length > 0) && (
                <div>
                  <div className="bg-color-titan-white p-3 p-md-4 mt-4 br-5 border border-color-light-gray max-w-fit">
                    <h5 className="m-0 p-0 text-center bg-white p-3 br-5 fs-14 text-color-primary">
                      DIAMOND & GEMSTONES
                    </h5>
                    {diamondAttr && diamondAttr?.length > 0 && (
                      <div className="mt-3 mt-md-4 d-flex flex-row flex-sm-row flex-nowrap flex-md-wrap gap-3 gap-md-4 overflow-x-scroll overflow-track-none">
                        <div className="bg-white border border-color-light-gray  br-5 min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Diamond Type
                            </h6>
                            {diamondAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.attName}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border border-color-light-gray  br-5 overflow-hidden min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Setting Type
                            </h6>
                            {diamondAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.settingType}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border border-color-light-gray  br-5 overflow-hidden min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Total Number
                            </h6>
                            {diamondAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.number}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border border-color-light-gray  br-5 overflow-hidden min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Total Weight
                            </h6>
                            {diamondAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.attWeight}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {gemStoneAttr && gemStoneAttr?.length > 0 && (
                      <div className="mt-3 mt-md-4 d-flex flex-row flex-sm-row flex-nowrap flex-md-wrap gap-3 gap-md-4 overflow-x-scroll overflow-track-none">
                        <div className="bg-white border border-color-light-gray  br-5 min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Gemstone Type
                            </h6>
                            {gemStoneAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.attName}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border border-color-light-gray  br-5 overflow-hidden min-w-200px">
                          <div className="border-start border-color-primary border-3 p-3  h-100 pb-3 pb-md-5">
                            <h6 className="fs-14 m-0 p-0 fw-medium mb-2 text-color-primary">
                              Setting Type
                            </h6>
                            {gemStoneAttr?.map((item, index) => (
                              <p
                                key={index}
                                className="p-0 m-0 fs-14 text-color-secondary"
                              >
                                {item?.number}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Tab>

            {/* ============= price breakup tab design ============= */}

            {price <= 0 && (goldCost?.length > 0 ||
              diamondCost?.length > 0 ||
              gemstoneCost?.length > 0) && (
              <Tab eventKey="price-breakup" title="Price Breakup">
                <Table responsive="lg" className="table-border-none responsive">
                  <thead>
                    <tr className="text-uppercase fs-14 border-bottom">
                      <th className="text-color-primary fw-medium">
                        component
                      </th>
                      <th className="text-color-primary fw-medium">rate</th>
                      <th className="text-color-primary fw-medium">weight</th>
                      <th className="text-color-primary fw-medium">value</th>
                      <th className="text-color-primary fw-medium">
                        final value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ========================================= 
                                  gold cost(s) 
                  ======================================= */}

                    {goldCost?.length > 0 && (
                      <tr className="">
                        <td className="fs-12 text-uppercase text-danger">
                          GOLD
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                    {goldCost?.length > 0 &&
                      goldCost?.map((item, index) => {
                        const amount = item?.totalCost + item?.saveCost;
                        const costName = item?.metal;
                        const ratePerGram = item?.ratePerGram;
                        const costWeight = item?.costWeight;
                        const totalCost = item?.totalCost;
                        const saveCost = item?.saveCost;
                        allGoldValues.push(amount);
                        allGoldFinalValue.push(totalCost);
                        return (
                          <tr className="fs-14" key={index}>
                            <td className="text-color-secondary">{costName}</td>
                            <td className="text-color-secondary">
                              {currencyFunction(ratePerGram)}/g
                            </td>
                            <td className="text-color-secondary">
                              {costWeight}
                            </td>
                            <td className="text-color-secondary">
                              {currencyFunction(amount)}
                            </td>
                            <td className="text-color-secondary">
                              {currencyFunction(totalCost)}
                              {saveCost > 0 && (
                                <del className="ms-2">
                                  {currencyFunction(amount)}
                                </del>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                    {/* ========================================= 
                          total gold type amount calculate 
                    ========================================= */}

                    <tr className="fs-14">
                      <td className="text-color-primary fw-medium">
                        {"Total Gold value"}
                      </td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">
                        {currencyFunction(calculateArray(allGoldValues))}
                      </td>
                      <td className="text-color-primary">
                        {currencyFunction(calculateArray(allGoldFinalValue))}
                        <del className="ms-2">
                          {currencyFunction(calculateArray(allGoldValues))}
                        </del>
                      </td>
                    </tr>

                    {/* ========================================= 
                                  diamond cost(s) 
                  ======================================= */}

                    {diamondCost?.length > 0 && (
                      <tr className="">
                        <td className="fs-12 text-uppercase text-danger">
                          DIAMOND
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                    {diamondCost?.length > 0 &&
                      diamondCost?.map((item, index) => {
                        const costName = item?.metal;
                        const costWeight = item?.costWeight;
                        const totalCost = item?.totalCost;
                        const saveCost = item?.saveCost;
                        const amount = totalCost + saveCost;
                        allDiamondValues.push(amount);
                        allDiamondFinalValue.push(totalCost);
                        return (
                          <tr key={index} className="fs-14">
                            <td className="text-color-primary">{costName}</td>
                            <td className="text-color-primary">-</td>
                            <td className="text-color-primary">
                              {costWeight} ct
                            </td>
                            <td className="text-color-primary">
                              {currencyFunction(amount)}
                            </td>
                            <td className="text-color-secondary">
                              {currencyFunction(totalCost)}
                              {saveCost && (
                                <del className="ms-2">
                                  {currencyFunction(amount)}
                                </del>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                    {/* ========================================= 
                          total diamond type amount calculate 
                    ========================================= */}

                    {diamondCost?.length > 0 && (
                      <tr className="fs-14">
                        <td className="text-color-primary fw-medium">
                          {"Total Diamond value"}
                        </td>
                        <td className="text-color-primary">-</td>
                        <td className="text-color-primary">-</td>
                        <td className="text-color-primary">
                          {currencyFunction(calculateArray(allDiamondValues))}
                        </td>
                        <td className="text-color-primary">
                          {currencyFunction(
                            calculateArray(allDiamondFinalValue)
                          )}
                          <del className="ms-2">
                            {currencyFunction(calculateArray(allDiamondValues))}
                          </del>
                        </td>
                      </tr>
                    )}
                    {/* ========================================= 
                                  gemstone cost(s) 
                  ======================================= */}

                    {gemstoneCost?.length > 0 && (
                      <tr className="">
                        <td className="fs-12 text-uppercase text-danger">
                          GEMSTONE
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                    {gemstoneCost?.length > 0 &&
                      gemstoneCost?.map((item, index) => {
                        const costName = item?.metal;
                        const costWeight = item?.costWeight;
                        const totalCost = item?.totalCost;
                        const saveCost = item?.saveCost;
                        const amount = totalCost + saveCost;
                        allGemstoneValues.push(amount);
                        allGemstoneFinalValue.push(totalCost);
                        return (
                          <tr key={index} className="fs-14">
                            <td className="text-color-primary">{costName}</td>
                            <td className="text-color-primary">-</td>
                            <td className="text-color-primary">
                              {costWeight} ct
                            </td>
                            <td className="text-color-primary">
                              {currencyFunction(amount)}
                            </td>
                            <td className="text-color-secondary">
                              {currencyFunction(totalCost)}
                              {saveCost && (
                                <del className="ms-2">
                                  {currencyFunction(amount)}
                                </del>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                    {/* ========================================= 
                          total gemstone type amount calculate 
                    ========================================= */}

                    {gemstoneCost?.length > 0 && (
                      <tr className="fs-14">
                        <td className="text-color-primary fw-medium">
                          {"Total Diamond value"}
                        </td>
                        <td className="text-color-primary">-</td>
                        <td className="text-color-primary">-</td>
                        <td className="text-color-primary">
                          {currencyFunction(calculateArray(allGemstoneValues))}
                        </td>
                        <td className="text-color-primary">
                          {currencyFunction(
                            calculateArray(allGemstoneFinalValue)
                          )}
                          <del className="ms-2">
                            {currencyFunction(
                              calculateArray(allGemstoneValues)
                            )}
                          </del>
                        </td>
                      </tr>
                    )}

                    {/* ======================================== 
                                  other cost 
                  ======================================== */}

                    {otherCost?.length > 0 &&
                      otherCost?.map((item, index) => {
                        const costName = item?.costName;
                        const amount = item?.amount;
                        const totalCost = item?.totalCost;
                        return (
                          <tr key={index} className="fs-14">
                            <td className="text-color-primary">{costName}</td>
                            <td className="text-color-primary">-</td>
                            <td className="text-color-primary">-</td>
                            <td className="text-color-secondary">
                              {currencyFunction(amount)}
                            </td>
                            <td className="text-color-secondary">
                              {currencyFunction(totalCost)}
                              <del className="ms-2">
                                {currencyFunction(amount)}
                              </del>
                            </td>
                          </tr>
                        );
                      })}

                    <tr className="fs-14  border-top border-color-light-gray">
                      <td className="text-color-primary">Sub Total</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">
                        {calculateAllCostFinalValues(savedAmount) < totalCost
                          ? currencyFunction(totalCost)
                          : "-"}
                        {/* {currencyFunction(
                          calculateAllCostValues() -
                            countDiscount(calculateAllCostValues())
                        )} */}
                      </td>
                      <td className="text-color-primary">
                        {/* {currencyHandler(subTotal)} */}
                        {currencyFunction(
                          calculateAllCostFinalValues(savedAmount)
                        )}
                        {calculateAllCostFinalValues(savedAmount) <
                          totalCost && (
                          <del className="ms-2">
                            {currencyHandler(totalCost)}
                            {/* {currencyFunction(
                            calculateAllCostValues() -
                              countDiscount(calculateAllCostValues())
                          )} */}
                          </del>
                        )}
                      </td>
                    </tr>
                    <tr className="fs-14">
                      <td className="text-color-primary">Tax</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">-</td>
                      {/* <td className="text-color-primary">
                        {currencyFunction(
                          countTax(
                            calculateAllCostValues() -
                              countDiscount(calculateAllCostValues())
                          )
                        )}
                      </td> */}
                      <td>-</td>
                      <td className="text-color-primary">
                        {currencyFunction(
                          countTax(calculateAllCostFinalValues(savedAmount))
                        )}
                        {/* <del className="ps-2">
                          {currencyFunction(
                            countTax(
                              calculateAllCostValues() -
                                countDiscount(calculateAllCostValues())
                            )
                          )}
                        </del> */}
                      </td>
                    </tr>
                    <tr className="fs-14">
                      <td className="text-color-primary">Grand Total</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">-</td>
                      <td className="text-color-primary">
                        {calculateAllCostFinalValues(
                          savedAmount,
                          countTax(calculateAllCostFinalValues(savedAmount))
                        ) < totalCost ? (
                          <div>{currencyFunction(totalCost)}</div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-color-primary">
                        {currencyFunction(
                          calculateAllCostFinalValues(
                            savedAmount,
                            countTax(calculateAllCostFinalValues(savedAmount))
                          )
                        )}
                        {calculateAllCostFinalValues(
                          savedAmount,
                          countTax(calculateAllCostFinalValues(savedAmount))
                        ) < totalCost && (
                          <del className="ps-2">
                            {currencyFunction(
                              totalCost
                              //  +
                              // countTax(
                              //   calculateAllCostValues() -
                              //     countDiscount(calculateAllCostValues())
                              // )
                            )}
                          </del>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
            )}
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ProductInfo;
