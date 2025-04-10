import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { config } from "../config/axiossetup";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import { toast } from "react-toastify";
import axios from "../config/axiossetup";
import Createform from "../Components/Createform";
import Editform from "../Components/Editform";
const Home = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState();
  const [show, setshow] = useState(false);
  const [edit, setedit] = useState();
  const [loading, setloading] = useState(true);
  const getusers = async () => {
    try {
      const res = await axios.get("/all-users", config);

      setusers(res?.data);
      setloading(false);
    } catch (error) {
      if (localStorage.getItem("token")) {
        window.location.reload();
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/${id}`, config);
      toast.success("User Removed");
      getusers();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <>
      {show ? <Createform getusers={getusers} setshow={setshow} /> : <></>}
      <Nav />
      <div className="container">
        <div className={`d-flex p-3 mt-5 `}>
          <button
            className="btn btn-danger"
            onClick={() => {
              setshow((prev) => !prev);
            }}
          >
            Create User
          </button>
        </div>
        <div className=" overflow-x-auto shadow rounded-4 p-3">
          {!loading ? (
            <table className="table table-hover  table-striped caption-top ">
              <caption>List of users</caption>
              <thead className="table-dark table-bordered  border-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider ">
                {users?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.role}</td>
                      <td className="d-flex justify-content-evenly">
                        <FaEdit
                          color="purple"
                          size={22}
                          onClick={() => setedit(item)}
                        />
                        <MdDeleteForever
                          color="red"
                          size={25}
                          onClick={() => deleteUser(item?._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              {" "}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
              </table>
              <div className="text-center fs-1">loading...</div>
            </>
          )}
        </div>
      </div>
      {edit ? (
        <Editform item={edit} setedit={setedit} getusers={getusers} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
