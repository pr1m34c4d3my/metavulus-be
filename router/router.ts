import express, { NextFunction, Request, Response, Express } from "express";
const server: Express = express();
const taggingHandler = require("./handler/taggingHandler");
const accountHandler = require("./handler/accountHandler");

server.use(express.json());
server.use("/tagging", taggingHandler);
server.use("/account", accountHandler);
server.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("You are connected with our server");
});
// server.use(express.static("build/public"));

module.exports = server;
