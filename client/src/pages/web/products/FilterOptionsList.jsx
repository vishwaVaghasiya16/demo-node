import PropTypes from "prop-types";
import { useState } from "react";
import { filterOptionsViewMoreLength } from "../../../helpers/enum";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setSelectedFilterData,
} from "../../../store/products/slice";

const FilterOptionsList = ({ filters, title }) => {
  const dispatch = useDispatch();
  const { checkedFilter } = useSelector((store) => store.Products);
  const [isShowMore, setIsShowMore] = useState(false);

  const handleFilter = (selectedData) => {
    dispatch(setCurrentPage(1));
    const { filterType, queryString } = selectedData;
    dispatch(setSelectedFilterData({ filterType, queryString }));
  };

  return (
    <>
      <ul className={`m-0 p-0 border-bottom border-color-light-gray mb-3 py-2`}>
        <h3
          className={`mb-2 text-capitalize text-color-primary fw-medium responsive fs-16 lh-base`}
        >
          {title}
        </h3>
        {filters
          .slice(0, isShowMore ? filters.length : filterOptionsViewMoreLength)
          ?.map((ele, index) => {
            const id = ele._id;
            const queryString = ele?.query;
            const displayName = ele?.displayName;
            return (
              <li
                key={id || index}
                onClick={() => handleFilter({ queryString, filterType: title })}
                className={`cursor-pointer d-flex flex-wrap gap-2 mb-3`}
              >
                <input
                  className={`text-danger p-2`}
                  type="radio"
                  checked={checkedFilter[queryString] || false}
                  onChange={() =>
                    handleFilter({ queryString, filterType: title })
                  }
                />
                <span
                  className={`text-overflow-ellipsis w-75 text-capitalize text-color-secondary responsive fs-14 fw-normal lh-base ls-1px`}
                >
                  {displayName}
                </span>
              </li>
            );
          })}
        {filters?.length > filterOptionsViewMoreLength ? (
          <Button
            onClick={() => setIsShowMore(!isShowMore)}
            className={`mb-3 d-flex align-items-center justify-content-center gap-1 p-0 m-0 bg-transparent border-0`}
          >
            <div
              className={`border border-2 border-color-primary filter-show-more-btn rounded-circle d-flex align-items-center justify-content-center`}
            >
              <i
                className={`fs-14 lh-base fw-semibold text-color-primary ${
                  isShowMore ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                }`}
              ></i>
            </div>
            <span
              className={`text-capitalize d-block fs-16 fw-medium text-color-primary lh-base`}
            >
              {isShowMore ? "less" : "more"}
            </span>
          </Button>
        ) : null}
      </ul>
    </>
  );
};

FilterOptionsList.propTypes = {
  filters: PropTypes.any,
  title: PropTypes.any,
};

export default FilterOptionsList;
