import React from "react";

const Highlights = ({ title, value }) => {
  return (
    <div className=" cardbody   p-3 col-lg-3 col-md-3 col-sm-12 col-12">
      <div className="title">{title}</div>
      <div className="fs-3">{value}</div>
    </div>
  );
};

export default Highlights;
