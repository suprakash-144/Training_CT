import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { array, date, object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MdCreate } from "react-icons/md";
import { useLocation } from "react-router-dom";
let TaskSchema = object({
  title: string().required("title is required"),
  description: string().required("Description is required"),
  deadline: date().required("Deadline is required"),
  assigned_to: array()
    .min(1, "Pick at least one Team member")
    .required("Select Team members for the project"),
  project: string().required(),
});

const Taskform = ({ team, getTasksdetails, setshow }) => {
  const date = new Date().toISOString().split("T")[0];

  const location = useLocation();
  const proId = location.pathname.split("/")[2];

  const [teammembers, setTeammembers] = useState([]);
  const options = [];
  team.forEach((i) => {
    options.push({
      value: i._id,
      label: i.name,
    });
  });

  const handleChange = (value) => {
    setTeammembers(value);
  };
  useEffect(() => {
    formik.values.assigned_to = teammembers ? teammembers : [];
  }, [teammembers]);

  const axiosPrivate = useAxiosPrivate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assigned_to: "",
      deadline: "",
      project: `${proId}`,
    },
    validationSchema: TaskSchema,
    onSubmit: async (values) => {
      try {
        const res = await axiosPrivate.post("/tasks/create", values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res) {
          getTasksdetails();
          toast.success("Task Created");
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
    <div className=" ">
      <form
        className=" mt-3 d-flex flex-column gap-2 "
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <Custominput
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
        <label htmlFor="description">Description</label>
        <Custominput
          name="description"
          type="text"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <label htmlFor="team_members">Assign To</label>
        <Select
          name="assigned_to"
          mode="multiple"
          onChange={handleChange}
          className="form-control w-100"
          placeholder="Select Team members"
          options={options}
        />

        <div className="error">
          {formik.touched.assigned_to && formik.errors.assigned_to}
        </div>
        <label htmlFor="deadline">Deadline</label>
        <input
          type="date"
          min={date}
          name="deadline"
          className="form-control"
          value={formik.values.deadline}
          onChange={formik.handleChange("deadline")}
          onBlur={formik.handleBlur("deadline")}
        />
        <div className="error">
          {formik.touched.deadline && formik.errors.deadline}
        </div>
        <button type="submit" className="btn btn-warning  ">
          <MdCreate /> Create Task
        </button>
      </form>
    </div>
  );
};

export default Taskform;
