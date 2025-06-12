import { Schema, model } from "mongoose";
import { ITask } from "../intefaces/ITask";

// 2️⃣ Define the Mongoose Schema
const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["to-do", "in-progress", "done", "cancelled"],
      default: "to-do",
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    assigned_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    assigned_to: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Team",
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3️⃣ Export the model
const TaskModel = model<ITask>("Task", TaskSchema);

export default TaskModel;
