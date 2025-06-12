import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import Projectform from "../components/Projectform";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";
import Custominput from "../components/Custominput";
import { Modal, Pagination, Spin } from "antd";
const Project = () => {
  const [Project, setProject] = useState([]);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const [sortValue, setSortValue] = useState("date-desc");
  const [selectedProject, setSelectedProject] = useState("");
  const [filteredProject, setFilteredProject] = useState([]);
  const [team, setTeam] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getProjects = async () => {
    setloading(true);
    try {
      const response = await axiosPrivate.get("/project/all");
      if (response?.data) {
        setProject(response.data);
        setFilteredProject(response.data);
      }
      setloading(false);
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setloading(false);
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
    getTeammembers();
    getProjects();
  }, []);

  const deleteProject = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/project/${id}`);
      if (response) {
        setProject((prev) => prev.filter((t) => t._id !== id));
        setFilteredProject((prev) => prev.filter((t) => t._id !== id));
        toast.warning("Project Deleted");
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const togoproject = (id) => {
    navigate(`/project/${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSelectedProject(value);
    const filtered = Project.filter((project) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProject(filtered);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortValue(value);

    const sorted = [...filteredProject].sort((a, b) => {
      if (value === "name-asc") return a.name.localeCompare(b.name);
      if (value === "name-desc") return b.name.localeCompare(a.name);
      if (value === "date-asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (value === "date-desc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    setFilteredProject(sorted);
  };

  // Pagination slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProject.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-light min-vh-100">
      <div className="container pt-5">
        <div className="d-flex my-2 justify-content-between align-items-center bg-white p-3 rounded shadow">
          <div className="fs-5 fw-bold">Add Project</div>
          <button className="btn btn-primary" onClick={() => setshow(true)}>
            <div className="d-flex align-items-center gap-1">
              <FaPlus /> Add Project
            </div>
          </button>
        </div>

        <Modal
          title={<span className="fs-4">Create Project</span>}
          open={show}
          onCancel={() => setshow(false)}
          footer={null}
        >
          <Projectform
            getProjects={getProjects}
            project={Project}
            team={team}
            setshow={setshow}
          />
        </Modal>

        {/* Filter Options */}
        <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm f-c-r gap-3">
          <div>
            <div className="fs-2">Project Overview</div>
            <div>{filteredProject.length} Projects found</div>
          </div>
          <div className="filteroptions d-flex gap-2">
            <div className="d-flex align-items-center border px-3 rounded">
              <FaSearch size={20} />
              <Custominput
                name="search"
                type="text"
                placeholder="Search"
                classname="border-0"
                value={selectedProject}
                onChange={handleSearch}
              />
            </div>
            <select className="form-control" onChange={handleSort}>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="date-asc">Start Date ↑</option>
              <option value="date-desc">Start Date ↓</option>
            </select>
          </div>
        </div>

        <Spin tip="Loading" size="large" spinning={loading}>
          <div className="d-flex bg-white p-3 rounded shadow-sm flex-wrap ">
            {currentProjects.length > 0 ? (
              currentProjects.map((item, key) => (
                <ProjectCard
                  togoproject={togoproject}
                  deleteProject={deleteProject}
                  item={item}
                  key={key}
                />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredProject.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Project;
