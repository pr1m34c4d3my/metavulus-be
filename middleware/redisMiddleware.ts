import { NextFunction, Request, Response } from "express";
const { responseHandler } = require("../utils");
import { redisCache } from "../configRedis";

const redisMiddleware = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await redisCache.getAll(req.originalUrl);
      if (!data) {
        return next();
      }
      return res
        .status(200)
        .json(responseHandler.success(res.statusCode, data));
    } catch (error) {
      console.log(error);
    }
  },
  set: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await redisCache.setAll;
    } catch (error) {}
  },
  delete: async (req: Request, res: Response, next: Response) => {
    try {
    } catch (error) {}
  },
};

export { redisMiddleware };
