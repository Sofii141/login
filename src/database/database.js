import mongoose from "mongoose";
//---------------------------------------------------------------------

export const connectDB = async () => {

  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/login");
    console.log('DB connect');

  } catch (error) {
    console.log(error)
  }

};
