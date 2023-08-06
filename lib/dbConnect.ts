import mongoose from "mongoose";

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) throw new Error("NO DATABASE URI");

export const connectToMondoDB = async () => {
  try {
    const { connection } = await mongoose.connect(DATABASE_URI);

    if (connection.readyState === 1) {
      console.log("connect to mpngoDB");
      return Promise.resolve(true);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
