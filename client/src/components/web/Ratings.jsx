import ReactStars from "react-stars";
import PropTypes from "prop-types";

const Ratings = ({ ratings = 0, size = 14, edit = false, ...props }) => {
  return (
    <ReactStars
      count={5}
      value={ratings}
      size={size}
      half={true}
      edit={edit}
      color2="#24ff00"
      {...props}
    />
  );
};

Ratings.propTypes = {
  ratings: PropTypes.number,
  size: PropTypes.number,
  edit: PropTypes.bool,
};

export default Ratings;
