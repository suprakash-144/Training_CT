import React, { useEffect } from "react";
import Signupform from "../components/Signupform";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);
  return (
    <div className="bg-light screenheight ">
      <Signupform />
    </div>
  );
};

export default Signup;
