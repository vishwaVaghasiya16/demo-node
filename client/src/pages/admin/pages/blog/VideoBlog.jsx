import { useEffect, useState } from "react";
import ModelWrapper from "../../../../components/admin/ModelWrapper";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk, updateBlogThunk } from "../../../../store/actions";
import AdminModelWrapper from "../../../../components/common/modal/AdminModelWrapper";

const VideoBlog = ({ edit, showModel, hide }) => {
  const dispatch = useDispatch();
  const {addUpdateLoading} = useSelector((store)=>store.Blogs)
  const isEdit = Object?.keys(edit)?.length > 0 ? true : false;

  const validationSchema = yup.object({
    video: yup.string().required("video is required"),
    title: yup.string().required("Title is required"),
  });

  const validation = useFormik({
    validationSchema,
    initialValues: {
      video: "",
      title: "",
      type: "video",
    },
    name: "video blog validation",
    onSubmit: async (values) => {
      if (isEdit) {
        const response = await dispatch(
          updateBlogThunk({ id: edit._id, values: values })
        );
        if (updateBlogThunk.fulfilled.match(response)) {
          hide();
        }
      } else {
        const response = await dispatch(createBlogThunk({ values }));
        if (createBlogThunk.fulfilled.match(response)) {
          hide();
        }
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      validation.setFieldValue("video", edit?.video);
      validation.setFieldValue("title", edit?.title);
    }
  }, [edit]);

  return (
    <AdminModelWrapper
      show={showModel}
      onHide={hide}
      title={isEdit ? "edit video blog" : "add video blog"}
      onSubmit={validation.handleSubmit}
      loading={addUpdateLoading}
      loadingText="Saving..."
    >
      <Modal.Body>
        <div className="">
          <div className="flex-column d-flex gap-3">
            {" "}
            <InputField
              label="video"
              name="video"
              id="video"
              value={validation.values.video}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type="text"
              isValid={validation.touched.title && validation.errors.title}
              errorMessage={validation.errors.title}
            />
            <InputField
              label="title"
              name="title"
              id="title"
              value={validation.values.title}
              onChange={validation.handleChange}
              onReset={validation.handleReset}
              onBlur={validation.handleBlur}
              type="text"
              isValid={validation.touched.title && validation.errors.title}
              errorMessage={validation.errors.title}
            />
          </div>
        </div>
      </Modal.Body>
    </AdminModelWrapper>
  );
};

export default VideoBlog;
