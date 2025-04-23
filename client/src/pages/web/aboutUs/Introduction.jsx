import { Container } from "react-bootstrap";
import TextHoverAnimation from "../../../components/web/TextHoverAnimation";

const Introduction = () => {
  return (
    <section className={`introduction-section paddingY`}>
      <Container>
        <div className={`pt-2 pt-md-0`}>
          <TextHoverAnimation content="we are alukas & co" word="a" />
        </div>
        <p
          className={`w-fit text-center mx-auto fw-normal lg-base responsive fs-14 text-color-secondary`}
        >
          Welcome to our classic and styles modern jewelry store, where we
          believe that timeless style never goes out of fashion. Our collection
          features classic <br className={`d-none d-xl-block`} /> pieces that
          are both stylish and versatile, perfect for building a jewelry that
          will last for years.
        </p>
      </Container>
      <div className={`introduction-images-box mt-3 mt-lg-4`}>
        <div className={`h-100 d-flex align-items-center`}>
          <div className={`w-50 h-100 introduction-image`}>
            <img
              src="https://avatars.mds.yandex.net/i?id=5f3d481d1afc3694f28ee68c82ef2a13bb15a677-11269055-images-thumbs&n=13"
              alt="introduction-image-1"
              className={`w-100 h-100 object-fit-cover`}
            />
          </div>
          <div className={`w-50 h-100 introduction-image`}>
            <img
              src="https://avatars.mds.yandex.net/i?id=01a1d03d815e7eb6f60e2b2133f161c56f5aa6a5-9229079-images-thumbs&n=13"
              alt="introduction-image-1"
              className={`w-100 h-100 object-fit-cover`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
