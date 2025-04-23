import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { toastError, toastSuccess } from "../../../helpers/toastConfig";

const ShareModel = (props) => {
  const url = window.location;
  const handleCopy = () => {
    props?.onHide();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => toastSuccess("Url has been copied to the clipboard"))
        .catch(() => toastError("Try again"));
    } else {
      toastError("Clipboard not supported");
    }
  };
  const handleCloseMOdel = () => {
    props?.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="btn-close-none bg-color-titan-white">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="mx-auto d-block fs-20"
        >
          Share
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 p-md-4">
        <div
          onClick={handleCloseMOdel}
          className="d-flex gap-3 flex-nowrap justify-content-between overflow-x-scroll overflow-track-none share-icon"
        >
          <div>
            <WhatsappShareButton
              url={url}
              className="h-60 w-60  bg-color-green rounded-circle"
            >
              <i className="ri-whatsapp-line text-white fs-28"></i>
            </WhatsappShareButton>
          </div>
          <div>
            <TwitterShareButton
              url={url}
              className="h-60 w-60  bg-dark rounded-circle"
            >
              <i className="ri-twitter-x-fill text-white fs-24"></i>
            </TwitterShareButton>
          </div>
          <div>
            <EmailShareButton
              url={url}
              className="h-60 w-60  bg-color-venus rounded-circle"
            >
              <i className="ri-mail-fill text-white fs-24"></i>
            </EmailShareButton>
          </div>
          <div>
            <FacebookShareButton
              url={url}
              className="h-60 w-60  bg-color-facebook-blue rounded-circle"
            >
              <i className="ri-facebook-fill text-white fs-24"></i>
            </FacebookShareButton>
          </div>
          <div>
            <LinkedinShareButton
              url={url}
              className="h-60 w-60  bg-color-linkedin-blue rounded-circle"
            >
              <i className="ri-linkedin-fill text-white fs-24"></i>
            </LinkedinShareButton>
          </div>
          <div>
            <RedditShareButton
              url={url}
              className="h-60 w-60  bg-color-reddit-orange rounded-circle"
            >
              <i className="ri-reddit-line text-white fs-24"></i>
            </RedditShareButton>
          </div>
          <div>
            <FacebookMessengerShareButton
              url={url}
              className="h-60 w-60  bg-color-facebook-messenger rounded-circle"
            >
              <i className="ri-messenger-line text-white fs-24"></i>
            </FacebookMessengerShareButton>
          </div>
          <div>
            <TelegramShareButton
              url={url}
              className="h-60 w-60  bg-color-telegram rounded-circle"
            >
              <i className="ri-telegram-line text-white fs-28"></i>
            </TelegramShareButton>
          </div>
          <div>
            <TumblrShareButton
              url={url}
              className="h-60 w-60  bg-color-tumblr rounded-circle"
            >
              <i className="ri-tumblr-fill text-white fs-28"></i>
            </TumblrShareButton>
          </div>
          <div>
            <div
              className="h-60 w-60  bg-color-venus rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
              onClick={handleCopy}
            >
              <i className="ri-file-copy-line text-white fs-24"></i>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

ShareModel.propTypes = {
  onHide: PropTypes.any,
};

export default ShareModel;
