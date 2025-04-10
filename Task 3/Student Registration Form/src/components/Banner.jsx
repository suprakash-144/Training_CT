import React from "react";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { BsPlayBtn } from "react-icons/bs";
const Banner = ({ setshow }) => {
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="px-3 py-5 d-flex flex-column gap-5">
            <h1>Explore all cources in one place.</h1>
            <div className="px-2 ">
              <p className="fs-5 headertxt ">
                {" "}
                Learn new skills from the comfort of your home or anywhere
                anytime.
              </p>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-warning fw-bold fs-4  rounded-5 px-4"
                onClick={() => setshow(true)}
              >
                Register Now
              </button>
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-4">
                <BsPlayBtn color="orange" size={30} />

                <p>Content created by indusrty experts</p>
              </div>
              <div className="d-flex align-items-center gap-4">
                <FaRegEdit color="orange" size={30} />

                <p>Practical use based projects and assignments</p>
              </div>
              <div className="d-flex align-items-center gap-4">
                <CgProfile color="orange" size={30} />

                <p>Live support from mentors</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <img src="images/5437683.jpg" alt="img" className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
