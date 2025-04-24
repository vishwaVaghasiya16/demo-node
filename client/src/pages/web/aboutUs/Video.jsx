import { useSelector } from "react-redux";

const Video = () => {
  const { video } = useSelector((store) => store.AboutUsSlice);
  return (
    <>
      {video ? (
        <>
          <section className={`video-section paddingBottom`}>
            <div className="video bg-gradient-gray position-relative lh-0">
              <video
                //   onLoadStart={() => setHidePlayBtn(true)}
                //   onLoadedMetadata={() => setHidePlayBtn(false)}
                //   ref={videoRef}
                className="w-100 h-100 object-fit-cover"
                playsInline
                autoPlay
                loop
                muted
                //   src={
                //     video ||
                //     "https://assets.mixkit.co/videos/preview/mixkit-diamond-ring-up-close-20877-large.mp4"
                //   }
                preload="metadata"
              >
                <source src={video} type="video/mp4" />
              </video>
              {/* <Button
        onClick={handlePlay}
        className={`${
          hidePlayBtn ? "d-none" : "d-flex"
        } align-items-center justify-content-center position-absolute top-50 start-50 translate-middle p-0 m-0 bg-transparent border-2 border-white rounded-circle play-btn`}
      >
        <img src={play} alt="play-btn" className={`object-fit-cover`} />
      </Button> */}
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default Video;
