import React, { useEffect } from "react";
import Loginform from "../components/Loginform";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth]);

  return (
    <div className="bg-light ">
      <Loginform />
    </div>
  );
};

export default Login;
