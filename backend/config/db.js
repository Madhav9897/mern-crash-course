import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("hello");
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
