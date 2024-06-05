import { v4 as uuid } from "uuid";
import mongoose, { Schema } from "mongoose";

export default class Company {
  constructor(company) {
    this.id = company?.id || uuid();
    this.email = company?.email;
    this.details = {
      phoneNumber: company?.details?.phoneNumber,
      address: company?.details?.address,
      TIN: company?.details?.TIN,
      yearOfEstablish: company?.details?.yearOfEstablish,
      website: company?.details?.website,
      companySize: company?.details?.companySize,
    };
    this.credentials = {
      companyName: company?.credentials?.companyName
        ? company?.credentials?.companyName.toLowerCase()
        : company?.credentials?.companyName,
      password: company?.credentials?.password,
    };
    // this.subscription = Date.now() + 1000 * 60 * 60 * 24 * 30 * 2;

    // //
    // const sub = this.subscription;
    // if(sub < Date.now() && sub != -1){
    //   console.log("Subscription Expired");
    //   sub = -1;
    // }
  }

  schema = () => {
    const model = mongoose.model(
      "company",
      new Schema({
        id: String,
        email: String,
        details: Object,
        credentials: Object,
      })
    );
    return model;
  };

  save = async (model) => {
    return await model(this).save();
  };
}
