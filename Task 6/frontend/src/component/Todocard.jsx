import React from "react";
import { IoMdSwitch } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
const Todocard = ({ data, togglestatus, deletetodo }) => {
  return (
    <div
      className={`d-flex flex-column   p-2 shadow  rounded ${
        !data?.completion ? "" : "opacity-50"
      }`}
    >
      <div className="d-flex justify-content-end gap-2 align-items-center">
        {data?.completion ? (
          <>
            <div className="badge bg-success p-2">Completed</div>
          </>
        ) : (
          <>
            <div className="badge bg-warning p-2">pending</div>
          </>
        )}
        <IoMdSwitch
          size={"25"}
          color="purple"
          onClick={() => {
            togglestatus(data._id, data.completion);
          }}
        />

        <FaRegTrashAlt
          size={"25"}
          color="red"
          onClick={() => {
            deletetodo(data._id);
          }}
        />
      </div>
      <div className={` `}>
        <p className="fs-6 ">{data?.title}</p>
        <p className="overflow-auto">{data?.body}</p>
      </div>
    </div>
  );
};

export default Todocard;
