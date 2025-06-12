import { Schema, model } from "mongoose";
import { ITeam } from "../intefaces/ITean";
import bcrypt from "bcrypt";
const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);
TeamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

TeamSchema.methods.isPasswordMatched = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const TeamModel = model<ITeam>("Team", TeamSchema);

export default TeamModel;
