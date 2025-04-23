import { useFormik } from "formik";
import BreadCrumb from "../../../components/admin/breadCrumb/BreadCrumb";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputField from "../../../components/admin/inputField/InputField";
import SelectField from "../../../components/admin/inputField/SelectField";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addStaffThunk } from "../../../store/actions";
import { ADMIN as Admin } from "../../../routes/routesConstants";
import { useNavigate } from "react-router-dom";

const AddStaffForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enumsData } = useSelector((store) => store.EnumsSlice);
  const { user, loading } = useSelector((store) => store.Auth);
  const ADMIN = Admin();

  const initialValues = {
    username: "",
    phone: "",
    email: "",
    role: "",
    joiningDate: "",
    empId: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    username: yup.string().min(4).max(20).required("Please enter the username"),
    phone: yup
      .string()
      .required("A phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "A phone number must be exactly 10 digits")
      .max(10, "A phone number must be exactly 10 digits"),
    email: yup.string().email().required("Please enter your email"),
    role: yup.string().required("Please select role"),
    joiningDate: yup
      .date()
      .required("Joining date is required")
      .max(new Date(), "Joining date cannot be in the future"),
    empId: yup
      .string()
      .required("Employee ID is required")
      .matches(/^[0-9]+$/, "Employee ID must contain only numbers")
      .min(4, "Employee ID must be exact 4 digits")
      .max(4, "Employee ID must be exact 4 digits"),
    password: yup
      .string()
      .min(4)
      .max(12)
      .required("Please enter your password"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const validation = useFormik({
    name: "add staff validation",
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (
          user?.role !== enumsData?.userRoleEnum?.ADMIN &&
          values.role === enumsData?.userRoleEnum?.ADMIN
        ) {
          delete values.role;
        }
        const result = await dispatch(addStaffThunk(values));
        if (addStaffThunk.fulfilled.match(result)) {
          navigate(ADMIN.STAFF.path);
          resetForm();
        }
      } catch (error) {
        console.log("[ERROR] :" + error.message);
      }
    },
  });
  return (
    <div className={`py-20`}>
      <BreadCrumb
        title="admin panel"
        pageTitle="staff"
        subPageTitle="add staff"
      />
      <div className={`p-3 bg-white br-5`}>
        <Form>
          <Row>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="username"
                id="username"
                label="User Name *"
                placeholder="Enter name"
                value={validation.values.username || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.username && validation.errors.username
                }
                errorMessage={validation.errors.username}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="phone"
                id="phone"
                label="phone number *"
                placeholder=""
                type="number"
                value={validation.values.phone || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={validation.touched.phone && validation.errors.phone}
                errorMessage={validation.errors.phone}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="email"
                id="email"
                type="email"
                label="email address *"
                placeholder="example@gmail.com"
                value={validation.values.email || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={validation.touched.email && validation.errors.email}
                errorMessage={validation.errors.email}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <SelectField
                name="role"
                label="role *"
                onChange={validation.handleChange}
                value={validation.values.role}
                onBlur={validation.handleBlur}
                isValid={validation.touched.role && validation.errors.role}
                errorMessage={validation.errors.role}
              >
                <option value={""}>Select role</option>
                {Object.keys(enumsData)?.length > 0 &&
                  Object.keys(enumsData?.userRoleEnum)
                    ?.filter((item) => {
                      if (user?.role !== enumsData?.userRoleEnum?.ADMIN) {
                        return item !== "ADMIN" && item !== "CUSTOMER";
                      } else {
                        return item !== "CUSTOMER";
                      }
                    })
                    .map((item, key) => (
                      <option key={key} value={enumsData?.userRoleEnum[item]}>
                        {enumsData?.userRoleEnum[item]}
                      </option>
                    ))}
              </SelectField>
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              {" "}
              <InputField
                name="joiningDate"
                id="joiningDate"
                label="Joining Date *"
                type="date"
                value={validation.values.joiningDate || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.joiningDate &&
                  validation.errors.joiningDate
                }
                errorMessage={validation.errors.joiningDate}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="empId"
                id="empId"
                label="emp ID"
                placeholder="#1234"
                value={validation.values.empId || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={validation.touched.empId && validation.errors.empId}
                errorMessage={validation.errors.empId}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="password"
                id="password"
                label="Password *"
                placeholder="Enter password"
                value={validation.values.password || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.password && validation.errors.password
                }
                errorMessage={validation.errors.password}
              />
            </Col>
            <Col sm={6} xl={4} className="mb-3">
              <InputField
                name="confirmPassword"
                id="confirmPassword"
                label="confirm password *"
                placeholder="Enter Confirm Password"
                value={validation.values.confirmPassword || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isValid={
                  validation.touched.confirmPassword &&
                  validation.errors.confirmPassword
                }
                errorMessage={validation.errors.confirmPassword}
              />
            </Col>
          </Row>

          <Row className={`mt-lg-5`}>
            <Col>
              {/* <Button className="admin-primary-btn bg-color-secondary w-100 fs-14"> */}
              <Button
                className={`border-0 bg-color-dusty-red fs-14 px-4 py-2 d-block w-100`}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                onClick={validation.handleSubmit}
                type="submit"
                disabled={loading}
                className="admin-primary-btn w-100 fs-14"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddStaffForm;
