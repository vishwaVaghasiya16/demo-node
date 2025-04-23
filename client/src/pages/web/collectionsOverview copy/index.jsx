import Blog from "./Blog";
import Collections from "./Collections";
import ExploreCollections from "./ExploreCollections";
import Gifting from "./Gifting";
import JewelryTrends from "./JewelryTrends";
import LatestCollection from "./LatestCollection";
import PlatinumCollection from "./PlatinumCollection";
import ShopByCategory from "./ShopByCategory";

const CollectionsOverview = () => {
  return (
    <main>
      <LatestCollection />
      <ShopByCategory />
      <Collections />
      <ExploreCollections />
      <JewelryTrends />
      <Gifting />
      <PlatinumCollection />
      <Blog />
    </main>
  );
};

export default CollectionsOverview;
