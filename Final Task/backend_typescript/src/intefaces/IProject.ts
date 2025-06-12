import { Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  created_by: Types.ObjectId;
  team_members: Types.ObjectId[];
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
