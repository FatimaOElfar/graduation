import { v4 as uuid } from "uuid";
import mongoose, { Schema } from "mongoose";

export default class cv {
  userId = null;
  loaded = false;

  constructor(models, username, cv, foundUser) {
    this.models = models;
    this.username = username;
    this.user = foundUser;
    this.userId = this.user?.id;
    this.cv = cv
      ? cv
      : {
          id: uuid(),
          graduationYear: null,
          displayName: null,
          contactInformation: {
            phone: null,
            whatsapp: null,
            email: null,
          },
          personalStatement: {
            name: null,
            age: null,
            dateOfBirth: null,
            profilePhoto: null,
          },
          workExperience: [
            {
              position: null,
              title: null,
              company: null,
              yearOfExperience: null,
              projects: [
                {
                  name: null,
                  link: null,
                },
              ],
            },
          ],
          education: {
            faculty: null,
            yearOfGraduation: null,
            degree: null,
          },
          skills: [],
          professionalCertifications: [],
          professionalAssociations: [],
          languages: [],
          additionalTrainingCourses: [],
          conferenceParticipation: [],
          publications: [],
          awards: [],
          bloggingAndInfluencing: [],
          volunteerExperience: [],
        };
  }

  load = async () => {
    if (!this.user) {
      this.user = await this.models.user.findOne({
        "credentials.username": this.username,
      });
      if (!this.user)
        return console.log(`User [${this.username}] was not found.`);
      this.userId = this.user.id;
    }

    const cv = await this.models.cv.findOne({ userId: this.userId });

    if (cv) this.loaded = true;

    this.cv = cv?.cv || this.cv;

    return this.cv;
  };
  saveCV = async () => {
    this.loaded = await this.models.cv.findOne({ userId: this.userId });
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
  async save(model) {
    return await model(this).save();
  }
}
