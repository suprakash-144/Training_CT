import * as jwt from "jsonwebtoken";
const generateToken = (id: string) => {
  //  Generate JWT token with 1 day validity
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  }
};
export default generateToken;
