require("dotenv").config();
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import connectToDatabase from "./config";
import { connectToRedis } from "./configRedis";

const server: Express = express();

const port = process.env.PORT || 8080;

const router: Router = require("./router/router");

server.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    process.env.CORS_METHOD || "GET, POST, PUT, DELETE"
  );
   
  res.setHeader(
    "Access-Control-Allow-Headers",
    process.env.CORS_HEADER || "Content-Type"
  );
  next();
});

server.use("/", connectToDatabase, router);

server.listen(port, () => {
  console.log(`Server is connected on http://localhost:${port}`);
});
