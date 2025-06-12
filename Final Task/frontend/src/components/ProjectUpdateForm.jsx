import { useFormik } from "formik";
import { Select } from "antd";
import { array, boolean, object, string } from "yup";
import Custominput from "./Custominput";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BiEditAlt } from "react-icons/bi";
let ProjectSchema = object({
  name: string().required("Name is required"),
  description: string().required("Description is required"),
  team_members: array()
    .min(1, "Pick at least one Team member")
    .required("Select Team members for the project"),
  status: boolean().required(),
});
const ProjectUpdateForm = ({
  getProjectdetails,
  projectdet,
  team,
  setshowedit,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const options = [];
  team?.forEach((i) => {
    options.push({
      value: i._id,
      label: i.name,
    });
  });

  const initialTeamMembers =
    projectdet?.team_members?.map((member) => ({
      value: member._id,
      label: member.name,
    })) || [];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: projectdet?.name,
      description: projectdet?.description,
      team_members: initialTeamMembers,
      status: projectdet?.status ? "true" : "false",
    },
    validationSchema: ProjectSchema,
    onSubmit: async (values) => {
      // const teamMemberIds = values.team_members.map((member) => member.value);
      // const payload = {
      //   ...values,
      //   team_members: teamMemberIds,
      // };
      // console.log(payload);

      try {
        const res = await axiosPrivate.put(
          `/project/${projectdet._id}`,
          values,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res) {
          getProjectdetails();
          setshowedit(false);
          toast.success("Project Updated");
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
    <div className=" h-100 ">
      <form
        className="form-control d-flex flex-column gap-2"
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
          mode="multiple"
          name="team_members"
          value={formik.values.team_members}
          onChange={(value) => formik.setFieldValue("team_members", value)}
          // onChange={handleChange}
          className="form-control w-100"
          placeholder="Select Team members"
          options={options}
        />

        <div className="error">
          {formik.touched.team_members && formik.errors.team_members}
        </div>

        <label htmlFor="status">Status</label>
        <Select
          name={"status"}
          value={formik.values.status}
          onChange={formik.handleChange("status")}
          style={{ width: "100%" }}
        >
          <Select.Option value="false">In Progress</Select.Option>
          <Select.Option value="true">Completed</Select.Option>
        </Select>
        <div className="error">
          {formik.touched.status && formik.errors.status}
        </div>
        <button type="submit" className="btn btn-warning  ">
          <BiEditAlt /> Update Project
        </button>
      </form>
    </div>
  );
};

export default ProjectUpdateForm;
