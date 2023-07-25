import { Request, Response, NextFunction } from "express";
import * as redis from "redis";
require("dotenv").config();

const redisOptions: any = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
};

const redisClient = redis.createClient(redisOptions);
redisClient.connect();

const connectToRedis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  redisClient.on("ready", () => {
    console.log("Redis client is ready and connected.");
    next();
  });
  redisClient.on("error", (error) => {
    console.error("Error connecting to Redis:", error);
    redisClient.shutdown();
  });
  next();
};

const redisCache = {
  getAll: async (key: string) => {
    let data = await redisClient.get(key);
    if (data) data = JSON.parse(data);
    return data;
  },

  setAll: async (key: string, data: any) => {
    const dataString = JSON.stringify(data);
    console.log(dataString);
    await redisClient.set(key, dataString);
  },
  delete: async (key: string) => {
    return redisClient.del(key);
  },
};

export { connectToRedis, redisCache };
