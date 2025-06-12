import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Table,
  Input,
  Space,
  Button,
  Tag,
  Popconfirm,
  Modal,
  Select,
} from "antd";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);
const Taskslist = () => {
  const [tasks, setTasks] = useState([]);
  const [isloading, setisloading] = useState(true);

  const [editingTask, setEditingTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const axiosPrivate = useAxiosPrivate();

  // APi functions
  const getTasks = async () => {
    setisloading(true);
    try {
      const respose = await axiosPrivate.get("/tasks/");
      if (respose?.data) {
        setTasks(respose.data);
        setisloading(false);
      }
    } catch (error) {
      toast.error("Failed To Fetch Tasks");
    } finally {
      setisloading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axiosPrivate.delete(`/tasks/${taskId}`);
      toast.warning("Task Deleted");
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      if (!error?.response) {
        toast.error("Server not responding");
      } else {
        console.error(error?.response);
      }
    }
  };

  const handleEditStatus = async () => {
    try {
      await axiosPrivate.put(`/tasks/${editingTask._id}`, {
        status: newStatus,
      });
      toast.success("Status updated");
      setEditingTask(null);
      setNewStatus("");
      getTasks();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    getTasks();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Table functions
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small">
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const statusColor = (status) => {
    switch (status) {
      case "to-do":
        return "blue";
      case "in-progress":
        return "orange";
      case "done":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const projectFilters = Array.from(
    new Set(tasks.map((task) => task.project?.name))
  ).map((name) => ({ text: name, value: name }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps("title"),
    },
    {
      title: "Project",
      dataIndex: ["project", "name"],
      key: "project",
      responsive: ["xs", "sm", "md", "lg"],
      filters: projectFilters,
      onFilter: (value, record) => record.project?.name === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm", "md", "lg"],
      render: (status) => (
        <Tag color={statusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time Left",
      key: "timeLeft",
      responsive: ["xs", "sm", "md", "lg"],
      render: (_, record) => {
        const now = dayjs();
        const deadline = dayjs(record.deadline);
        if (!deadline.isValid()) return <Tag color="default">N/A</Tag>;

        const diffHours = deadline.diff(now, "hour");
        const diffDays = deadline.diff(now, "day");

        if (deadline.isBefore(now)) {
          return <Tag color="red">Overdue</Tag>;
        } else if (diffHours < 24) {
          return <Tag color="volcano">Less than 1 day</Tag>;
        } else if (diffDays <= 3) {
          return (
            <Tag color="gold">{`in ${diffDays} day${
              diffDays > 1 ? "s" : ""
            }`}</Tag>
          );
        } else {
          return <Tag color="blue">{now.to(deadline)}</Tag>;
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      responsive: ["xs", "sm", "md", "lg"],
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingTask(record);
              setNewStatus(record.status);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteTask(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-light-subtle screenheight">
      <div className="container pt-5 ">
        <div className="bg-white shadow-sm rounded-4  p-3">
          <div className="">
            <div className="fs-4">Task Manager</div>
            <p>Manage all your task at one place</p>
          </div>

          <Table
            loading={isloading}
            columns={columns}
            dataSource={tasks}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
          />
        </div>
        <Modal
          title="Edit Task Status"
          open={!!editingTask}
          onCancel={() => setEditingTask(null)}
          onOk={handleEditStatus}
          okText="Update"
        >
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: "100%" }}
          >
            <Select.Option value="to-do">To-Do</Select.Option>
            <Select.Option value="in-progress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </Modal>
      </div>
    </div>
  );
};

export default Taskslist;
