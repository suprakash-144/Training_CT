import { useFormik } from "formik";
import React, { useEffect } from "react";
import { number, object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";

import { GiCrossMark } from "react-icons/gi";
import axios, { config } from "../config/axiossetup";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

let RegisterSchema = object({
  firstname: string().required("First Name is required"),
  lastname: string().required("Last Name is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
  password: string().required("password is required"),
  mobile: string()
    .min(10, "must be 10 digits")
    .max(10, "must be 10 digits")
    .required("Number is required"),
  role: string().required("Role is required"),
});
const Createform = ({ getusers, setshow }) => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
      role: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/register", values, config);
        toast.success("User Added");
        getusers();
        setshow((prev) => !prev);
      } catch (error) {
        setshow((prev) => !prev);
        toast.error(error?.data?.message);
      }
      formik.resetForm();
    },
  });
  return (
    <div className="edit-form ">
      <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4  bg-light formsize">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column formarea gap-2 w-100"
        >
          {" "}
          <div className="d-flex justify-content-end cross ">
            <GiCrossMark
              size={30}
              onClick={() => setshow((prev) => !prev)}
              className="cursor"
            />
          </div>
          <h2>Create user</h2>
          <label>First Name</label>
          <Custominput
            name="firstname"
            type="text"
            placeholder="First Name"
            value={formik.values.firstname}
            onChange={formik.handleChange("firstname")}
            onBlur={formik.handleBlur("firstname")}
          />
          <div className="error">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <label>Last Name</label>
          <Custominput
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={formik.values.lastname}
            onChange={formik.handleChange("lastname")}
            onBlur={formik.handleBlur("lastname")}
          />
          <div className="error">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          <label>Email</label>
          <Custominput
            name="Email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
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
          <label>Mobile Number</label>
          <Custominput
            name="mobile"
            type="number"
            placeholder="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange("mobile")}
            onBlur={formik.handleBlur("mobile")}
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <label>Select Role</label>
          <select
            className="form-control overflow-auto"
            value={formik.values.role}
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
          >
            <option defaultValue>Please select a option</option>
            <option value="SDE">Software Engineer</option>
            <option value="DEV">Developer</option>
            <option value="HR">Human Resource</option>
            <option value="AD">Administrator </option>
            <option value="BA">Bussiness analyst </option>
            <option value="TL">Team Lead </option>
            <option value="PM">Product Managaer </option>
          </select>
          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div>
          <button
            type="submit"
            className="btn btn-warning btn-outline-success fw-bold  formbtn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createform;
