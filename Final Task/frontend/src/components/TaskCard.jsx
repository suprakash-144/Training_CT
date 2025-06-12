import dayjs from "dayjs";
import React, { useState } from "react";
import { FaAngleDown, FaCircle } from "react-icons/fa";

const TaskCard = ({ item }) => {
  const [show, setshow] = useState(false);
  const selectColor = (item) => {
    switch (item) {
      case "to-do":
        return "blue";
      case "in-progress":
        return "orange";
      case "done":
        return "green";

      default:
        return "red";
    }
  };
  return (
    <div className="w-90  border shadow-sm rounded">
      <div className="d-flex justify-content-between p-3 bg-light-emphasis">
        <div className="d-flex align-items-center gap-2">
          <FaCircle color={selectColor(item?.status)} />
          <div className="">{item?.title}</div>
        </div>
        <FaAngleDown
          onClick={() => {
            setshow((s) => !s);
          }}
        />
      </div>
      {show ? (
        <div className="bg-light-subtle p-3 d-flex flex-column gap-2">
          <div className="">
            {" "}
            Task Details:
            <div className="">{item?.description}</div>
          </div>
          <div className="">
            <div className="">Assigned to:</div>
            {item.assigned_to.map((item, k) => (
              <span key={k} className="badge bg-info-subtle text-dark-emphasis">
                {item.name}
              </span>
            ))}
          </div>
          <div className="">
            Deadline : {dayjs(item?.deadline).format("DD-MM-YYYY")}
            {}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskCard;
