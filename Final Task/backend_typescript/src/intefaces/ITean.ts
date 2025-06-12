import { Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  email: string;
  password: string;
  designation: string;
  refreshToken?: string;

  isPasswordMatched(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}
