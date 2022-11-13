import mongoose, { ObjectId } from "mongoose";

/**
 * A legislative branch is a part of a government,
 * it contains legislative bodies, which are chambers of the legislative branch,
 * where a group of people holding a seat in the legislative branch meet to discuss and vote on legislation.
 *
 * It doesn't have a name, really, but it is a part of the model Country.
 * In the example of the USA, it would go
 * USA -> Legislative Branch -> [Senate,       House of Representatives]
 *                              -> Senator 1    -> Representative 1
 *                              -> Senator 2    -> Representative 2
 */

interface legislativeBranch extends mongoose.Document {
  legislativeBodies: Array<ObjectId>;
}

const legislativeBranchModel = new mongoose.Schema({
  legislativeBodies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegislativeBody",
    },
  ],
});
