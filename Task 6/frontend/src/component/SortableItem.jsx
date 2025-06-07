import React from "react";
import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

import { IoMdSwitch } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
export const SortableItem = ({
  id,
  data,
  onDelete,
  activeTask,
  togglestatus,
  isOverlay,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
    backgroundColor: isOverlay ? "lightgray" : "#343a40",
    cursor: "grab",
  };

  return (
    <div className={`${isOverlay ? "w-100" : "tasksize"}`}>
      <div
        className={`d-flex flex-column rounded-3 text-light p-2  ${
          activeTask === id ? "opacity-25" : " "
        }  ${
          !data?.completion
            ? "shadow-lg"
            : " text-opacity-25 text-decoration-line-through"
        }`}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
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
              togglestatus(data.id, data.completion);
            }}
          />

          <FaRegTrashAlt
            size={"25"}
            color="red"
            onClick={() => {
              onDelete(data.id);
            }}
          />
        </div>
        <div className={`ps-3 `}>
          <p className="fs-5 fw-bold ">{data?.title}</p>
          <p className="overflow-auto">{data?.description}</p>
        </div>
      </div>
    </div>
  );
};
