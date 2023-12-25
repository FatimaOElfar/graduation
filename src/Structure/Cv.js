import { v4 as uuid } from "uuid";
import mongoose, { Schema } from "mongoose";
export default class Cv {
  userId = null;
  loaded = false;
  constructor(models, username) {
    this.models = models;
    this.username = username;
    this.user = null;
    this.cv = {
      id: uuid(),
      graduationYear: null,
      displayName: null,
    };
  }

  load = async () => {

    this.user = await this.models.user.findOne({
      "credentials.username": this.username,
    });


    if (!this.user)
      return console.log(`User [${this.username}] was not found.`);


    this.userId = this.user.id;


    const cv = await this.models.cv.findOne({ userId: this.user.id });

    if (cv) this.loaded = true;
    
    this.cv = cv?.cv || this.cv;

    return this.cv;
  };
  saveCV = async () => {
    if (!this.user || !this.cv) return;
    if (!this.loaded) {
      // SAVE
      return await this.save(this.models.cv);
    } else {
      // UPDATE
      return await this.models.cv.updateOne({ cv: this.cv });
    }
  };
  schema = () => {
    const model = mongoose.model(
      "cv",
      new Schema({
        userId: String,
        cv: Object,
      })
    );
    return model;
  };
  save = async (model) => {
    return await model(this).save();
  };
}
