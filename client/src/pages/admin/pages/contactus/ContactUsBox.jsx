import PropTypes from "prop-types";
import { getMomentDate } from "../../../../components/common/MomentFun";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../../components/admin/useClickOutside";
import {
  deleteContactUsThunk,
  getContactUsThunk,
} from "../../../../store/actions";
import { useDispatch } from "react-redux";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";

const ContactUsBox = ({
  _id,
  name,
  email,
  phone,
  message,
  createdAt,
  limit,
  setCurrentPage,
  currentPage,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncate, setIsTruncate] = useState(false);
  const [lines, setLines] = useState(0);
  const triggerDeleteConfirmation = useConfirmationAlert({
    icon: "warning",
    title: "Confirm Delete Contact",
    text: "Are you sure you want to delete this contact? This change cannot be undone.",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    successText: "Contact has been successfully removed.",
  });

  useClickOutside([".menu-popup-parent", ".menu-popup"], () =>
    setIsOpen(false)
  );

  const handleDeleteContactUs = () => {
    triggerDeleteConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(deleteContactUsThunk(_id));
        if (deleteContactUsThunk.fulfilled.match(response)) {
          setCurrentPage(1);
          dispatch(getContactUsThunk({ limit, page: 1 }));
          return true;
        }
        if (deleteContactUsThunk.rejected.match(response)) {
          setCurrentPage(1);
          dispatch(getContactUsThunk({ limit, page: 1 }));
          return false;
        }
      },
    });
  };

  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      const el = messageRef.current;
      const divHeight = el.offsetHeight;
      const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
      setLines(Math.ceil(divHeight / lineHeight));
    }
  }, [messageRef]);

  return (
    <div
      className={`border common-border-color common-box-shadow contact-us-box bg-color-primary br-10 p-3 position-relative`}
    >
      <div className={`d-flex align-items-start justify-content-between`}>
        <div>
          <h4 className={`mb-1 fs-16 fw-semibold text-capitalize text-white`}>
            {name}
          </h4>
          <a className={`btn p-0 border-0`} href={`mailto:${email}`}>
            <h6 className="fs-14 text-color-secondary fw-semibold">{email}</h6>
          </a>
        </div>
        <span className={`fs-13 fw-medium text-white text-opacity-50`}>
          {getMomentDate(createdAt, "DD MMM YYYY")}
        </span>
      </div>
      <div className="contact-us-message">
        <p
          id="message"
          ref={messageRef}
          className={`mt-2 mb-5 fs-14 fw-normal text-white lh-24 ${
            isTruncate ? "" : "truncate-line-5"
          }`}
        >
          {message}
        </p>
        {/* <TextTruncate
            line={isExpand ? 100 : 8}
            element="p"
            truncateText="…"
            text={ele?.ele?.message}
            textTruncateChild={
                <button
                onClick={() => setIsExpand(true)}
                className={`btn p-0 fs-12 fw-medium fm-secondary`}
                >
                {"Read more"}
                </button>
            }
            /> */}
      </div>
      <div
        className={`position-absolute bottom-0 end-0 pe-3 pb-3 fs-12 fw-normal`}
      >
        <ToggleMenu
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          margin="ms-auto"
          iconColor="text-white"
        >
          {!isNaN(lines) && lines >= 5 ? (
            <p
              className="text-color-secondary m-0 fs-14 cursor-pointer px-3 py-1 hover-color-primary hover-bg-color-titan-white"
              onClick={() => setIsTruncate(!isTruncate)}
            >
              {isTruncate ? "Less More" : "Read More"}
            </p>
          ) : null}
          <a
            onClick={() => {
              const url = `tel:${phone}`;
              window.open(url);
            }}
            className="d-block w-100 text-start text-color-secondary m-0 fs-14 cursor-pointer px-3 py-1 hover-color-primary hover-bg-color-titan-white fw-normal"
          >
            Call
          </a>
          <p
            className="text-color-secondary m-0 fs-14 cursor-pointer px-3 py-1 hover-color-primary hover-bg-color-titan-white"
            onClick={handleDeleteContactUs}
          >
            Delete
          </p>
        </ToggleMenu>
      </div>
    </div>
  );
};

ContactUsBox.propTypes = {
  _id: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  message: PropTypes.any,
  createdAt: PropTypes.any,
  limit: PropTypes.any,
  setCurrentPage: PropTypes.any,
};

export default ContactUsBox;
