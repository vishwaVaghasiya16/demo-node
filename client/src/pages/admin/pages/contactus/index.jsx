import { Button } from "react-bootstrap";
import ContactUsBox from "./ContactUsBox";
import { useEffect, useState } from "react";
import {
  getContactUsOnClickThunk,
  getContactUsThunk,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContactUsLoader from "./ContactUsLoader";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { contactUsList, contactUsPaginationData, loading } = useSelector(
    (store) => store.ContactUs
  );
  const [limit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMoreProduct = () => {
    if (currentPage < contactUsPaginationData?.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(getContactUsOnClickThunk({ limit, page: currentPage }));
    } else {
      dispatch(getContactUsThunk({ limit, page: currentPage }));
    }
  }, [dispatch, limit, currentPage]);

  return (
    <div className={`py-20`}>
      {contactUsList && contactUsList?.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            0: 1,
            599: 2,
            939: 3,
            991: 2,
            1199: 3,
            1499: 4,
          }}
        >
          <Masonry gutter={`20px`}>
            {contactUsList?.map((ele) => {
              const id = ele?._id;
              return loading ? (
                <ContactUsLoader key={id} />
              ) : (
                <ContactUsBox
                  key={id}
                  setCurrentPage={setCurrentPage}
                  limit={limit}
                  currentPage={currentPage}
                  {...ele}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className={`mx-auto`}>
          <DynamicNoData
            icon="unukghxb"
            title="Oops ! No Any Contact Us Yet !"
            subTitle="Keep an eye on upcoming contact us !"
          />
        </div>
      )}
      {contactUsList &&
      contactUsList?.length > 0 &&
      currentPage < contactUsPaginationData?.totalPages ? (
        <div className={`pt-20`}>
          <Button
            className="admin-primary-btn d-block mx-auto fs-16"
            onClick={handleLoadMoreProduct}
          >
            load more
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ContactUs;
