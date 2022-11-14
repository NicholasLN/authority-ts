import mongoose, { ObjectId } from "mongoose";

/**
 * A Country is the superset of all branches of government, and is the highest level of government.
 * This is where we will store the Executive Branch, Legislative Branch, and Judicial Branch (if we implement it).
 */
interface Country {
  name: string;
  color: string;
  legislativeBranch: ObjectId;
  regions: Array<ObjectId>;
}

const countryModel = new mongoose.Schema<Country>({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: "#000000",
  },
  legislativeBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegislativeBranch",
    required: true,
  },
  regions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
  ],
});

export default mongoose.model("Country", countryModel);
