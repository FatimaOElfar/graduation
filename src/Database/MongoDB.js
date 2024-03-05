import mongoose from "mongoose";
import User from "../Structure/User.js";
import Cv from "../Structure/Cv.js";
import Company from "../Structure/company.js";

export default {
  connect: (models) => {
    console.log('Connecting');
    mongoose
      .connect(process.env.CONNECTION_STRING)
      .then(async () => {
        console.log("MongoDB was connected.");
        models.user = new User().schema();
        models.cv = new Cv().schema();
        models.company = new Company().schema();
      })
      .catch((error) => {
        console.log("Failed to connect to MongoDB");
        console.error(error);
      });
  },
};
