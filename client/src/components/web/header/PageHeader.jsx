import BreadCrumb from "../../web/breadCrumb/BreadCrumb";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import { CLIENT } from "../../../routes/routesConstants";
import { setClearAllFilters } from "../../../store/products/slice";
import { formatNumber } from "../../../helpers/customFunctions";

const PageHeader = ({
  title,
  pageTitle,
  subPageTitle,
  categories = false,
  displayTitle,
  totalProductCount = 0,
  isShowCount = false,
}) => {
  const { categoryData } = useSelector((store) => store?.Categories);
  const dispatch = useDispatch();

  const handleClickEvent = () => {
    dispatch(setClearAllFilters());
  };

  return (
    <div className="page-header border text-center bg-color-titan-white py-3 py-md-4 py-lg-5 px-3 px-sm-4 br-10">
      {title && pageTitle ? (
        <div className={`${categories ? "pb-3 pb-md-4" : ""}`}>
          <h2
            className={`page-header-title responsive fs-2 fw-medium ls-1px lh-1 text-capitalize text-color-primary`}
          >
            {displayTitle || subPageTitle || pageTitle || title}
            {isShowCount && (
              <span
                className={`d-block d-sm-inline mt-1 mt-sm-0 text-capitalize ms-2 text-color-secondary`}
              >
                ( {formatNumber(totalProductCount)} designs )
              </span>
            )}
          </h2>
          <div className={`mb-md-1 w-fit mx-auto`}>
            <BreadCrumb
              title={title}
              pageTitle={pageTitle}
              subPageTitle={subPageTitle}
            />
          </div>
        </div>
      ) : null}
      {categories ? (
        <div className={`categories-box`}>
          <div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={categoryData.length > 10 && true}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                440: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                550: {
                  slidesPerView: 5,
                  spaceBetween: 16,
                },
                730: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
                992: {
                  slidesPerView: 7,
                  spaceBetween: 24,
                },
                1200: {
                  slidesPerView: 8,
                  spaceBetween: 24,
                },
                1400: {
                  slidesPerView: 10,
                  spaceBetween: 24,
                },
              }}
            >
              {categoryData?.map((ele, index) => {
                const img = ele?.url;
                const title = ele?.title;
                const count = 0;
                const path = ele?.slug;
                return (
                  <SwiperSlide key={ele._id || index}>
                    <Link
                      onClick={handleClickEvent}
                      to={`${CLIENT.CATEGORY}/${path}`}
                    >
                      <div className={`mx-auto position-relative`}>
                        <div
                          className={`border border-4 border-color-light-gray category-image rounded-circle overflow-hidden`}
                        >
                          <img
                            src={img}
                            alt={`category-${index + 1}`}
                            className={`w-100 h-100 object-fit-cover`}
                          />
                        </div>
                        {Number(count) ? (
                          <div
                            className={`mb-1 me-1 position-absolute bottom-0 end-0 sub-categories-count rounded-circle bg-color-primary d-flex align-items-center justify-content-center`}
                          >
                            <span
                              className={`text-white m-0 responsive fs-12 fw-semibold lh-base`}
                            >
                              {count}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <h2
                        className={`mb-0 mt-md-2 text-color-primary fw-semibold responsive fs-18 lh-base text-capitalize`}
                      >
                        {title}
                      </h2>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      ) : null}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.any,
  displayTitle: PropTypes.any,
  pageTitle: PropTypes.any,
  subPageTitle: PropTypes.any,
  categories: PropTypes.any,
  totalProductCount: PropTypes.any,
  isShowCount: PropTypes.bool,
};

export default PageHeader;
