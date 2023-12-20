import mongoose from "mongoose";
import User from "../Structure/User.js";

export default {
  connect: (models) => {
    mongoose
      .connect(process.env.CONNECTION_STRING)
      .then(async () => {
        console.log("MongoDB was connected.");
        models.user = new User().schema();

        await models.user.updateOne({}, { "education.test": "test" });
      })
      .catch((error) => {
        console.log("Failed to connect to MongoDB");
        console.error(error);
      });
  },
};
