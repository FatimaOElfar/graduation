import { v4 as uuid } from "uuid";
import mongoose, { Schema } from "mongoose";

export default class User {
  constructor(user) {
    this.id = user?.id || uuid();
    this.email = user?.email;
    this.details = {
      firstName: user?.details?.firstName,
      lastName: user?.details?.lastName,
      phoneNumber: user?.details?.phoneNumber,
      address: user?.details?.address,
      state: user?.details?.state,
      city: user?.details?.city,
      gender: user?.details?.gender,
      birthDate: user?.details?.birthDate,
    };
    this.credentials = {
      username: user?.credentials?.username
        ? user?.credentials?.username.toLowerCase()
        : user?.credentials?.username,
      password: user?.credentials?.password,
    };
    this.education = {};
  }
  schema = () => {
    const model = mongoose.model(
      "user",
      new Schema({
        id: String,
        email: String,
        details: Object,
        education: Object,
        credentials: Object,
      })
    );
    return model;
  };
  async save(model) {
    return await model(this).save();
  };
}
