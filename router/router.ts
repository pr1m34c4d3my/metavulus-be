import express, { NextFunction, Request, Response, Express } from "express";
const server: Express = express();
const taggingHandler = require("./handler/taggingHandler");
const accountHandler = require("./handler/accountHandler");
const postHandler = require("./handler/postHandler");
const commentHandler = require("./handler/commentHandler");

server.use(express.json());
server.use("/tagging", taggingHandler);
server.use("/account", accountHandler);
server.use("/post", postHandler);
server.use("/comment", commentHandler);
server.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("You are connected with our server");
});
// server.use(express.static("build/public"));

module.exports = server;
