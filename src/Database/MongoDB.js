import mongoose from "mongoose";
import User from "../Structure/User.js";
import Cv from "../Structure/Cv.js";

export default {
  connect: (models) => {
    mongoose
      .connect(process.env.CONNECTION_STRING)
      .then(async () => {
        console.log("MongoDB was connected.");
        models.user = new User().schema();
        models.cv = new Cv().schema();
      })
      .catch((error) => {
        console.log("Failed to connect to MongoDB");
        console.error(error);
      });
  },
};
