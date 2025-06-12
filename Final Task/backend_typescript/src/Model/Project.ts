import { model, Schema } from "mongoose";
import { IProject } from "../intefaces/IProject";

// 2️⃣ Define the Mongoose Schema
const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    team_members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 3️⃣ Export the model
const ProjectModel = model<IProject>("Project", ProjectSchema);

export default ProjectModel;
