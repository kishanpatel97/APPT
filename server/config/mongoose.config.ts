import config from "config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI") || config.get("mongoDB_test_URI");
    await connect(mongoURI);
    console.log("Established a connection to MongoDB...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;