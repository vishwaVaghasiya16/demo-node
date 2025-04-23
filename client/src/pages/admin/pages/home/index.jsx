import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import BannerSectionForm from "./BannerSectionForm";
import OverviewBannerSection from "./OverviewBannerSection";
import { Button, Col, Row } from "react-bootstrap";
import { addSpacesToCamelCase } from "../../../../helpers/customFunctions";
import CommunitySection from "./CommunitySection";
import CollectionsSection from "./CollectionsSection";
import GiftSection from "./GiftSection";
import InstagramSection from "./InstagramSection";
import { getHomeDataThunk } from "../../../../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { homeData } = useSelector((store) => store.CollectionsOverview);
  const homeDataByType = homeData?.result;
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const enumType = enumsData.homePageTypeEnum;
  const [sectionType, setSectionType] = useState("");
  const sliderBannerData = sectionType === enumType?.BANNER;
  const overviewBannerData = sectionType === enumType?.OVERVIEW_BANNER;
  const communityData = sectionType === enumType?.COMMUNITY;
  const collectionsData = sectionType === enumType?.COLLECTIONS;
  const giftData = sectionType === enumType?.GIFT;
  const instagramData = sectionType === enumType?.INSTAGRAM;

  const sectionData = homeDataByType?.filter(
    (item) => item?.type == sectionType
  )[0];

  const navigate = [
    {
      section: enumType?.BANNER,
      label: "banner slider",
    },
    {
      section: enumType?.OVERVIEW_BANNER,
      label: "banner overview",
    },
    {
      section: enumType?.COMMUNITY,
      label: "community",
    },
    {
      section: enumType?.COLLECTIONS,
      label: "collections",
    },
    {
      section: enumType?.GIFT,
      label: "gift",
    },
    {
      section: enumType?.INSTAGRAM,
      label: "instagram",
    },
  ];

  useEffect(() => {
    setSectionType(enumType?.BANNER);
  }, [enumType]);

  useEffect(() => {
    dispatch(getHomeDataThunk());
  }, [dispatch]);

  return (
    <div className={`py-20`}>
      <BreadCrumb
        title="Pages"
        subPageTitle={addSpacesToCamelCase(sectionType)}
        pageTitle="Home"
      />
      <div className={`p-3 br-5 bg-white`}>
        <div className={`options`}>
          <Row className={`gap-2 px-2`}>
            {navigate.map((ele, index) => {
              return (
                <Col key={index} className={`col-auto px-1 my-1`}>
                  <Button
                    onClick={() => setSectionType(ele.section)}
                    className={`${
                      sectionType === ele.section
                        ? "bg-color-primary text-color-titan-white"
                        : "bg-transparent hover-bg-primary hover-titan-color-white  text-color-primary"
                    } text-color-primary page-routes-button px-3 py-2 border border-color-primary fs-14 fw-medium lh-base br-5 text-capitalize transition`}
                  >
                    {ele.label}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <div className={`sections-form mt-3`}>
        {sliderBannerData ? (
          <BannerSectionForm sectionData={sectionData} type={sectionType} />
        ) : overviewBannerData ? (
          <OverviewBannerSection sectionData={sectionData} type={sectionType} />
        ) : communityData ? (
          <CommunitySection sectionData={sectionData} type={sectionType} />
        ) : collectionsData ? (
          <CollectionsSection sectionData={sectionData} type={sectionType} />
        ) : giftData ? (
          <GiftSection sectionData={sectionData} type={sectionType} />
        ) : instagramData ? (
          <InstagramSection sectionData={sectionData} type={sectionType} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
