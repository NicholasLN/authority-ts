import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface User extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  role: string;
  characters: Array<Document>;
  verifyPassword: (password: string) => boolean;
}

const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  characters: {
    type: [mongoose.Types.ObjectId],
    ref: "Character",
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (password: string) {
  if (!password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password) && this.password !== "";
};

export default mongoose.model<User>("User", userSchema);
