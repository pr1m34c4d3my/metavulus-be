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
      `${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    next();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
};

export default connectToDatabase;
