import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { PiUserCircleFill } from "react-icons/pi";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [secret, setsecret] = useState(true);
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
        const res = await axios.post("/team/login", values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setAuth({ token: res?.data?.token });
        toast.success(`Welcome Back ${res?.data?.name}`);
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
    <div className="screenheight  d-flex  align-items-center justify-content-center ">
      <form
        onSubmit={formik.handleSubmit}
        className="  d-flex flex-column  gap-2 p-3 rounded shadow loginform bg-white"
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <PiUserCircleFill color="blue" size={65} />
          <h4 className="text-center">Welcome Back</h4>
        </div>

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
        <div className="error">
          {formik.touched.email && formik.errors.email}
        </div>
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
        <button type="submit" className="btn btn-primary  ">
          <MdLogin /> Login
        </button>
      </form>
    </div>
  );
};

export default Loginform;
