import express, {
  Express,
  NextFunction,
  Request,
  Response,
  response,
} from "express";
import { createClient } from "redis";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://wisnubl1995:qweasd123@wisnu0.xvb6xvv.mongodb.net/?retryWrites=true&w=majority`;
const server: Express = express();
const port = 5000;
const redisPort = 6379;
const client: any = createClient();

const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url).then((res) => res.json());
    const title = response.title;

    client.set(title);

    res.send(title);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

server.get("/:id", getProduct);

server.listen(5000, () => {
  console.log(`This application running on http://localhost:${port}`);
});
