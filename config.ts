require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";

const connectToDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await mongoose.connect(
      `mongodb+srv://wisnubl1995:qweasd123@wisnu0.xvb6xvv.mongodb.net/metavulus`
    );
    next();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
};

export default connectToDatabase;
