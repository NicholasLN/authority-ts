import mongoose, { ObjectId } from "mongoose";
import Region from "./Region";

interface Character extends mongoose.Document {
  name: string;
  user: ObjectId;
  picture: string;
  age: number;
  gender: string;
  region: ObjectId;
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
  picture: {
    type: String,
    default: "default.png",
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
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: true,
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
