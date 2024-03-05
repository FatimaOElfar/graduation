import dotenv from "dotenv";

import startServer from "./Web/Server.js";
import MongoDB from "./Database/MongoDB.js";

// will be initialized after mongoose driver connect to cloud-db
export const dbModels = {};

dotenv.config();
MongoDB.connect(dbModels);
startServer(dbModels);


