import PropTypes from "prop-types";
const YTVideoHandler = ({ url, thumbnail = false, className, ...props }) => {
  const match =
    url &&
    url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^/\n\s]+\/\S+\/|[^/\n\s]+\/|\S*?[?&]v=))([^"&?/\s]{11})/
    );
  return (
    <div className="w-100 h-100">
      {match && !thumbnail && (
        <iframe
          {...props}
          className={`${className} w-100 h-100`}
          src={`https://www.youtube.com/embed/${match[1]}?si=4bqYIwZXGnWOKwl0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
      {match && thumbnail && (
        <img
          {...props}
          loading="lazy"
          className={`${className} w-100 h-100`}
          src={`https://img.youtube.com/vi/${match[1]}/sddefault.jpg`}
          alt="Wonder x vision video thumbnail"
        />
      )}
    </div>
  );
};

YTVideoHandler.propTypes = {
  url: PropTypes.string,
  thumbnail: PropTypes.bool,
  className: PropTypes.string,
};

export default YTVideoHandler;
