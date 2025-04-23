import { Container } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import CommonAccordion from "../../../components/common/accordion/CommonAccordion";
import { returnPolicy } from "../../../data/policy";

const Return = () => {
  return (
    <div className="page-content">
      <Container>
        <div>
          <PageHeader title="Home" pageTitle="Privacy Policy" />
        </div>
        <div className={`paddingY`}>
          {returnPolicy.map((ele, index) => {
            const title = ele.title;
            const accordionData = ele.accordionData;
            return (
              <CommonAccordion
                key={index}
                title={title}
                accordionData={accordionData}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Return;
