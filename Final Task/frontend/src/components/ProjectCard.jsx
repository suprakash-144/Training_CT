import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Avatar, Popconfirm, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
const ProjectCard = ({ togoproject, deleteProject, item }) => {
  const setcolor = () => {
    return (
      Math.floor(Math.random() * 242 + 33).toString(16) +
      Math.floor(Math.random() * 242 + 33).toString(16) +
      Math.floor(Math.random() * 242 + 33).toString(16)
    );
  };
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2 ">
      <div className="d-flex flex-column gap-1  p-3 border rounded-3 ">
        <div className="d-flex justify-content-between h-100 align-items-center ">
          <div
            className="pointer fs-5 fw-bold"
            onClick={() => togoproject(item._id)}
          >
            {item.name}
          </div>
          <div className="d-felx">
            {item?.status ? (
              <Tag color={"green"}>Completed</Tag>
            ) : (
              <Tag color={"orange"}>In Progess</Tag>
            )}
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => deleteProject(item?._id)}
              okText="Yes"
              cancelText="No"
            >
              <MdDeleteOutline color="red" size={25} />
            </Popconfirm>
          </div>
        </div>
        <div className="">{item.description}</div>
        <div>{item?.created_by?.name}</div>
        <div className="border-top d-flex gap-3 flex-wrap py-2">
          <Avatar.Group
            max={{
              count: 2,
              style: { color: "#f56a00", backgroundColor: "#fde3cf" },
            }}
          >
            {item.team_members.map((item, k) => (
              <Tooltip title={item?.name} placement="top">
                <Avatar
                  style={{
                    backgroundColor: `#${setcolor()}`,
                  }}
                  // icon={<FaUser />}
                >
                  {item?.name[0]}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
        <div className="">{dayjs(item?.createdAt).format("DD MMMM YYYY")}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
