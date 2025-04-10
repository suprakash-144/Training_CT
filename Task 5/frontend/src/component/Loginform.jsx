import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import useAuth from "../hooks/useAuth";
let LoginSchema = object({
  password: string().required("password is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
});
const Loginform = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/login", values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setAuth({ token: res?.data?.token });
        toast.success("Success");
        navigate(from, {
          replace: true,
        });
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
    <div className="h-100  d-flex  align-items-center justify-content-center">
      <form
        onSubmit={formik.handleSubmit}
        className="  d-flex flex-column  gap-2  p-5 rounded shadow-lg loginform"
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
        </div>
      </form>
    </div>
  );
};

export default Loginform;
