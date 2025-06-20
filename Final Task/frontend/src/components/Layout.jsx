import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
