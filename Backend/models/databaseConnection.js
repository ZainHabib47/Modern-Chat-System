import mongoose from "mongoose"
import HomieeModel from "./homiee.js";
import dotenv from "dotenv"

dotenv.config();

const connector = async () => {
  const connection = await mongoose.connect(
    process.env.MONGODB_URL,
  );
  console.log("Connection Successfull to the Database");
};
export default connector;