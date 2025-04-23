import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Previewer = ({
  onFileSelect,
  valuesOnly = false,
  accept = ".jpg, .jpeg, .png, .webp",
  className=""
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [animate, setAnimate] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files;
    let files = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i]) {
        // onFileSelect({
        //   url: URL.createObjectURL(file[i]),
        //   file,
        //   type: file[i]?.type?.split("/")[0] || "",
        // });
        // if (!valuesOnly) {
        //   setSelectedFile(file[i]);
        //   setPreviewUrl(URL.createObjectURL(file[i]));
        // } else {
        //   fileInputRef.current.value = null;
        // }
        files.push({
          url: URL.createObjectURL(file[i]),
          file: file[i],
          type: file[i]?.type?.split("/")[0] || "",
        });
      }
      // if(!valuesOnly){
      // }
    }
    if (valuesOnly) {
      fileInputRef.current.value = null;
    }
    onFileSelect(files);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnimate(false); // Reset animation
    onFileSelect("");

    // Clear the input field without reopening the dialog
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //   useEffect(() => {
  //     // Clean up URL object when component unmounts or previewUrl changes
  //     return () => {
  //       if (previewUrl) {
  //         URL.revokeObjectURL(previewUrl);
  //       }
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (previewUrl) {
  //       // Wait for image to load and then trigger animation
  //       const img = new Image();
  //       img.src = previewUrl;
  //       img.onload = () => {
  //         setAnimate(true);
  //       };
  //     }
  //   }, [previewUrl]);

  useEffect(() => {
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      setAnimate(true);
    };
  }, [previewUrl]);

  return (
    <div className={`custom-file-selector bg-color-titan-white h-100 responsive ${className}`}>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="custom-file-input"
        id="file-input"
        ref={fileInputRef}
        multiple
      />
      <label htmlFor="file-input" className="custom-file-label">
        {previewUrl ? (
          <div className={`file-preview ${animate ? "animate" : ""}`}>
            <img src={previewUrl} alt="Preview" />
          </div>
        ) : (
          <div>
            <i className="ri-upload-2-line text-color-primary fs-28"></i>
            <p className="p-0 m-0 text-color-secondary fs-14 mt-2">
              Drop your file here or select
            </p>
            <p className="p-0 m-0 text-color-primary fs-14 mt-1">
              <u>Click to Browse</u>
            </p>
          </div>
        )}
      </label>
      {previewUrl && (
        <button
          type="button"
          onClick={handleRemoveFile}
          className="remove-button"
        >
          &times;
        </button>
      )}
    </div>
  );
};

Previewer.propTypes = {
  onFileSelect: PropTypes.any,
  valuesOnly: PropTypes.any,
  accept: PropTypes.any,
};

export default Previewer;
