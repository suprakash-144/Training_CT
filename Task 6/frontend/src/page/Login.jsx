import React, { useEffect } from "react";
import Loginform from "../component/Loginform";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.token) {
      navigate("/todo", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-12 maincontainer">
          <Loginform />
        </div>
      </div>
    </div>
  );
};

export default Login;
