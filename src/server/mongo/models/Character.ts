import mongoose, { ObjectId } from "mongoose";

interface Character extends mongoose.Document {
  name: string;
  user: ObjectId;
  age: number;
  gender: string;
  location: string;
  personalityStats: {
    rhetoric: number;
    intelligence: number;
    charisma: number;
    dealmaking: number;
    leadership: number;
  };
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
  age: {
    type: Number,
    required: true,
    default: 18,
  },
  gender: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: String,
    required: true,
    unique: false,
  },
  personalityStats: {
    rhetoric: {
      type: Number,
      required: true,
    },
    intelligence: {
      type: Number,
      required: true,
    },
    charisma: {
      type: Number,
      required: true,
    },
    dealmaking: {
      type: Number,
      required: true,
    },
    leadership: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.model<Character>("Character", characterSchema);
