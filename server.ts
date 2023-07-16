require("dotenv").config();
import express, { Express, NextFunction, Request, Router } from "express";
import connectToDatabase from "./config";

const server: Express = express();

const port = process.env.PORT;

const router: Router = require("./router/router");

server.use((req: Request, res: any, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", process.env.CORS_METHOD);
  res.setHeader("Access-Control-Allow-Headers", process.env.CORS_HEADER);
  next();
});

server.use("/",connectToDatabase,router);

server.listen(port, () => {
  console.log(`server is connected on http://localhost:${port} `);
});
