import { Col, Container, Row } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { qualitySectionAttributesData } from "../../../data/aboutUs";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import { useEffect } from "react";
import { getAboutUsThunk } from "../../../store/actions";
import { setQualitySectionData } from "../../../store/aboutUs/slice";
import { capitalizeFirstWord } from "../../../helpers/customFunctions";

const Quality = () => {
  const dispatch = useDispatch();
  const { qualitySectionData } = useSelector((store) => store.AboutUsSlice);
  const { enumsData } = useSelector((store) => store.EnumsSlice);

  useEffect(() => {
    (async () => {
      if (enumsData?.aboutUsTypeEnum?.SCORE) {
        const res = await dispatch(
          getAboutUsThunk({ type: enumsData?.aboutUsTypeEnum?.SCORE })
        );
        if (getAboutUsThunk.fulfilled.match(res)) {
          dispatch(setQualitySectionData(res.payload.data));
        }
      }
    })();
  }, [dispatch, enumsData]);
  return (
    <>
      {qualitySectionData?.length > 0 ? (
        <section className={`quality-section paddingBottom`}>
          <Container>
            <div className={`pt-2 pt-md-0 pb-3 pb-md-4`}>
              <TextHoverAnimation content="Quality is our priority" word="q" />
            </div>
            <p
              className={`w-fit text-center mx-auto fw-normal lg-base responsive fs-14 text-color-secondary`}
            >
              Our talented stylists have put together outfits that are perfect
              for the season. They&apos; ve variety of ways to inspire your next
              fashion-forward look.
            </p>
            <div className="mt-3 mt-lg-4 pt-3 pt-lg-5 px-3 px-lg-5 pb-sm-3 pb-lg-5 border bg-color-titan-white br-10">
              <Row
                className={`flex-column flex-sm-row align-items-center justify-content-between`}
              >
                {qualitySectionAttributesData.map((ele, index) => {
                  const img = ele.image;
                  const title = ele.title;
                  const description = ele.description;
                  return (
                    <Col className={`mb-3 mb-sm-0`} key={index} xs={12} sm={4}>
                      <div className={`text-center px-lg-3 px-xxl-5`}>
                        <div
                          className={`mb-2 mb-md-3 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-white icon-image`}
                        >
                          <img
                            src={img}
                            alt="quality"
                            className={`w-100 h-100 object-fit-cover`}
                          />
                        </div>
                        <h3
                          className={`responsive fs-5 lh-base text-color-primary fw-medium mb-1 mb-md-2`}
                        >
                          {title}
                        </h3>
                        <p
                          className={`mb-0 truncate-line-4 w-fit text-center mx-auto fw-normal lg-base responsive fs-14 text-color-secondary`}
                        >
                          {description}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
            {qualitySectionData.map((items, index) => {
              const id = items?._id;
              const image = items?.image;
              const headTitle = items?.headTitle;
              const description = items?.description;
              const scores = items?.scores;
              return (
                <div
                  key={id || index}
                  className={`satisfaction-stats paddingTop`}
                >
                  <Row
                    className={`flex-column flex-lg-row  align-items-center align-items-lg-center`}
                  >
                    <Col
                      xs={12}
                      sm={8}
                      lg={6}
                      className={`mb-2 mb-md-4 mb-lg-0`}
                    >
                      <div className="col-image br-10 overflow-hidden">
                        <img
                          src={image}
                          alt="satisfaction-stats"
                          className={`w-100 h-100 object-fit-cover`}
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} className={`mt-md-1 mt-lg-0`}>
                      <div className={`satisfaction-stats-details`}>
                        <h2
                          className={`about-us-common-heading mb-0 fs-30 text-color-primary fw-medium`}
                        >
                          {capitalizeFirstWord(headTitle)}
                        </h2>
                        <p
                          className={`my-2 my-md-3 my-xxl-4 fw-normal lg-base responsive fs-14 text-color-secondary`}
                        >
                          {capitalizeFirstWord(description)}
                        </p>
                        <div className={`pt-1 pt-md-0`}>
                          {scores && scores.length > 0
                            ? scores.map((ele) => {
                                const id = ele?._id;
                                const title = ele.scoreTitle;
                                const number = ele.number;
                                const symbol = ele.symbol;
                                const isProgress = ele?.isProgress;
                                return isProgress ? (
                                  <div key={id} className={`pb-3 pb-xxl-4`}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                      <span
                                        className={`responsive fs-14 fw-medium lh-base text-color-primary`}
                                      >
                                        {title}
                                      </span>
                                      <span
                                        className={`responsive fs-14 fw-medium lh-base text-color-primary`}
                                      >
                                        {number + " " + symbol}
                                      </span>
                                    </div>
                                    <progress
                                      className="br-10 overflow-hidden w-100 progress"
                                      max="100"
                                      value={number}
                                    ></progress>
                                  </div>
                                ) : null;
                              })
                            : null}
                        </div>

                        <div className={`mt-xxl-3`}>
                          <Row>
                            {scores && scores.length > 0
                              ? scores.map((ele) => {
                                  const id = ele?._id;
                                  const title = ele.scoreTitle;
                                  const number = ele.number;
                                  const symbol = ele.symbol;
                                  const isProgress = ele?.isProgress;
                                  return !isProgress ? (
                                    <Col
                                      key={id}
                                      className={`mb-3`}
                                      xs={6}
                                      sm={3}
                                    >
                                      <div className={`text-center`}>
                                        <span
                                          className={`counter d-block responsive fs-1 fw-medium text-color-primary lh-base`}
                                        >
                                          <CountUp
                                            end={number}
                                            decimals={0}
                                            enableScrollSpy={true}
                                            scrollSpyOnce={true}
                                          />
                                          {symbol}
                                        </span>
                                        <h6
                                          className={`mb-0 label truncate-line-2 text-color-secondary fw-normal responsive fs-14 lh-base`}
                                        >
                                          {title}
                                        </h6>
                                      </div>
                                    </Col>
                                  ) : null;
                                })
                              : null}
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Container>
        </section>
      ) : null}
    </>
  );
};

export default Quality;
