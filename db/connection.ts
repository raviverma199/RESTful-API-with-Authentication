import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const dburl = process.env.database_string || '';

const connection = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Err", error);
  }
};


export default connection