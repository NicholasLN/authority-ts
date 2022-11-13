import mongoose, { ObjectId } from "mongoose";

/**
 * A Country is the superset of all branches of government, and is the highest level of government.
 * This is where we will store the Executive Branch, Legislative Branch, and Judicial Branch (if we implement it).
 */
interface Country {
  name: string;
  legislativeBranch: ObjectId;
}

const countryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  legislativeBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegislativeBranch",
    required: true,
  },
});

export default mongoose.model("Country", countryModel);
