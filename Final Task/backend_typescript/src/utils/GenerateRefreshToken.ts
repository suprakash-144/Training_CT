import * as jwt from "jsonwebtoken";
const generateRefreshToken = (id: string) => {
  //  Generate JWT token with 3 days validity

  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  }
};
export default generateRefreshToken;
