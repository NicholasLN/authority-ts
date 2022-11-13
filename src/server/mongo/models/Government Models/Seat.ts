import mongoose, { ObjectId } from "mongoose";

/**
 * A seat is a position in a legislative body, of which a person can hold.
 * It is a part of the model LegislativeBody, which is a part of the model LegislativeBranch, which is a part of the model Country.
 * In the example of the USA, a seat could be a Senator or a Representative.
 * A seat can have a name, such as "Senator" or "Representative", voting power (how many votes they have)
 */
interface Seat extends mongoose.Document {
  name: string;
  votingPower: number;
  // If applicable, it can vote in multiple legislative bodies
  legislativeBody: Array<ObjectId>;
}

const seatModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votingPower: {
    type: Number,
    required: true,
  },
  legislativeBody: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegislativeBody",
    },
  ],
});
