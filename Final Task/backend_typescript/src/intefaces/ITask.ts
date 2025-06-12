import { Document, Types } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface ITask extends Document {
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done" | "cancelled";
  project: Types.ObjectId;
  assigned_by: Types.ObjectId;
  assigned_to: Types.ObjectId[];
  deadline: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
