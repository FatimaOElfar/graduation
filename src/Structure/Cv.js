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
      // givenname: username?.cv?.givenname,
      // familyName: username?.cv?.familyName,
      // emailAddress: username?.cv?.emailAdress,
      // headline: username?.cv?.headline,
      // phoneNumber: username?.cv?.phoneNumber,
      // address: username?.cv?.address,
      // city: username?.cv?.city,
      // education: {
      // education: username?.cv?.education,
      // eduSchoole: username?.cv?.eduSchoole,
      // eduCity: username?.cv?.eduCity,
      // eduStartDate: username?.cv?.eduStartDate,
      // eduEndDate: username?.cv?.eduEndDate,
      // },
      // employment: {
      // employPosition: username?.cv?.employPosition,
      // employEmployer: username?.cv?.employEmployer,
      // employCity: username?.cv?.employCity,
      // employStartDate: username?.cv?.employStartDate,
      // employEndDate: username?.cv?.employEndDate,
      // employDescription: username?.cv?.employDescription,
      // },
      // skills: {
      // skillsLanguage: username?.cv?.skillsLanguage,
      // skillsCourses: username?.cv?.skillsCourses,
      // skillsDescription: username?.cv?.skillsDescription,
      // internship: {
      // internPosition: username?.cv?.internPosition,
      // internEmployer: username?.cv?.internEmployer,
      // internCity: username?.cv?.internCity,
      // internStartDate: username?.cv?.internStartDate,
      // internEndDate: username?.cv?.internEndDate,
      // internDescription: username?.cv?.internDescription,
      // },
      // certificate: {
      // certificateCourse: username?.cv?.certificateCourse,
      // certificateDescription: username?.cv?.certificateDescription,
      // certificateQuality: username?.cv?.certificateQuality,
      // },
      // achievement: {
      // achieveDescription: username?.cv?.achieveDescription,
      // achieveCity: username?.cv?.achieveCity,
      // achieveDate: username?.cv?.achieveDate,

      // achieveSignature: username?.cv?.achieveSignature,
      // },
      // },
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
