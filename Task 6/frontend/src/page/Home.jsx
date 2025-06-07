import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigator = useNavigate();
  const getStartedbutton = () => {
    Navigator("/todo");
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12 col-12">
            <div className="d-flex h-100 gap-4 px-2 flex-column justify-content-center align-items-center">
              <h3>Todo App</h3>
              <div className="">
                <p>
                  A todo application to keep all your tasks in order at one
                  place.
                </p>
                <p>
                  Stay organized and boost productivity. Become focused,
                  organized, and calm with our simple task manager
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  getStartedbutton();
                }}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 col-12 ">
            <img
              src="/image/image4.png"
              alt="icon"
              className="img-fluid py-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
