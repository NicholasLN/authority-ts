import mongoose, { ObjectId } from "mongoose";

/**
 * ? - A legislative body is a chamber of a legislative branch, where a group of people holding a seat
 * ? - in the legislative branch meet to discuss and vote on legislation.
 * ? - It is a part of the model LegislativeBranch, which is a part of the model Country.
 */
interface legislativeBody extends mongoose.Document {
  name: string;
  seats: Array<ObjectId>;
  legislativeBranch: ObjectId;
  rules: Array<any>; // Typically an array of strings
  // requiresApprovalFrom is an array of the IDs of the other legislative bodies that must approve a bill before it can be passed
  // In the case of the USA, this would be the Senate requiring approval from the House of Representatives
  // and the House of Representatives requiring approval from the Senate
  requiresApprovalFrom: Array<ObjectId>;
}

const legislativeBodyModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
  legislativeBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegislativeBranch",
    required: true,
  },
  rules: [
    {
      type: String,
    },
  ],
  requiresApprovalFrom: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegislativeBody",
    },
  ],
});

export default mongoose.model("LegislativeBody", legislativeBodyModel);
