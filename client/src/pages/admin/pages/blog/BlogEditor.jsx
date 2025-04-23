import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  createBlogThunk,
  getBlogDetailsThunk,
  updateBlogThunk,
} from "../../../../store/actions";
import { Col, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";
import InputField from "../../../../components/admin/inputField/InputField";
import TextAreaField from "../../../../components/admin/inputField/TextAreaField";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN as admin } from "../../../../routes/routesConstants";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";
import MyFilePondComponent from "../../../../components/MyFilePondComponent";

const BlogEditor = () => {
  const [imgErr, setImgErr] = useState(false);
  const { blogDetails, addUpdateLoading, loading } = useSelector(
    (store) => store.Blogs
  );
  const dispatch = useDispatch();
  const { slug } = useParams();
  const nav = useNavigate();
  const ADMIN = admin();

  // useEffect(() => {
  //   if (blogCategories?.data?.length == 0) {
  //     dispatch(getBlogCategory());
  //   }
  // }, []);

  useEffect(() => {
    if (slug !== "add") {
      dispatch(getBlogDetailsThunk({ title: slug }));
    }
  }, [slug]);

  useEffect(() => {
    if (Object.keys(blogDetails)?.length > 0) {
      validation.setFieldValue("html", blogDetails?.html);
      validation.setFieldValue("title", blogDetails?.title);
      validation.setFieldValue("description", blogDetails?.description);
      validation.setFieldValue("url", blogDetails?.url);
    }
  }, [blogDetails]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    // ['blockquote', 'code-block'],
    ["image"],
    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // /indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: ["", "center", "right", "justify"] }],
    ["clipboard"],

    // ['clean']                                         // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const validationSchema = yup.object({
    html: yup
      .string()
      .test("is-valid-blog", "Image must be required", (value) => {
        // Check if an image tag is present
        const hasImage = /<img[^>]+src="[^"]+"[^>]*>/g?.test(value);
        if (!hasImage) return true;
        const imageLimit = value?.length > 2 * 1048576;
        if (imageLimit) {
          setImgErr(true);
          return false;
        } else {
          setImgErr(false);
          return hasImage;
        }
      }),
    url: yup
      .mixed()
      .required("Image is required")
      .test("image-size", "image too large", (value) => {
        if (slug !== "add" && value) {
          if (value.size) {
            return value && value.size <= 2000000;
          } else return true;
        }
        return value && value.size <= 2000000;
      }),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),

    // category: yup.string().required("Please select category"),
    // title: yup.string().required("Please enter title"),
  });
  const validation = useFormik({
    initialValues: {
      html: "",
      url: "",
      title: "",
      description: "",
      // category: state?.values?.category?._id || "",
      // title: state?.values?.title || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("html", values.html);
      formData.append("file", values.url);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", "image");
      if (slug !== "add") {
        const response = await dispatch(
          updateBlogThunk({ id: blogDetails?._id, values: formData })
        );
        if (updateBlogThunk.fulfilled.match(response)) {
          nav(ADMIN.BLOG.path);
        }
      } else {
        const response = await dispatch(createBlogThunk({ values: formData }));
        if (createBlogThunk.fulfilled.match(response)) {
          nav(ADMIN.BLOG.path);
        }
      }
    },
  });

  return (
    <div>
      {/* <form action="" onSubmit={validation.handleSubmit}>
          <div className="quill-main-container bg-white rounded-xl p-5">
            <ReactQuill
              modules={module}
              theme="snow"
              value={validation.values.description}
              onChange={(value) => {
                validation.handleChange("description")(value);
              }}
            />
            {validation.touched.description &&
              validation.errors.description &&
              (isImageError ? (
                <p className="text-red-500">total images size must be less than 2MB.</p>
              ) : (
                <p className="text-red-500">{validation.errors.description}</p>
              ))}
          </div>
        </form> */}
      {!loading ? (
        <form onSubmit={validation.handleSubmit}>
          <div className="py-20">
            <Row className="d-flex mb-md-3">
              <Col md={5} className="mb-3">
                <div className="br-5 overflow-hidden border common-border-color">
                  {/* <FilePond
                    className="blog-react-pond"
                    name="productImages"
                    acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                    fileValidateTypeLabelExpectedTypes="Accepted file types are: JPEG, JPG, PNG"
                    onupdatefiles={(files) => {
                      const file = files?.length > 0 ? files[0].file : null;
                      validation.setFieldValue("url", file);
                    }}
                  /> */}
                  <MyFilePondComponent
                    className="blog-react-pond"
                    onlyImage={true}
                    validation={validation}
                    previewUrl={blogDetails?.url || ""}
                    name="url"
                  />
                </div>
                {validation.touched.url && validation.errors.url && (
                  <p className="p-0 m-0 fs-13 fw-medium text-danger mt-1">
                    {validation.errors.url}
                  </p>
                )}
              </Col>
              <Col className="d-flex flex-column gap-3">
                <InputField
                  label="Enter title"
                  name="title"
                  value={validation.values.title}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  isValid={validation.touched.title && validation.errors.title}
                  errorMessage={validation.errors.title}
                />
                <TextAreaField
                  label="Enter description"
                  name="description"
                  value={validation.values.description}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  isValid={
                    validation.touched.description &&
                    validation.errors.description
                  }
                  errorMessage={validation.errors.description}
                />
              </Col>
            </Row>
            <p
              className={`truncate-line-1 text-color-primary text-capitalize fs-14 fw-medium mb-2`}
            >
              Write blog from here
            </p>
            <ReactQuill
              modules={module}
              theme="snow"
              name="html"
              value={validation.values.html}
              onChange={(value) => {
                validation.handleChange("html")(value);
              }}
            />
            {imgErr && (
              <p className="p-0 m-0 text-danger fs-13 fw-medium pt-2">
                Total images size must blow 2mb
              </p>
            )}
            <button
              disabled={addUpdateLoading}
              type="submit"
              className="admin-primary-btn br-5 px-5 fs-14 ms-auto d-block mt-2"
            >
              {addUpdateLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <DynamicNoData
          icon="sfwxcaka"
          title="Loading please wait"
          subTitle="Fetching blog data"
        />
      )}
    </div>
  );
};

export default BlogEditor;
