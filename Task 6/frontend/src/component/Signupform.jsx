import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
// schemea for registration
let RegisterSchema = object({
  name: string().required("Name is required"),
  password: string()
    .min(6, "Must be minimum of 6 letters")
    .required("password is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
});
const Signupform = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("User/SignupUser", values);
        if (response?.data) {
          toast.success("User Created");
          navigate("/login", { replace: true });
          formik.resetForm();
        }
      } catch (error) {
        if (!error?.response) {
          toast.error("Server not responding");
        } else {
          toast.error(error?.response?.data);
        }
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex flex-column  gap-2 p-4  shadow rounded-3 "
    >
      <h2>Signup</h2>

      <label>Name</label>
      <Custominput
        name="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
      />
      <div className="error">{formik.touched.name && formik.errors.name}</div>
      <label>Email</label>
      <Custominput
        name="Email"
        type="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
      />
      <div className="error">{formik.touched.email && formik.errors.email}</div>
      <label>password</label>
      <Custominput
        name="password"
        type="text"
        placeholder="password"
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      <div className="error">
        {formik.touched.password && formik.errors.password}
      </div>
      <div className="d-flex gap-3">
        <button type="submit" className="btn btn-success  fw-bold formbtn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Signupform;
