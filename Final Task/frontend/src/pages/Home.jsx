import React from "react";
import { MdLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Home = () => {
  const Navigator = useNavigate();
  const loginnavigator = () => {
    if (auth?.token) {
      Navigator("/team");
    } else {
      Navigator("/login");
    }
  };

  const { auth } = useAuth();
  const signupnavigator = () => {
    if (auth?.token) {
      Navigator("/team");
    } else {
      Navigator("/signup");
    }
  };
  return (
    <div className="screenheight bg-light-subtle pt-4 ">
      <div className="d-flex h-100 w-100 align-items-center justify-content-center">
        <div className="d-flex align-items-center  justify-content-center gap-2 flex-column">
          <img src="/images/logo.png" alt="logo" className="home-img " />
          <h3 className="logo-font">FlowNest</h3>
          <div className="w-75 text-center">
            <div className="">
              Where Teams Align, Tasks Flow, and Projects Fly.
            </div>
            <div className="">
              FlowNest helps teams plan, assign, and track work with clarity and
              ease — from daily tasks to large-scale projects.
            </div>
            <div className="">
              Stay Organized. Stay Ahead. With FlowNest, you eliminate
              bottlenecks, reduce miscommunication, and empower your team to
              focus on what matters most — delivering results.
            </div>
          </div>
          <div className="d-flex justify-content-between gap-4">
            <button
              className="btn btn-primary d-flex align-items-center gap-2 "
              onClick={() => loginnavigator()}
            >
              <MdLogin />
              Get Started
            </button>
            <button
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={() => signupnavigator()}
            >
              <FiUserPlus /> Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
