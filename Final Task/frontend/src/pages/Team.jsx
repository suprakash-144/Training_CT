import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Teamcard from "../components/Teamcard";
import Custominput from "../components/Custominput";
import { FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { Modal, Pagination } from "antd";
import { toast } from "react-toastify";
import { Mosaic } from "react-loading-indicators";
import CreateTeamForm from "../components/CreateTeamForm";

import { Dropdown, Checkbox } from "antd";
import { Roles } from "../utils/Roles";
const Team = () => {
  const [Team, setTeam] = useState([]);
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [selectedTeam, setselectedTeam] = useState("");
  const [FilteredTeam, setFilteredTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortValue, setSortValue] = useState("createdAt-desc");
  const [filterValue, setFiltertValue] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const itemsPerPage = 6;

  const getTeammemberFilters = async () => {
    setloading(true);
    try {
      const response = await axiosPrivate.get("/team/filter", {
        params: {
          search: selectedTeam,
          filter: filterValue,
          sort: sortValue,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      if (response) {
        setTeam(response.data.total);
        setFilteredTeam(response.data.Teamlist);
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

  useEffect(() => {
    getTeammemberFilters();
  }, [currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setselectedTeam(value);
    setCurrentPage(1); // reset to first page
  };

  const handleClick = (option) => {
    setFiltertValue((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };
  const items = Roles.map((option) => ({
    key: option,
    label: (
      <Checkbox
        checked={filterValue.includes(option)}
        onClick={(e) => {
          // Prevent dropdown from closing on click
          e.stopPropagation();
          handleClick(option);
        }}
      >
        {option}
      </Checkbox>
    ),
  }));

  return (
    <div className="bg-light min-vh-100">
      <div className="container pt-5">
        <div className="d-flex my-2 justify-content-between align-items-center bg-white p-3 rounded shadow">
          <div className="fs-5 fw-bold">Add Team Member</div>
          <button className="btn btn-primary" onClick={() => setshow(true)}>
            <div className="d-flex align-items-center gap-1">
              <FaPlus /> Add
            </div>
          </button>
        </div>
        <Modal
          title={<span className="fs-4">Add Team Member</span>}
          open={show}
          onCancel={() => setshow(false)}
          footer={null}
        >
          <CreateTeamForm
            setshow={setshow}
            getTeammembers={getTeammemberFilters}
          />
        </Modal>
        {/* Filter Options */}
        <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm f-c-r gap-3">
          <div>
            <div className="fs-2">Team Overview</div>
            <div>{Team} Team Members found</div>
          </div>
          <div className="align-items-center d-flex gap-3 f-c-r">
            <div className="d-flex align-items-center border px-3 rounded">
              <FaSearch size={20} />
              <Custominput
                name="search"
                type="text"
                placeholder="Search"
                classname="border-0"
                value={selectedTeam}
                onChange={handleSearch}
              />
            </div>
            <select
              className="form-control"
              onChange={(e) => {
                setSortValue(e.target.value);
              }}
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="createdAt-asc">Start Date ↑</option>
              <option value="createdAt-desc">Start Date ↓</option>
            </select>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <FaFilter size={30} />
            </Dropdown>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                getTeammemberFilters();
              }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Cards */}

        {loading ? (
          <>
            <div className="d-flex pt-5  justify-content-center align-items-center">
              <div className="h-100 pt-5">
                <Mosaic color="#32c3b9" size="small" text="" textColor="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex gap-3 flex-wrap p-3 mt-3 align-items-center justify-content-center bg-white rounded shadow-sm">
              {FilteredTeam.length > 0 ? (
                FilteredTeam.map((item, key) => (
                  <Teamcard key={key} data={item} />
                ))
              ) : (
                <p>No Team Members</p>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={Team}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Team;
