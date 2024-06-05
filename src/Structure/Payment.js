import { v4 as uuid } from "uuid";
import mongoose from "mongoose";
const { Schema } = mongoose;

export default class Payment {
  constructor(payment) {
    this.id = payment?.id || uuid();
    this.amount = payment?.amount;
    this.currency = payment?.currency;
    this.description = payment?.description;
    this.status = payment?.status || "pending";
    this.paymentIntentId = payment?.paymentIntentId; // Stripe Payment Intent ID
  }

  static schema() {
    const model = mongoose.model(
      "payment",
      new Schema({
        id: String,
        amount: Number,
        currency: String,
        description: String,
        status: { type: String, default: "pending" },
        paymentIntentId: String, // Store Stripe Payment Intent ID
        // Add more schema fields as needed
      })
    );
    return model;
  }

  async save(model) {
    return await model(this).save();
  }
}
