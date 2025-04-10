import React, { useEffect, useState } from "react";
import Todoform from "../component/Todoform";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import { SortableItem } from "../component/SortableItem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const getTodo = async () => {
    try {
      setisloading(true);
      const response = await axiosPrivate.get(`/todo/`);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    } finally {
      setisloading(false);
    }
  };

  const deletetodo = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/todo/${id}`);
      if (response.data) {
        toast.warning("Deleted Task");
        setTasks((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
  const togglestatus = async (id, status) => {
    try {
      const response = await axiosPrivate.put(`/todo/${id}`, {
        completion: !status,
      });
      if (response.data) {
        toast.success("Updated");

        setTasks((prev) => {
          return prev.map((item) => (item._id === id ? response.data : item));
        });
      }
    } catch (error) {
      toast.error("Failed");
    }
  };
  useEffect(() => {
    getTodo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event) => {
    setActiveTask(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    const newIndex = tasks.findIndex((task) => task._id === over.id);
    const newOrder = arrayMove(tasks, oldIndex, newIndex);
    setTasks(newOrder);
    setActiveTask(null);
  };
  return (
    <div className="container-xl container-fluid">
      <Todoform setTasks={setTasks} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="d-flex justify-content-center align-items-center  flex-wrap">
            {isloading ? (
              <OrbitProgress variant="disc" color="#040404" size="large" />
            ) : (
              <>
                {tasks.map((task, key) => (
                  <SortableItem
                    key={key}
                    id={task._id}
                    data={task}
                    onDelete={deletetodo}
                    togglestatus={togglestatus}
                    activeTask={activeTask}
                  />
                ))}
              </>
            )}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTask ? (
            <SortableItem
              id={activeTask}
              data={tasks.find((t) => t._id === activeTask)}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Todo;
