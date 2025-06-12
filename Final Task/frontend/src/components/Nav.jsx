import React from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { MdLogout, MdLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import axios from "../config/axios";
import { toast } from "react-toastify";
const Nav = () => {
  const Navigator = useNavigate();
  const { auth, setAuth } = useAuth();
  const logout = async () => {
    try {
      await axios.get("/team/logout", { withCredentials: true });
      setAuth(null);
      Navigator("/", replace);
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const loginnavigator = () => {
    Navigator("/login");
  };
  const signupnavigator = () => {
    Navigator("/signup");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-xl container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link
          className="navbar-brand logo-font justify-content-center align-items-center d-flex gap-1"
          to={"/"}
        >
          <img src="/images/logo.png" alt="logo" className="logo-img" />
          FlowNest
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to={"/"}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to={"/team"}>
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to={"/project"}>
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to={"/tasks"}>
                Tasks
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-3">
            {!auth?.token ? (
              <>
                <button
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                  onClick={() => {
                    signupnavigator();
                  }}
                >
                  <FiUserPlus />
                  Signup
                </button>
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => {
                    loginnavigator();
                  }}
                >
                  <MdLogin />
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn  btn-danger d-flex align-items-center gap-2"
                  onClick={() => {
                    logout();
                  }}
                >
                  <div className="">Logout</div>
                  <MdLogout />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
