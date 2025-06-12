import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { array, object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MdOutlineCreate } from "react-icons/md";
let ProjectSchema = object({
  name: string().required("Name is required"),
  description: string().required("Description is required"),
  team_members: array()
    .min(1, "Pick at least one Team member")
    .required("Select Team members for the project"),
});
const Projectform = ({ getProjects, setshow, team }) => {
  const axiosPrivate = useAxiosPrivate();

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
    formik.values.team_members = teammembers ? teammembers : [];
  }, [teammembers]);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      team_members: [],
    },
    validationSchema: ProjectSchema,
    onSubmit: async (values) => {
      try {
        const res = await axiosPrivate.post("/project/create", values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res) {
          getProjects();
          setshow(false);
          toast.success("Project Added");
          formik.resetForm();
        }
        console.log(values);
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
    <div className=" h-100 ">
      <form
        className=" d-flex flex-column gap-2"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <Custominput
          name="name"
          type="text"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
        <div className="error">{formik.touched.name && formik.errors.name}</div>
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
        <label htmlFor="team_members">Select Team Members</label>
        <Select
          name="assigned_to"
          mode="multiple"
          onChange={handleChange}
          className="form-control w-100"
          placeholder="Select Team members"
          options={options}
        />

        <div className="error">
          {formik.touched.team_members && formik.errors.team_members}
        </div>
        <button type="submit" className="btn btn-warning  ">
          <MdOutlineCreate /> Create Project
        </button>
      </form>
    </div>
  );
};

export default Projectform;
