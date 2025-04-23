import { useDispatch, useSelector } from "react-redux";
import BannerSlideShow from "./BannerSlideShow";
import Sets from "./Sets";
import CommunityStories from "./CommunityStories";
import Collections from "./Collections";
import Gifting from "./Gifting";
import Blog from "./Blog";
import TrendingJewelry from "./TrendingJewelry";
import CollectionVideo from "./CollectionVideo";
import InstagramPost from "./InstagramPost";
import CustomerReview from "./CustomerReview";
import ShopByProduct from "./shopByProduct";
import { useEffect } from "react";
import Banner from "./Banner";
import { getHomeDataThunk } from "../../../store/actions";

const CollectionsOverview = () => {
  const { homeData } = useSelector((store) => store.CollectionsOverview);
  const homeDataByType = homeData?.result;
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const enumType = enumsData.homePageTypeEnum;
  const dispatch = useDispatch();
  const overviewBannerData = homeDataByType?.filter(
    (item) => item?.type == enumType?.OVERVIEW_BANNER
  )[0];
  const sliderBannerData = homeDataByType?.filter(
    (item) => item?.type == enumType?.BANNER
  )[0];
  const communityData = homeDataByType?.filter(
    (item) => item?.type == enumType?.COMMUNITY
  )[0];
  const collectionsData = homeDataByType?.filter(
    (item) => item?.type == enumType?.COLLECTIONS
  )[0];
  const giftData = homeDataByType?.filter(
    (item) => item?.type == enumType?.GIFT
  )[0];
  const instagramData = homeDataByType?.filter(
    (item) => item?.type == enumType?.INSTAGRAM
  )[0];

  useEffect(() => {
    dispatch(getHomeDataThunk());
  }, [dispatch]);

  return (
    <main className={`page-content`}>
      <BannerSlideShow data={sliderBannerData} />
      <Banner data={overviewBannerData} />
      <ShopByProduct />
      <Sets />
      <CommunityStories data={communityData} />
      <Collections data={collectionsData} />
      <Gifting data={giftData} />
      <TrendingJewelry data={homeData?.trendingProducts} />
      <CollectionVideo />
      <Blog data={homeData?.blogs} />
      <InstagramPost data={instagramData} />
      <CustomerReview data={homeData?.customerReview} />
    </main>
  );
};

export default CollectionsOverview;
