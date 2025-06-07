import React, { useEffect } from "react";
import Signupform from "../component/Signupform";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.token) {
      navigate("/todo", { replace: true });
    }
  }, [auth, navigate]);
  return (
    <div className="container-xl container-fluid ">
      <div className="maincontainer d-flex justify-content-center align-items-center ">
        <div className="row ">
          <div className="col-xl-6 col-md-6 col-sm-12 col-12 ">
            <div className="d-flex justify-content-center align-items-center">
              <img src="/image/image2.png" alt="icon" className="img-fluid" />
            </div>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 col-12 ">
            <Signupform />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
