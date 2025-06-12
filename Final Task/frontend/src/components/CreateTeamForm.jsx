import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUser } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Roles } from "../utils/Roles";
// schemea for registration
let RegisterSchema = object({
  name: string().required("Name is required"),
  password: string().required("Password is required"),
  designation: string().required("Designation is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
});
const CreateTeamForm = ({ setshow, getTeammembers }) => {
  const [secret, setsecret] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      designation: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosPrivate.post("/team/create", values);
        if (response?.data) {
          toast.success("User Created");
          getTeammembers();
          setshow(false);
          formik.resetForm();
        }
      } catch (error) {
        if (!error?.response) {
          toast.error("Server not responding");
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex flex-column  gap-2  "
    >
      <label htmlFor="name">Full Name</label>
      <div className="d-flex form-control align-items-center">
        <FaUser color="grey" />
        <Custominput
          name="name"
          type="text"
          placeholder="Name"
          classname="border-0"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
      </div>
      <div className="error">{formik.touched.name && formik.errors.name}</div>

      <label htmlFor="Email">Email Address</label>
      <div className="d-flex form-control align-items-center">
        <MdEmail color="grey" />
        <Custominput
          name="Email"
          type="email"
          classname=" border-0"
          placeholder="Email@Address"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />
      </div>
      <div className="error">{formik.touched.email && formik.errors.email}</div>
      <label htmlFor="password">Password</label>
      <div className="d-flex form-control align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <MdLock color="grey" />

          <Custominput
            name="password"
            type={secret ? "password" : "text"}
            classname=" border-0"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />
        </div>
        {secret ? (
          <FaEyeSlash onClick={() => setsecret(false)} />
        ) : (
          <FaEye onClick={() => setsecret(true)} />
        )}
      </div>
      <div className="error">
        {formik.touched.password && formik.errors.password}
      </div>
      <label htmlFor="designation">Select Designation</label>
      <select
        name="designation"
        className="form-control overflow-auto"
        value={formik.values.designation}
        onChange={formik.handleChange("designation")}
        onBlur={formik.handleBlur("designation")}
      >
        <option defaultValue>Please select a Designation</option>
        {Roles.map((i, k) => (
          <option value={i} key={k}>
            {i}
          </option>
        ))}
      </select>
      <div className="error">
        {formik.touched.designation && formik.errors.designation}
      </div>
      <button type="submit" className="btn btn-success  fw-bold ">
        <FaSignInAlt /> Submit
      </button>
    </form>
  );
};

export default CreateTeamForm;
