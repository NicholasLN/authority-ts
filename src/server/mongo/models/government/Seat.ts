import mongoose, { ObjectId } from "mongoose";

/**
 * A seat is a position in a legislative body, of which a person can hold.
 * It is a part of the model LegislativeBody, which is a part of the model LegislativeBranch, which is a part of the model Country.
 * In the example of the USA, a seat could be a Senator or a Representative.
 * A seat can have a name, such as "Senator" or "Representative", voting power (how many votes they have)
 */
interface Seat extends mongoose.Document {
  name: string;
  // Can be any object, but must include a votingPower property, minSeatsCanBeHeld, and maxSeatsCanBeHeld
  seatProperties: {
    votingPower: number;
    minSeatsCanBeHeld: number;
    maxSeatsCanBeHeld: number;
  };
  // If applicable, it can vote in multiple legislative bodies
  legislativeBody: Array<ObjectId>;
}

const seatModel = new mongoose.Schema<Seat>({
  name: {
    type: String,
    required: true,
  },
  seatProperties: {
    type: Object,
    required: true,
  },
  legislativeBody: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegislativeBody",
    },
  ],
});

export default mongoose.model("Seat", seatModel);
