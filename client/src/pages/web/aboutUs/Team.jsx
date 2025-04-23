import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";
import { useDispatch, useSelector } from "react-redux";
import { iconsEnum, iconsEnumKey } from "../../../helpers/enum";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect } from "react";
import { getAboutUsThunk, getAllStaffsThunk } from "../../../store/actions";
import { setTeamSectionData } from "../../../store/aboutUs/slice";

const Team = () => {
  const dispatch = useDispatch();
  const { teamMembers } = useSelector((store) => store.AboutUsSlice);
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const { allStaffs, loading } = useSelector((store) => store.Auth);

  useEffect(() => {
    (async () => {
      await dispatch(getAllStaffsThunk({ limit: 10 }));
    })();
  }, [dispatch, enumsData]);
  return (
    <>
      {allStaffs && allStaffs?.length > 0 ? (
        <section className={`team-section paddingBottom`}>
          <Container>
            <div className={`pt-3 pt-md-0`}>
              <TextHoverAnimation content="Successful Team" word="t" />
            </div>
            <p
              className={`w-fit text-center mx-auto fw-normal lg-base responsive fs-14 text-color-secondary`}
            >
              Our roots are digital, our passion is contagious and most
              importantly, our people are creative, inspiring, and dedicated!
            </p>
            <div className={`mt-3 mt-lg-4 px-lg-1`}>
              <Swiper
                className="text-center justify-content-center swiper-pagination-static"
                slidesPerView={3}
                modules={[Autoplay, Navigation]}
                navigation={{
                  // Configure Swiper to use navigation
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={teamMembers?.length > 4 && true}
                // className="py-3 px-lg-3"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  400: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  740: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1100: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {allStaffs?.map((ele, index) => {
                  const id = ele?._id;
                  const image = ele?.url;
                  const name = ele?.username;
                  const role = ele?.role;
                  const media = {
                    facebook: {
                      link: ele?.facebook,
                      icon: iconsEnumKey.FACEBOOK,
                    },
                    linkedin: {
                      link: ele?.linkedin,
                      icon: iconsEnumKey.LINKEDIN,
                    },
                    instagram: {
                      link: ele?.instagram,
                      icon: iconsEnumKey.INSTAGRAM,
                    },
                    twitter: { link: ele?.twitter, icon: iconsEnumKey.TWITTER },
                  };
                  return (
                    <SwiperSlide key={id || index} className="responsive">
                      <div className={`team-details-box text-center`}>
                        <div className="zoom-hover mb-2 mb-ld-3 team-member-image bg-gradient-gray br-5 overflow-hidden">
                          <img
                            src={image}
                            alt={name}
                            className={`w-100 h-100 object-fit-cover zoom transition-transform`}
                          />
                        </div>
                        <h4
                          className={`mb-0 mt-3 text-capitalize responsive fs-18 fw-medium lh-base text-color-primary`}
                        >
                          {name}
                        </h4>
                        <span
                          className={`text-capitalize responsive fs-14 fw-normal text-color-secondary lh-base`}
                        >
                          {role}
                        </span>
                        <ul className="m-0 p-0 d-flex gap-2 gap-sm-3 flex-wrap justify-content-center mt-2">
                          {Object.keys(media)?.map((ele) => {
                            const link = media[ele]?.link;
                            const icon = media[ele]?.icon;
                            if (link) {
                              return (
                                <li className="social-media-icon bg-color-primary hw-25 rounded-circle d-flex align-items-center justify-content-center cursor-pointer zoom-hover zoom transition-transform">
                                  <a
                                    href={link}
                                    target="_blank"
                                    className="text-white"
                                  >
                                    <i
                                      className={`responsive fs-16 fw-medium ${iconsEnum[icon]}`}
                                    ></i>
                                  </a>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
};

export default Team;
