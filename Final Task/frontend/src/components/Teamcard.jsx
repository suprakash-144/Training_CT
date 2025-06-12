import React from "react";

import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
const Teamcard = ({ data }) => {
  return (
    <div className="d-flex px-4 py-2 gap-3  align-items-center rounded shadow-sm bg-light teamcard flex-wrap f-c-r ">
      <div className="">
        <InitialsAvatar name={data.name} />
      </div>
      <div className=" gap-1 d-flex flex-column justify-content-center flex-wrap text-wrap ">
        <h5 className="m-0">{data.name}</h5>
        <p className="m-0 text-break">{data.email}</p>
        <p className="text-opacity-50 text-dark m-0">{data.designation}</p>
      </div>
    </div>
  );
};

export default Teamcard;
