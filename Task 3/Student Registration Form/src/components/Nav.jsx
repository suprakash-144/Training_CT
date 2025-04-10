import React from "react";
import { SiTechcrunch } from "react-icons/si";

const Nav = ({ setshow }) => {
  return (
    <nav>
      <div className="container ">
        <div className="row">
          <div className=" col-md-2 col-lg-4 col-2 align-content-center">
            <SiTechcrunch size={30} />
          </div>
          <div className="col-lg-4 col-md-8 col-sm-10 align-content-center col-10">
            <div className="d-flex align-items-center gap-2 justify-content-between">
              <div className="navlinks">
                <a href="/">Home</a>
              </div>
              <div className="navlinks">
                <a href="/">Learning </a>
              </div>
              <div className="navlinks">
                <a href="/">Dashboard </a>
              </div>
              <div className="navlinks">
                <a href="/">About </a>
              </div>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-4 ">
            <div className="d-none d-md-flex d-lg-flex flex-wrap justify-content-end ">
              <button className="btn btn-danger" onClick={() => setshow(true)}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
