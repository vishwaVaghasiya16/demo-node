import { Container } from "react-bootstrap";
import Introduction from "./Introduction";
import PageHeader from "../../../components/web/header/PageHeader";
import Quality from "./Quality";
import Collections from "./Collections";
import Company from "./Company";
import MissionAndVision from "./MissionAndVision";
import Video from "./Video";
import Team from "./Team";

const AboutUs = () => {
  return (
    <div className={`page-content`}>
      <Container>
        <PageHeader title="home" pageTitle="about us" />
      </Container>
      <main className={`about-us`}>
        <Introduction />
        <Quality />
        <Collections />
        <Company />
        <MissionAndVision />
        <Video />
        <Team />
      </main>
    </div>
  );
};

export default AboutUs;
