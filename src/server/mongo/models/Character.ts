import mongoose, { ObjectId } from "mongoose";

interface Character extends mongoose.Document {
  name: string;
  user: ObjectId;
}

const characterSchema = new mongoose.Schema<Character>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<Character>("Character", characterSchema);
