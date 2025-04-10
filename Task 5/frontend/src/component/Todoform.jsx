import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// schemea for Todo card creation
let TodoSchema = object({
  title: string().required("title is required"),
  body: string().required("description is required"),
});
const Todoform = ({ setTasks }) => {
  const axiosPrivate = useAxiosPrivate();
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      completion: false,
    },
    validationSchema: TodoSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosPrivate.post("/todo/createtodo", values);
        if (response?.data) {
          setTasks((prev) => [...prev, response.data]);
        }
      } catch (error) {
        if (!error?.response) {
          toast.error("No Server Respose");
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        formik.resetForm();
      }
    },
  });
  return (
    <div className="d-flex w-100 justify-content-center align-items-center py-2">
      <form
        className="d-flex flex-column gap-1 p-2 rounded"
        onSubmit={formik.handleSubmit}
      >
        <Custominput
          classname="shadow"
          name="title"
          type="text"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>

        <textarea
          className="shadow form-control"
          name="body"
          type="text"
          placeholder="Description"
          value={formik.values.body}
          onChange={formik.handleChange("body")}
          onBlur={formik.handleBlur("body")}
        />
        <div className="error">{formik.touched.body && formik.errors.body}</div>

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-outline-primary  fw-bold shadow"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todoform;
