import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";

import Createform from "../Components/Createform";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiossetup";
let RegisterSchema = object({
  password: string().required("password is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
});

const Form = () => {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/login", values);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("name", res?.data?.firstname);
        toast.success("Success");

        navigate("/home", {
          replace: true,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/home", { replace: true });
  });
  return (
    <div className="maincontainer  d-flex  align-items-center justify-content-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column  gap-2  p-5 rounded shadow loginform"
      >
        <h2>Login</h2>

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
        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-success  fw-bold formbtn">
            Submit
          </button>
          <button
            onClick={() => {
              setshow((prev) => !prev);
            }}
            className="btn btn-danger r fw-bold formbtn"
          >
            Create account{" "}
          </button>
        </div>
      </form>
      {show ? <Createform setshow={setshow} /> : <></>}
    </div>
  );
};

export default Form;
