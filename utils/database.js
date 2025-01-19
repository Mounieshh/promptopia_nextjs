import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log(`Connected to MongoDB: ${db.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};
