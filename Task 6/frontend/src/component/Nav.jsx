import React from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { MdOutlineEventNote } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import axios from "../config/axios";
const Nav = () => {
  const Navigator = useNavigate();
  const { auth, setAuth } = useAuth();
  const logout = () => {
    try {
      axios.get("User/Logout", { withCredentials: true });
      setAuth(null);
      Navigator("/", replace);
    } catch (error) {
      console.log(error);
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
          className="navbar-brand justify-content-center align-items-center d-flex gap-1"
          to={"/"}
        >
          <MdOutlineEventNote color="blue" />
          TodoApp
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to={"/"}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to={"/todo"}>
                Todo
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-3">
            {!auth?.token ? (
              <>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    signupnavigator();
                  }}
                >
                  Signup
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    loginnavigator();
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn  btn-danger"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
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
