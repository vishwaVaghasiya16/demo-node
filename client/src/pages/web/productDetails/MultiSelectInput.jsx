import { useEffect, useState } from "react";
import { Modal, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import { currencyHandler } from "../../../helpers/currencyHandler";
import PropTypes from "prop-types";
import {
  getAllProductVariantThunk,
  getProductDetailsByIdThunk,
  getProductStatusNPriceThunk,
  getVariantDetailsThunk,
} from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const MultiSelectInput = ({ price, discountedPrice, slug, id }) => {
  // const encodedHTML = ""

  // function decodeHTMLEntities(html) {
  //   return html.replace(/&#(\d+);/g, function (match, dec) {
  //     return String.fromCharCode(dec);
  //   });
  // }

  // const decodedHTML = decodeHTMLEntities(encodedHTML);

  const { data, statusPriceData } = useSelector(
    (store) => store.ProductVariant
  );
  const { productDetails } = useSelector((store) => store.ProductDetails);
  const product = productDetails?.product;
  const filtereData = data?.filter((item) => item?.isDraft !== true);
  let allFilters = [...filtereData, productDetails];
  const filteredDiamondAtt = () => {
    return productDetails?.attributes?.filter(
      (item) => item.attTitle == "diamond"
    )[0]?.attName;
  };
  if (product) {
    allFilters.push(product);
  }
  // const [allFilters, setAllFilters] = useState([...data, productDetails])
  const [showModal, setShowModal] = useState(false);
  const [filteredMetalData, setFilteredMetalData] = useState(allFilters);
  const [allSizeData, setAllSizeData] = useState(allFilters);
  const [allDiamondData, setAllDiamondData] = useState(allFilters);
  const [selectedMetal, setSelectedMetal] = useState({
    purity: productDetails?.purity,
    metalColor: productDetails?.metalColor,
  });
  const [selectedRingSize, setSelectedRingSize] = useState({
    size: productDetails?.size,
    range: productDetails?.range,
  });
  const [selectedDiamond, setSelectedDiamond] = useState(filteredDiamondAtt());
  const [allFilteredOption, setAllFilteredOption] = useState({
    metal: [],
    size: [],
    diamondQuality: [],
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const productGrandTotal = productDetails?.product?.grandTotal;
  const productAvailability = productDetails?.product?.availability;
  const location = useLocation();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  // handle confirm customization

  const handleCustomCustomization = async () => {
    if (statusPriceData?.length > 0) {
      searchParams.set("variant", statusPriceData[0].slug);
      nav({ pathname: currentPath, search: searchParams.toString() });
      // dispatch(getVariantDetailsThunk({ id: statusPriceData[0]._id }));
    } else {
      if (productDetails?.product) {
        nav(`${CLIENT.PRODUCT_DETAILS}/${productDetails.product.slug}`);
        // dispatch(
        //   getProductDetailsByIdThunk({ slug: productDetails.product.slug })
        // );
        setSelectedMetal({
          metalColor: productDetails.product?.metalColor,
          purity: productDetails.product?.purity,
        });
        setSelectedRingSize({
          size: productDetails.product?.size,
          range: productDetails.product?.range,
        });
        // if you remove filterDiamond data then it also working properly i use this beacuse of fomatting
        const filterDimaondData = productDetails?.product?.attributes?.filter(
          (item) => item.attTitle == "diamond"
        );
        setSelectedDiamond(filterDimaondData[0]?.attName);
        // setSelectedDiamond(filteredDiamondAtt() || "");
        // setSelectedDiamond()
      } else {
        nav(`${CLIENT.PRODUCT_DETAILS}/${productDetails.slug}`);
        dispatch(getProductDetailsByIdThunk({ slug: productDetails.slug }));
        setSelectedMetal({
          metalColor: productDetails?.metalColor,
          purity: productDetails?.purity,
        });
        setSelectedRingSize({
          size: productDetails?.size,
          range: productDetails?.range,
        });
        // if you remove filterDiamond data then it also working properly i use this beacuse of fomatting
        const filterDimaondData = productDetails?.attributes?.filter(
          (item) => item.attTitle == "diamond"
        );
        setSelectedDiamond(filterDimaondData[0]?.attName);
        // setSelectedDiamond(filteredDiamondAtt() || "");
        // setSelectedDiamond()
      }
    }
    setShowModal(false);
  };

  // ========================================
  //       handle common filters
  // ========================================

  const compareMetalFilter = (filterData) => {
    if (
      !filterData?.filter(
        (item) =>
          item?.metalColor?.toLowerCase() ==
            selectedMetal?.metalColor?.toLowerCase() &&
          item?.purity?.toUpperCase() == selectedMetal?.purity?.toUpperCase()
      )?.length > 0
    ) {
      setSelectedMetal({
        metalColor: filterData[0]?.metalColor,
        purity: filterData[0]?.purity,
      });
    }
  };

  const compareSize = (filterData) => {
    if (
      !filterData?.filter((item) => item?.size == selectedRingSize.size)
        ?.length > 0
    ) {
      setSelectedRingSize({
        size: filterData[0]?.size,
        range: filterData[0]?.range,
      });
    }
  };

  const compareDiamond = (filterData) => {
    if (
      !filterData?.filter(
        (item) =>
          item?.attributes &&
          item?.attributes?.some((attr) => attr?.attName == selectedDiamond)
      )?.length > 0
    ) {
      // const findFilledArr = filterData?.filter(
      //   (item) => item?.attributes?.length > 0
      // );
      const findFilledArr = filterData?.filter((item) =>
        item?.attributes?.filter((value) => value.attName == selectedDiamond)
      );
      if (findFilledArr?.length > 0) {
        setSelectedDiamond(
          findFilledArr[0]?.attributes?.filter(
            (item) => item?.attTitle == "diamond"
          )[0]?.attName || ""
        );
      }
    }
  };

  // ========================================
  //       handle metal color filter
  // ========================================

  const handleMetalColorFilter = (value) => {
    if (value) {
      setSelectedMetal(value);
      const filteredMetal = allFilters.filter(
        (item) =>
          item?.metalColor.toLowerCase() == value?.metalColor.toLowerCase() &&
          item?.purity.toUpperCase() == value?.purity.toUpperCase()
      );
      compareSize(filteredMetal);
      compareDiamond(filteredMetal);
      setAllDiamondData(filteredMetal);
      setAllSizeData(filteredMetal);
    }
  };

  //  ========================================
  //         handle ring size filter
  //  ========================================

  const handleRingSizeFilter = (value) => {
    if (value) {
      setSelectedRingSize(value);
      const filteredSize = allFilters.filter(
        (item) => Math.floor(item?.size) == value.size
      );
      compareMetalFilter(filteredSize);
      compareDiamond(filteredSize);
      setAllDiamondData(filteredSize);
      setFilteredMetalData(filteredSize);
    }
  };

  //  ========================================
  //         handle diamond filter
  //  ========================================

  const handleDiamondFilter = (value) => {
    if (value) {
      setSelectedDiamond(value);
      const filteredData = allFilters?.filter(
        (item) =>
          item.attributes &&
          item.attributes.some((attr) => attr.attName == value)
      );
      compareMetalFilter(filteredData);
      compareSize(filteredData);
      setAllSizeData(filteredData);
      setFilteredMetalData(filteredData);
    }
  };

  // ============================================================
  //   handle show price and stock(status) of selected variant
  // ============================================================

  const handleSelectedVariant = () => {
    dispatch(
      getProductStatusNPriceThunk({
        metalColor: selectedMetal.metalColor,
        purity: selectedMetal.purity,
        size: selectedRingSize.size,
        product: productDetails?.product
          ? productDetails?.product?._id
          : productDetails?._id,
        attName: selectedDiamond,
      })
    );
  };

  useEffect(() => {
    handleSelectedVariant();
  }, [
    selectedDiamond,
    selectedMetal,
    selectedRingSize,
    slug,
    location.pathname,
  ]);

  useEffect(() => {
    dispatch(getAllProductVariantThunk({ product: id }));
  }, [slug]);

  useEffect(() => {
    setFilteredMetalData(allFilters);
    setAllSizeData(allFilters);
    setAllDiamondData(allFilters);
  }, [data, productDetails]);

  useEffect(() => {
    if (data && data.length > 0) {
      // ================================
      //          unique metal
      // ================================

      const uniqueMetal = new Set(
        filteredMetalData.map(
          (item) =>
            `${item?.metalColor?.toLowerCase()}-${item?.purity?.toLowerCase()}`
        )
      );
      const uniqueMetalArray = Array.from(uniqueMetal).map((item) => {
        const [metalColor, purity] = item.split("-");
        return {
          metalColor,
          purity: purity.toUpperCase(),
        };
      });

      // const metal = [
      //   ...new Set(
      //     filteredMetalData.map((item) => item.metalColor.toLowerCase())
      //   ),
      // ];
      const metal = uniqueMetalArray;

      // ================================
      //          unique size
      // ================================

      // Step 1: Create a set of unique sizes
      const uniqueSizes = new Set(
        allSizeData
          .map((item) => item?.size)
          .filter(
            (size) =>
              size !== undefined && size !== null && size !== "" && size > 0
          )
      );
      // Step 2: Convert the set to an array of objects and include the corresponding range
      const size = Array.from(uniqueSizes).map((uniqueSize) => {
        const correspondingItem = allSizeData.find(
          (item) => item.size === uniqueSize
        );
        return { size: parseInt(uniqueSize), range: correspondingItem?.range };
      });

      size.sort((a, b) => a.size - b.size);

      // ================================
      //      unique diamond quality
      // ================================

      const getAllDiamondAttr = allDiamondData
        ?.map((item) => {
          return item?.attributes?.filter(
            (value) => value?.attTitle && value.attTitle == "diamond"
          );
        })
        .flat()
        ?.filter((item) => item !== undefined);

      const diamondQuality = Array.from(
        new Set(getAllDiamondAttr.map((item) => item?.attName))
      );
      diamondQuality.sort((a, b) => a - b);

      // ================================
      //         filter option
      // ================================

      setAllFilteredOption({
        metal,
        size,
        diamondQuality,
      });
    } else {
      setAllFilteredOption({
        metal: [],
        size: [],
        diamondQuality: [],
      });
    }
  }, [data, filteredMetalData, allSizeData, productDetails, location.pathname]);
  if (
    allFilteredOption?.metal?.length > 0 ||
    allFilteredOption?.size?.length > 0 ||
    allFilteredOption?.diamondQuality?.length > 0
  ) {
    return (
      <div className="">
        <Form.Group>
          {/* ========== for show selected ring size ===== */}

          {selectedRingSize.size > 0 && (
            <InputGroup>
              <Form.Label className="fs-14 fw-normal text-color-primary">
                Select Options
              </Form.Label>
              <div
                className="w-100 position-relative border border-color-light-gray br-5 bg-color-titan-white d-flex align-items-center cursor-pointer"
                onClick={handleToggleModal}
              >
                <div className="border-none bg-transparent  fs-14 w-100 p-1 d-flex flex-wrap align-items-center gap-2 ">
                  <p className="p-0 m-0 text-wrap px-2 text-color-secondary py-1 br-5">
                    {selectedRingSize?.size}
                  </p>
                </div>
                <p onClick={handleToggleModal} className="m-0 pe-2">
                  <i className="ri-arrow-down-s-line fs-20 text-color-primary"></i>
                </p>
              </div>
            </InputGroup>
          )}

          {/* ========== for show selected other options ===== */}

          {(selectedMetal || selectedDiamond) && (
            <InputGroup className="mt-3 mt-md-4">
              <Form.Label className="fs-14 fw-normal text-color-primary">
                Select Options
              </Form.Label>
              <div
                className="w-100 position-relative border border-color-light-gray br-5 bg-color-titan-white d-flex align-items-center cursor-pointer"
                onClick={handleToggleModal}
              >
                <div className="border-none bg-transparent  fs-14 w-100 p-1 d-flex flex-wrap align-items-center gap-2 ">
                  {selectedMetal && (
                    <p className="p-0 m-0 text-wrap bg-white px-2 text-color-secondary py-1 br-5">
                      {selectedMetal?.purity + " " + selectedMetal?.metalColor}
                    </p>
                  )}
                  {selectedDiamond && (
                    <p className="p-0 m-0 text-wrap bg-white px-2 text-color-secondary py-1 br-5">
                      {selectedDiamond}
                    </p>
                  )}
                </div>
                <p onClick={handleToggleModal} className="m-0 pe-2">
                  <i className="ri-arrow-down-s-line fs-20 text-color-primary"></i>
                </p>
              </div>
            </InputGroup>
          )}

          {/* ================ filter option model =============== */}

          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              className="bg-color-titan-white btn-close-none"
            >
              <Modal.Title className="mx-auto">
                <p className="m-0 text-color-primary fs-20">
                  {/* Select variant */}
                  {/* {statusPriceData?.length > 0
                    ? currencyHandler(statusPriceData[0]?.grandTotal)
                    : currencyHandler(productDetails?.grandTotal || productGrandTotal || price)}{" "} */}
                  {currencyHandler(
                    statusPriceData?.[0]?.grandTotal ||
                      productGrandTotal ||
                      productDetails?.grandTotal ||
                      price
                  )}
                  {/* <s className="fs-14 text-color-secondary ms-1">
                    {currencyHandler(discountedPrice)}
                  </s> */}
                </p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 client-product-details-model">
              {/* ============================================= 
                         show all metals types 
            ============================================== */}
              {allFilteredOption.metal?.length > 0 && (
                <div>
                  <h6 className="text-color-primary mt-0 mt-md-3">
                    Choice of Metal
                  </h6>
                  {/* <div className="d-grid grid-cols-4 gap-3 gap-md-4"> */}
                  <Row className="flex-nowrap flex-lg-wrap overflow-x-scroll overflow-scroll-design">
                    {allFilteredOption?.metal?.map((item, index) => {
                      return (
                        <Col
                          xs={6}
                          sm={5}
                          lg={3}
                          key={index}
                          className="cursor-pointer mb-2 mb-lg-4"
                          onClick={() => handleMetalColorFilter(item)}
                        >
                          <div
                            className={`${
                              item.purity ==
                                selectedMetal.purity.toUpperCase() &&
                              item.metalColor ==
                                selectedMetal.metalColor.toLowerCase()
                                ? "bg-color-primary text-white"
                                : "bg-color-titan-white text-color-primary"
                            }   p-2 border border-color-light-gray text-center br-5`}
                          >
                            <div className="py-3">
                              <h5 className="m-0 fs-14 fw-normal mb-2">
                                {item?.purity}
                              </h5>
                              <h6 className="m-0 fs-14 fw-normal text-capitalize">
                                {item?.metalColor}
                              </h6>
                            </div>
                            {item.purity ==
                              selectedMetal.purity.toUpperCase() &&
                            item.metalColor ==
                              selectedMetal.metalColor.toLowerCase() ? (
                              <Button
                                className={`bg-white text-capitalize text-color-primary w-100 border-0 transition-background fs-12 py-2`}
                              >
                                {statusPriceData?.length > 0
                                  ? statusPriceData[0]?.availability
                                    ? statusPriceData[0]?.quantity > 5
                                      ? "In stock"
                                      : `only ${statusPriceData[0]?.quantity} Left!`
                                    : "out stock"
                                  : "Order Now"}
                              </Button>
                            ) : (
                              <Button
                                className={`bg-color-primary hover-bg-secondary w-100 border-0 transition-background fs-12 py-2`}
                              >
                                Order Now
                              </Button>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              )}
              {/* ============================================= 
                         show all ring sizes 
            ============================================= */}
              {allFilteredOption.size?.length > 0 && (
                <div>
                  <h6 className="text-color-primary mt-3 mt-md-3">
                    Select Size
                  </h6>
                  <Row className="flex-nowrap flex-lg-wrap overflow-x-scroll overflow-scroll-design">
                    {allFilteredOption.size?.map((item, index) => {
                      const selectedSizeValue = Math.floor(
                        selectedRingSize?.size
                      );
                      return (
                        <Col
                          xs={6}
                          sm={5}
                          lg={3}
                          key={index}
                          className="cursor-pointer mb-2 mb-lg-4"
                          onClick={() => handleRingSizeFilter(item)}
                        >
                          <div
                            className={`${
                              selectedSizeValue == item?.size
                                ? "bg-color-primary text-white"
                                : "bg-color-titan-white text-color-primary"
                            }   p-2 border border-color-light-gray text-center br-5`}
                          >
                            <div className="py-3">
                              <h5 className="m-0 fs-14 fw-normal mb-2">
                                {item?.size}
                              </h5>
                              <h6 className="m-0 fs-14 fw-normal text-capitalize">
                                {item?.range}
                              </h6>
                            </div>
                            {selectedSizeValue == item?.size ? (
                              <Button
                                className={`
                                  bg-white text-color-primary
                              w-100 border-0 text-capitalize transition-background fs-12 py-2`}
                              >
                                {statusPriceData?.length > 0
                                  ? statusPriceData[0]?.availability
                                    ? statusPriceData[0]?.quantity > 5
                                      ? "In stock"
                                      : `only ${statusPriceData[0]?.quantity} Left!`
                                    : "out stock"
                                  : "Order Now"}
                              </Button>
                            ) : (
                              <Button
                                className={`bg-color-primary hover-bg-secondary w-100 border-0 transition-background fs-12 py-2`}
                              >
                                Order Now
                              </Button>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              )}
              {/* ============================================ 
                       show all diamond quality 
            ============================================= */}
              {allFilteredOption.diamondQuality?.length > 0 && (
                <div>
                  <h6 className="text-color-primary mt-3 mt-md-3">
                    Diamond Quality
                  </h6>
                  <Row className="flex-nowrap flex-lg-wrap overflow-x-scroll overflow-scroll-design">
                    {allFilteredOption?.diamondQuality?.map((item, index) => {
                      const attName = item;
                      return (
                        <Col
                          xs={6}
                          sm={5}
                          lg={3}
                          key={index}
                          className="cursor-pointer mb-2 mb-lg-4"
                          onClick={() => handleDiamondFilter(attName)}
                        >
                          <div
                            className={`${
                              selectedDiamond == attName
                                ? "bg-color-primary text-white"
                                : "bg-color-titan-white text-color-primary"
                            }   p-2 border border-color-light-gray text-center br-5`}
                          >
                            <div className="py-3">
                              <h5 className="m-0 fs-14 fw-normal mb-2">
                                {attName}
                              </h5>
                            </div>
                            {selectedDiamond == attName ? (
                              <Button
                                className={`
                                  bg-white text-color-primary
                              w-100 border-0 transition-background fs-12 py-2 text-capitalize`}
                              >
                                {statusPriceData?.length > 0
                                  ? statusPriceData[0]?.availability
                                    ? statusPriceData[0]?.quantity > 5
                                      ? "In stock"
                                      : `only ${statusPriceData[0]?.quantity} Left!`
                                    : "out stock"
                                  : "Order Now"}
                              </Button>
                            ) : (
                              <Button
                                className={`bg-color-primary hover-bg-secondary w-100 border-0 transition-background fs-12 py-2`}
                              >
                                Order Now
                              </Button>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              )}
              <Modal.Footer
                className="border-0 p-0 mt-4 mt-md-5"
                onClick={handleCustomCustomization}
              >
                <Button className="primary-btn w-100">
                  Confirm Customization
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Modal>
        </Form.Group>
      </div>
    );
  }
};

MultiSelectInput.propTypes = {
  price: PropTypes.any,
  discountedPrice: PropTypes.any,
  metals: PropTypes.any,
  sizes: PropTypes.any,
  diamondQualities: PropTypes.any,
  slug: PropTypes.string,
};

export default MultiSelectInput;
