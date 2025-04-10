import { useFormik } from "formik";
import React from "react";
import { number, object, string } from "yup";
import Custominput from "./Custominput";
import { GiCrossMark } from "react-icons/gi";
import { toast } from "react-toastify";

let RegisterSchema = object({
  name: string().required("Name is required"),
  email: string()
    .matches(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      "Invalid email format"
    )
    .required("Email is required"),
  Age: number().required("Age is required").min(1),
  Course: string().required(),
});
const Form = ({ setshow }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      Age: "",
      Course: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      try {
        let savedData = localStorage.getItem("data");
        let submissions = savedData ? JSON.parse(savedData) : [];
        localStorage.setItem("data", JSON.stringify([...submissions, values]));
        console.log([...submissions, values]);
        toast.success("Hooray Form is submitted!!");
        formik.resetForm();
      } catch (error) {
        toast.error("Failed!");
      }
    },
  });
  return (
    <div className="formcontainer">
      <div className="d-flex flex-column align-items-center justify-content-center  ">
        <div className="d-flex justify-content-end cross ">
          <GiCrossMark
            size={30}
            onClick={() => setshow(false)}
            className="cursor"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column formarea gap-2 w-100"
        >
          <h2>Sign in</h2>
          <label>Name</label>
          <Custominput
            name="Name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
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
          <label>Age</label>
          <Custominput
            type="number"
            name="Age"
            placeholder="Age"
            value={formik.values.Age}
            onChange={formik.handleChange("Age")}
            onBlur={formik.handleBlur("Age")}
          />
          <div className="error">{formik.touched.Age && formik.errors.Age}</div>
          <label>Select Course</label>
          <select
            className="form-control overflow-auto"
            value={formik.values.Course}
            onChange={formik.handleChange("Course")}
            onBlur={formik.handleBlur("Course")}
          >
            <option defaultValue>Please select a option</option>
            <option value="Artifical intelligence">
              Artifical intelligence and Machine Learning
            </option>
            <option value="Cloud computing">Cloud computing</option>
            <option value="Web development">Web development</option>
            <option value="Andriod development">Andriod development</option>
            <option value="Generative AI">Generative AI</option>
            <option value="Devops">Devops</option>
          </select>
          <div className="error">
            {formik.touched.Course && formik.errors.Course}
          </div>

          <button
            type="submit"
            className="btn btn-warning btn-outline-success fw-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
