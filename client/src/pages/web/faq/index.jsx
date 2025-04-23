import { Container } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import CommonAccordion from "../../../components/common/accordion/CommonAccordion";
import { faqData } from "../../../data/faq";

const Faq = () => {
  return (
    <div className="page-content">
      <Container>
        <div>
          <PageHeader
            displayTitle="frequently asked questions"
            title="Home"
            pageTitle="faq"
          />
        </div>
        <div className={`paddingY`}>
          {faqData.map((ele, index) => {
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

export default Faq;
