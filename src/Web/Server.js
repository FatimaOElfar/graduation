import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../config/routes.js";

const startServer = (models) => {
  const app = express();
  const port = process.env.PORT || 4000;
  const API_VERSION = "v" + process.env.API_VERSION;
  const API_URL = `/api/${API_VERSION}`;

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));

  // spin up health for check server availability
  app.get("/health", async (_, res) => {
    res.send({ status: 200, server: "up" });
  });

  // init routes
  routes.map((route) => app.use(API_URL, route));

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
};

export default startServer;
