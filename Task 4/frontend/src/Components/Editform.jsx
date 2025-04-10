import { useFormik } from "formik";
import React, { useEffect } from "react";
import { number, object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";

import axios, { config } from "../config/axiossetup";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { GiCrossMark } from "react-icons/gi";

let editSchema = object({
  firstname: string().required("First Name is required"),
  lastname: string().required("Last Name is required"),
  mobile: string()
    .min(10, "must be 10 digits")
    .max(10, "must be 10 digits")
    .required("Number is required"),
  role: string().required("Role is required"),
});
const Editform = ({ getusers, item, setedit }) => {
  const formik = useFormik({
    initialValues: {
      firstname: item?.firstname,
      lastname: item?.lastname,

      mobile: item?.mobile,
      role: item.role,
    },
    validationSchema: editSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`/${item?._id}`, values, config);
        toast.success("User Edited");
        getusers();
        setedit(null);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
  });
  return (
    <div className="edit-form  ">
      <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4 p-2 bg-light formsize">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column formarea gap-2 w-100"
        >
          <div className="d-flex justify-content-end cross ">
            <GiCrossMark
              size={30}
              onClick={() => setedit(null)}
              className="cursor"
            />
          </div>
          <h2>Update user</h2>
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
            className="btn btn-warning btn-outline-success fw-bold "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editform;
