import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import handImage from "/assets/web/hand.webp";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const CommunityStories = ({ data }) => {
  const files = data?.files;
  const { categoryData } = useSelector((store) => store.Categories);

  const findCategoryBySubCategorySlug = (subCategorySlug) => {
    return (
      subCategorySlug &&
      categoryData.find((category) =>
        category.subCategory.some((subCat) => subCat.slug === subCategorySlug)
      )
    );
  };

  if (files?.length > 0) {
    return (
      <section>
        <Container className="paddingBottom">
          <div>
            <TextHoverAnimation content="Community Stories" word="c" />
            <div>
              <Swiper
                breakpoints={{
                  0: { slidesPerView: 1.5, spaceBetween: 15 },
                  575: { slidesPerView: 3, spaceBetween: 20 },
                  991: { slidesPerView: 4, spaceBetween: 10 },
                  1140: { slidesPerView: 5, spaceBetween: 28 },
                }}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={3}
                pagination={{ clickable: true }}
              >
                {files?.map((item, index) => {
                  const url = item?.urls;
                  // const findCategory = categoryData?.filter((item) => {
                  //   const data = item?.subCategory?.filter(
                  //     (item) => item.title == item?.subCategory?.title
                  //   );
                  //   if (data?.length > 0) {
                  //     return true;
                  //   }
                  //   return false;
                  // });
                  const title =
                    item?.category?.title || item?.subCategory?.title;
                  const slug = item?.category?.slug || item?.subCategory?.slug;
                  const img = item?.category?.url || item?.subCategory?.url;
                  const range = item?.range;
                  const findCategory = item?.subCategory?.slug
                    ? findCategoryBySubCategorySlug(item?.subCategory?.slug)
                    : {};
                  const redirectUrl = item?.redirectUrl;
                  return (
                    <SwiperSlide key={index} className="">
                      <div className="responsive">
                        <div className="community-parent cursor-pointer">
                          <div className="aspect-1-1_5 bg-color-primary br-10 overflow-hidden">
                            <Link
                              to={
                                Object.keys(findCategory)?.length > 0
                                  ? `${CLIENT.CATEGORY}/${findCategory.slug}/${slug}`
                                  : `${CLIENT.CATEGORY}/${slug}`
                              }
                              target="_blank"
                            >
                              <video
                                muted
                                className="h-100 transition-transform w-100 object-fit-cover"
                                src={url}
                                alt=""
                                autoPlay={true} // Autoplay is controlled by state
                              />
                            </Link>
                            <div className="community-info w-100 p-3 responsive">
                              <div className="d-flex gap-3 align-items-center">
                                <img
                                  src={
                                    img ||
                                    "https://cdn.caratlane.com/media/static/images/V4/2024/CL/05_May/Banner/Blog/01/Desktop.webp"
                                  }
                                  className="max-min-w-45 max-min-h-45 overflow-hidden rounded-circle object-fit-cover"
                                  alt=""
                                />
                                <div>
                                  <p className="p-0 m-0 text-white responsive fs-14 text-capitalize">
                                    {title}
                                  </p>
                                  <p className="p-0 m-0 text-white responsive fs-14 text-capitalize ">
                                    {range}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </Container>
      </section>
    );
  }
};

export default CommunityStories;
