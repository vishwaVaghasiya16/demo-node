import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputField from "../../../../components/admin/inputField/InputField";
import {
  createTaxThunk,
  getTaxThunk,
  updateTaxThunk,
} from "../../../../store/actions";
import { useEffect } from "react";

const ProductTax = () => {
  const dispatch = useDispatch();
  const { taxData, loading } = useSelector((store) => store.Tax);
  const initialValues = {
    taxType: "percentage",
    taxValue: "",
  };
  const validationSchema = yup.object({
    taxType: yup.string(),
    taxValue: yup
      .number()
      .required("A tax value is required")
      .min(0, "A tax value is must")
      .max(35, "A tax value must be less then 35"),
  });
  const validation = useFormik({
    name: "add staff validation",
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        delete validation.values.taxType;
        if (taxData?._id) {
          const id = taxData?._id;
          await dispatch(updateTaxThunk({ id, values }));
        } else {
          await dispatch(createTaxThunk(values));
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      } finally {
        if (!taxData?._id) {
          dispatch(getTaxThunk());
        }
      }
    },
  });

  useEffect(() => {
    if (Object.keys(taxData).length === 0) dispatch(getTaxThunk());
  }, [dispatch, taxData]);

  useEffect(() => {
    validation.setValues({ taxValue: taxData?.taxValue });
  }, [taxData]);

  return (
    <div className={`py-20`}>
      <BreadCrumb title="master" pageTitle="product tax" />
      <Col xl={10} className={`mx-auto`}>
        <Form className={`bg-white p-3 br-5 mx-auto`}>
          <Row>
            <Col xs={12} className={`mb-3`}>
              <InputField
                readOnly={true}
                name="taxType"
                id="taxType"
                label="tax type"
                value={validation.values.taxType || "percentage"}
                className="text-capitalize input-field-bg"
              />
            </Col>
            <Col xs={12} className={`mb-3`}>
              <InputField
                label="tax value"
                name="taxValue"
                id="taxValue"
                value={validation.values.taxValue || 0}
                onChange={validation.handleChange}
                onReset={validation.handleReset}
                onBlur={validation.handleBlur}
                type="number"
                isValid={
                  validation.touched.taxValue && validation.errors.taxValue
                }
                errorMessage={validation.errors.taxValue}
              />
            </Col>
          </Row>
          <Button
            onClick={validation.handleSubmit}
            type="submit"
            disabled={loading}
            className="d-block admin-primary-btn hover-bg-secondary w-100 fs-14"
          >
            {loading ? "saving..." : "save"}
          </Button>
        </Form>
      </Col>
    </div>
  );
};

export default ProductTax;
