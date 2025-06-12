import mongoose from "mongoose";

  const dbConnect = () => {
  try {
    // Connect to database
    if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}

    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    console.log("Database error");
  }
};
export default dbConnect;