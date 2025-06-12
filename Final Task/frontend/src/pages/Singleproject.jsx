import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Atom } from "react-loading-indicators";
import Taskform from "../components/Taskform";
import TaskCard from "../components/TaskCard";
import { Modal, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import ProjectUpdateForm from "../components/ProjectUpdateForm";
const Singleproject = () => {
  const [projectdet, setprojectdet] = useState([]);
  const [tasks, setasks] = useState([]);
  const [show, setshow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [loading, isloading] = useState(true);
  const location = useLocation();
  const [team, setTeam] = useState([]);
  const id = location.pathname.split("/")[2];

  const navigate = useNavigate();
  const deleteProject = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/project/${id}`);
      if (response) {
        navigate("/project", { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const axiosPrivate = useAxiosPrivate();
  const getProjectdetails = async () => {
    try {
      isloading(true);
      const respose = await axiosPrivate.get(`/project/${id}`);
      setprojectdet(respose.data[0]);
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      isloading(false);
    }
  };
  const getTasksdetails = async () => {
    try {
      isloading(true);
      const respose = await axiosPrivate.get(`/tasks/byproject/${id}`);
      setasks(respose.data);
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      isloading(false);
    }
  };
  const getTeammembers = async () => {
    try {
      const response = await axiosPrivate.get("/team/");
      if (response?.data) {
        setTeam(response.data);
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getTasksdetails();
    getProjectdetails();
    getTeammembers();
    return () => {};
  }, []);
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {!loading ? (
          <div className="d-flex flex-column gap-2  justify-content-center align-items-center ">
            <div className=" screenwidth bg-white shadow-sm p-4 rounded">
              <div className="d-flex justify-content-between align-items-center w-100 ">
                <div className="fs-3">{projectdet?.name}</div>
                <div className="d-flex gap-3">
                  <FaEdit
                    color="blue"
                    size={25}
                    onClick={() => setshowedit(true)}
                  />
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => deleteProject(projectdet?._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <MdDeleteOutline color="red" size={25} />
                  </Popconfirm>
                </div>
              </div>
              <Modal
                title="Update Project"
                open={!!showedit}
                onCancel={() => setshowedit(false)}
                footer={null}
              >
                <ProjectUpdateForm
                  getProjectdetails={getProjectdetails}
                  projectdet={projectdet}
                  team={team}
                  setshowedit={setshowedit}
                />
              </Modal>
              <div className="">
                <p>Project Description</p>
                {projectdet?.description}
              </div>
              <div className="border-bottom  py-3">
                Created by : {projectdet?.created_by?.name}
              </div>
              <div className="d-flex pt-3 ">
                <div className="  d-flex w-50 flex-column  rounded">
                  <h4>Tema Members</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {projectdet?.team_members?.map((item, key) => {
                      return (
                        <span
                          key={key}
                          className="badge text-bg-info text-white"
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className=" w-50">
                  <div className="">
                    Start Date:{" "}
                    {dayjs(projectdet?.createdAt).format(" MMMM DD, YYYY")}
                  </div>
                  <div className="">
                    Status:{" "}
                    {projectdet?.status ? (
                      <Tag color={"green"}>Completed</Tag>
                    ) : (
                      <Tag color={"orange"}>In Progess</Tag>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" screenwidth bg-white shadow-sm p-4 rounded">
              <div className="d-flex justify-content-between pb-4">
                <h3>Tasks</h3>
                <button
                  className="btn  bg-primary-subtle"
                  onClick={() => setshow((c) => !c)}
                >
                  <div className="d-flex gap-2 align-items-center">
                    <FaPlus />
                    Add Task
                  </div>
                </button>
              </div>
              <div className="d-flex flex-column justify-content-center w-100 align-items-center gap-3">
                {tasks?.map((item, key) => {
                  return <TaskCard key={key} item={item} proId={id} />;
                })}
              </div>
            </div>
            <Modal
              title="Create Task for the Project"
              open={!!show}
              onCancel={() => setshow(false)}
              // onOk={() => setshow(false)}
              // okText={"Create Task"}
              footer={null}
            >
              <Taskform
                team={projectdet?.team_members}
                getTasksdetails={getTasksdetails}
                setshow={setshow}
              />
            </Modal>
          </div>
        ) : (
          <div className="d-flex  justify-content-center align-items-center pt-5 ">
            <Atom color="black" size="medium" text="Loading" textColor="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Singleproject;
