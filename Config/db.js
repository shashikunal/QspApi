import mongoose from "mongoose";
import { MONGODB_URL } from "./index";
export let connectDb = async () => {
  await mongoose.connect(MONGODB_URL);
  console.log("successfully Database connected");
};
