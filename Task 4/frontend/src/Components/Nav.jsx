import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/", { replace: true });
  };
  return (
    <div className="p-2 shadow rounded">
      {" "}
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="fs-3">Welcome, {name}</div>
          <button className="btn btn-danger" onClick={() => logout()}>
            {" "}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
