import startServer from "./Web/Server.js";
import MongoDB from "./Database/MongoDB.js";
import dotenv from "dotenv";

const models = {};

dotenv.config();
MongoDB.connect(models);
startServer(models);
