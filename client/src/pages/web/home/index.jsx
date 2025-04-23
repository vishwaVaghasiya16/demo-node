import { Col } from "react-bootstrap";
import thumbnail1 from "/assets/web/thumbnail1.webp";
import thumbnail2 from "/assets/web/thumbnail2.webp";
import thumbnail3 from "/assets/web/thumbnail3.webp";

import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const LandingPage = () => {
  // const [showAcceptCookies, setAcceptCookies] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAcceptCookies(true);
  //   }, 4000);
  //   // const scroll = () => {
  //   //   if (window.scrollY >= 500) {
  //   //     setAcceptCookies(true);
  //   //   }
  //   // };
  //   // window.addEventListener("scroll", scroll);
  //   // return () => {
  //   //   window.removeEventListener("scroll", scroll);
  //   // };
  // }, []);

  const data = [
    {
      _id: "1",
      thumbnail: thumbnail1,
      title: "Art by Solvania",
      description: "Discover the collection Designed for Spring/Summer 2024",
    },
    {
      _id: "2",
      thumbnail: thumbnail2,
      title: "Summer Magic",
      description: "Discover the Rings, Occasion Pieces, Pandora and more.",
    },
    {
      _id: "3",
      thumbnail: thumbnail3,
      title: "Living Pendant",
      description: "Discover Vivid and Cxpressive jewelry in the Collection/23",
    },
  ];
  return (
    <>
      <main className="full-header-space">
        <section className="position-relative landing-vh landing-page paddingBottom">
          {data?.map((item, index) => {
            const thumbnail = item?.thumbnail;
            const title = item?.title;
            const description = item?.description;
            return (
              <div
                key={index}
                className="w-100 vh-100 min-h-500px d-flex align-items-center bg-cover bg-no-repeat bg-attachment-fixed bg-position-center"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                }}
              >
                <div className="container p-4 responsive">
                  <Col xs={12} md={6} lg={5} xl={4}>
                    <div>
                      <h2
                        className={`text-white text-white-shadow
                        }  ff-mayFest fs-95 line-height-1_1 text-center text-md-start`}
                      >
                        {title}
                      </h2>{" "}
                      <p
                        className={`text-white
                        } mt-2 pb-2 ls-0_7px text-center text-md-start`}
                      >
                        {description}
                      </p>
                      <div className="d-flex gap-2 mt-5 text-center w-fit mx-auto mx-md-0">
                        <Link
                          to={CLIENT.CATEGORY}
                          className=" white-border-btn max-w-fit text-capitalize fs-14 px-4"
                        >
                          discover collection
                        </Link>
                        {/* <button className="white-btn text-capitalize fs-14">
                          shop now
                        </button> */}
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            );
          })}
          {/* <div
            className={`bg-white position-fixed w-100 bottom-0 transition-opacity ${
              showAcceptCookies ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center  py-2 container d-flex  align-items-center justify-content-center flex-wrap">
              <p className="d-block  mb-2 mb-sm-0 d-sm-inline truncate-overflow">
                We use cookies to ensure that we give you the best experience on
                our website. If you continue to use this site we will assume
                that you are happy with it.
              </p>
              <button
                onClick={() => setAcceptCookies(false)}
                className="btn text-white border-0 p-0 primary-btn fs-12 ms-4 my-1"
              >
                Yes, I,m Accept
              </button>
            </div>
          </div> */}
        </section>
      </main>
    </>
  );
};

export default LandingPage;
